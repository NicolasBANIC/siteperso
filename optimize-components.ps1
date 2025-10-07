# Script pour optimiser les composants React avec memo
Write-Host "Optimisation des composants React avec memo..." -ForegroundColor Green

$componentsToOptimize = @(
    "src/components/Container.jsx",
    "src/components/Logo.jsx", 
    "src/components/CTASection.jsx",
    "src/components/GlassmorphismCard.jsx",
    "src/components/OptimizedImage.tsx",
    "src/components/ProjectCard.jsx",
    "src/components/PricingCard.jsx"
)

foreach ($file in $componentsToOptimize) {
    $fullPath = "c:\Users\Banic\Documents\siteperso\$file"
    if (Test-Path $fullPath) {
        Write-Host "Traitement de $file..." -ForegroundColor Yellow
        
        $content = Get-Content $fullPath -Raw -Encoding UTF8
        $originalContent = $content
        
        # Ajouter import memo si pas present et fonction simple
        if ($content -notmatch "import.*memo" -and $content -match "export default function ") {
            # Ajouter memo a l'import React existant si present
            if ($content -match "import.*\{([^}]*)\}.*from ['""`]react['""`]") {
                $content = $content -replace "import\s*\{([^}]*)\}\s*from\s*['\""]react['\""]", "import { memo, `$1 } from 'react'"
            } else {
                # Sinon ajouter import memo en haut
                $content = $content -replace "(import.*)\n", "`$1`nimport { memo } from 'react';`n"
            }
            
            # Wrapper la fonction avec memo
            $content = $content -replace "export default function (\w+)", "function `$1"
            $content = $content -replace "\}\s*$", "}`n`nexport default memo(`$1);"
        }
        
        if ($content -ne $originalContent) {
            Set-Content $fullPath -Value $content -Encoding UTF8 -NoNewline
            Write-Host "Fichier $file optimise avec memo" -ForegroundColor Green
        } else {
            Write-Host "Fichier $file - aucun changement" -ForegroundColor Gray
        }
    } else {
        Write-Host "Fichier non trouve: $file" -ForegroundColor Red
    }
}

Write-Host "Optimisation terminee!" -ForegroundColor Green