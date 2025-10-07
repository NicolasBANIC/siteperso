# Script pour corriger les imports memo dupliques
Write-Host "Correction des imports memo dupliques..." -ForegroundColor Green

$componentsWithErrors = @(
    "src/components/CTASection.jsx",
    "src/components/Logo.jsx",
    "src/components/PricingCard.jsx",
    "src/components/ProjectCard.jsx"
)

foreach ($file in $componentsWithErrors) {
    $fullPath = "c:\Users\Banic\Documents\siteperso\$file"
    if (Test-Path $fullPath) {
        Write-Host "Correction de $file..." -ForegroundColor Yellow
        
        $content = Get-Content $fullPath -Raw -Encoding UTF8
        
        # Supprimer les imports memo dupliques - approche simple
        $content = $content -replace "import \{ memo \} from 'react';\r?\n", ""
        $content = $content -replace "import \{ memo \} from 'react';\r?\n", ""
        $content = $content -replace "import \{ memo \} from 'react';\r?\n", ""
        
        # Ajouter un seul import memo au bon endroit
        if ($content -match "import.*from ['\"`]react['\"`]") {
            $content = $content -replace "(import.*\{[^}]*)\}(\s*from\s*['\"``]react['\"``])", "`$1, memo }`$2"
        } else {
            $content = $content -replace "(import.*from.*)\n", "`$1`nimport { memo } from 'react';`n"
        }
        
        Set-Content $fullPath -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Fichier $file corrige" -ForegroundColor Green
    }
}

Write-Host "Correction terminee!" -ForegroundColor Green