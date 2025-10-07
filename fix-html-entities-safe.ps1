# PowerShell script to safely fix HTML entity escaping issues in JSX files
# This will only replace unescaped quotes and apostrophes in JSX text content (between > and <)

function Fix-HtmlEntities-Safe {
    param([string]$FilePath)
    
    $content = Get-Content -Path $FilePath -Raw -Encoding UTF8
    if (-not $content) { return }
    
    $originalContent = $content
    
    # Fix JSX text content issues - only replace where it's clearly JSX text content
    # Pattern to match text between JSX closing and opening tags that contains unescaped entities
    $content = $content -replace '(?<=>[\s]*)"([^"]*?)"([\s]*<)', '>$1&quot;$2&quot;$3'
    $content = $content -replace "(?<=>[\s]*)'([^']*?)'([\s]*<)", ">$1&apos;$2&apos;$3"
    
    # Fix specific French contractions and possessives in JSX text
    $content = $content -replace "(?<=>[\s\w]*\s)l'([\w])", "&gt;l&apos;$1"
    $content = $content -replace "(?<=>[\s\w]*\s)d'([\w])", "&gt;d&apos;$1"
    $content = $content -replace "(?<=>[\s\w]*\s)L'([\w])", "&gt;L&apos;$1"
    $content = $content -replace "(?<=>[\s\w]*\s)D'([\w])", "&gt;D&apos;$1"
    
    # Fix contractions in JSX text
    $content = $content -replace "(?<=>[\s\w]*\w)n't([\s<])", "n&apos;t$1"
    $content = $content -replace "(?<=>[\s\w]*\w)'s([\s<])", "&apos;s$1"
    $content = $content -replace "(?<=>[\s\w]*\w)'re([\s<])", "&apos;re$1"
    $content = $content -replace "(?<=>[\s\w]*\w)'ll([\s<])", "&apos;ll$1"
    $content = $content -replace "(?<=>[\s\w]*\w)'ve([\s<])", "&apos;ve$1"
    $content = $content -replace "(?<=>[\s\w]*\w)'d([\s<])", "&apos;d$1"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $FilePath -Value $content -Encoding UTF8 -NoNewline
        Write-Output "Fixed HTML entities in: $FilePath"
    }
}

# First, let's revert the problematic files and manually fix them
Write-Output "Reverting and manually fixing problematic files..."

# Check git status to see changed files
git status --porcelain | Where-Object { $_ -match '\.jsx$' -and $_ -match '^\s*M' } | ForEach-Object {
    $file = ($_ -split '\s+')[1]
    Write-Output "Reverting: $file"
    git checkout -- $file
}