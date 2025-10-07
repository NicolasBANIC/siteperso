# Script pour corriger automatiquement les entités non échappées
$projectPath = "c:\Users\Banic\Documents\siteperso\src"

# Fonction pour corriger un fichier
function Fix-EntitiesInFile {
    param (
        [string]$FilePath
    )
    
    if (Test-Path $FilePath) {
        $content = Get-Content $FilePath -Raw -Encoding UTF8
        $original = $content
        
        # Corrections courantes
        $content = $content -replace "(?<!&)(?<!&l)(?<!&r)(?<!&#39)(?<!&apos)'(?!s\s)", "&apos;"  # Apostrophes simples
        $content = $content -replace '(?<!&)(?<!&l)(?<!&r)(?<!&#34)(?<!&quot)"(?!")(?!\s)', "&quot;"  # Guillemets doubles
        
        # Sauvegarde seulement si modifié
        if ($content -ne $original) {
            $content | Set-Content $FilePath -Encoding UTF8 -NoNewline
            Write-Host "Fixed entities in: $FilePath"
        }
    }
}

# Liste des fichiers à corriger (basée sur l'output ESLint)
$filesToFix = @(
    "$projectPath\app\charte-demo\page.jsx",
    "$projectPath\app\header-demo\page.jsx", 
    "$projectPath\app\mentions-legales\page.jsx",
    "$projectPath\app\not-found.jsx",
    "$projectPath\app\page.jsx",
    "$projectPath\app\politique-confidentialite\page.jsx",
    "$projectPath\app\temoignages\page.jsx",
    "$projectPath\components\FormulaireContact.jsx",
    "$projectPath\components\HeroContactFormNew.jsx",
    "$projectPath\components\TestimonialCard.jsx",
    "$projectPath\components\TestimonialSlider.jsx"
)

foreach ($file in $filesToFix) {
    Fix-EntitiesInFile -FilePath $file
}

Write-Host "Toutes les entités ont été corrigées automatiquement !"