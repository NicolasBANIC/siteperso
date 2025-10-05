# Script ameliore pour supprimer toutes les classes dark:

$files = @(
    "src\app\contact\page.jsx",
    "src\app\devis\page.jsx",
    "src\app\temoignages\page.jsx",
    "src\components\FormulaireDevis.jsx",
    "src\components\HeroContactForm.jsx"
)

foreach ($file in $files) {
    $fullPath = Join-Path "C:\Users\Banic\Documents\siteperso" $file
    Write-Host "Processing: $file"
    
    $content = Get-Content $fullPath -Raw -Encoding UTF8
    $originalLength = $content.Length
    
    # Remplacer les patterns dark: avec un regex plus precis
    $content = $content -replace '\s+dark:[^\s"''`}]+', ''
    
    $newLength = $content.Length
    $removed = $originalLength - $newLength
    
    Write-Host "  Removed $removed characters"
    
    # Sauvegarder le fichier
    [System.IO.File]::WriteAllText($fullPath, $content, [System.Text.Encoding]::UTF8)
    Write-Host "  OK Saved"
}

Write-Host "`nOK All files cleaned!"
Write-Host "`nVerifying..."
$remaining = Get-ChildItem -Path "C:\Users\Banic\Documents\siteperso\src" -Recurse -Include *.jsx,*.js | Select-String "dark:" | Measure-Object
$count = $remaining.Count
Write-Host "Remaining dark occurrences: $count"