# Script pour supprimer toutes les classes dark: des fichiers
# Ce script remplace les patterns dark: de manière intelligente

$files = @(
    "C:\Users\Banic\Documents\siteperso\src\app\contact\page.jsx",
    "C:\Users\Banic\Documents\siteperso\src\app\devis\page.jsx",
    "C:\Users\Banic\Documents\siteperso\src\app\temoignages\page.jsx",
    "C:\Users\Banic\Documents\siteperso\src\components\FormulaireDevis.jsx",
    "C:\Users\Banic\Documents\siteperso\src\components\HeroContactForm.jsx"
)

foreach ($file in $files) {
    Write-Host "Processing: $file"
    
    $content = Get-Content $file -Raw
    
    # Remplacer les patterns dark: courants
    # Pattern 1: dark:class-name (simple)
    $content = $content -replace '\s+dark:[a-zA-Z0-9\-\/\[\]:\(\)\.]+', ''
    
    Write-Host "  ✓ Cleaned dark: classes"
    
    # Sauvegarder le fichier
    Set-Content -Path $file -Value $content -NoNewline
    Write-Host "  ✓ Saved"
}

Write-Host "`n✅ All files processed!"