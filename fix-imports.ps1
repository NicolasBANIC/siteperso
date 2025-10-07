# Script pour corriger les imports cassés par le script d'entités
$projectPath = "c:\Users\Banic\Documents\siteperso\src"

# Fonction pour corriger les imports dans un fichier
function Fix-ImportsInFile {
    param (
        [string]$FilePath
    )
    
    if (Test-Path $FilePath) {
        $content = Get-Content $FilePath -Raw -Encoding UTF8
        $original = $content
        
        # Corriger les imports et autres erreurs de syntaxe JavaScript
        $content = $content -replace '&apos;', "'"
        $content = $content -replace '&quot;', '"'
        
        # Sauvegarde seulement si modifié
        if ($content -ne $original) {
            $content | Set-Content $FilePath -Encoding UTF8 -NoNewline
            Write-Host "Fixed imports in: $FilePath"
        }
    }
}

# Recherche récursive de tous les fichiers JS/JSX/TS/TSX
Get-ChildItem -Path $projectPath -Include *.js,*.jsx,*.ts,*.tsx -Recurse | ForEach-Object {
    Fix-ImportsInFile -FilePath $_.FullName
}

Write-Host "Tous les imports ont été réparés !"