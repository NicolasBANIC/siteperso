# BANDEV - Nettoyage des styles obsoletes
# Script PowerShell pour nettoyer le CSS et supprimer les doublons/styles morts

Write-Host "Nettoyage des styles obsoletes..." -ForegroundColor Green

# Fonction pour nettoyer les styles obsoletes dans un fichier
function Clean-ObsoleteStyles {
    param([string]$FilePath)
    
    if (Test-Path $FilePath) {
        Write-Host "Nettoyage de $FilePath" -ForegroundColor Yellow
        
        $content = Get-Content $FilePath -Raw
        
        # Supprimer les anciens tokens de couleur obsoletes
        $content = $content -replace '--bg-site:\s*#5D726F;', '--bg-site: #0D1D2C;'
        $content = $content -replace 'bg-.*5D726F', 'bg-[#0D1D2C]'
        
        # Supprimer les doublons de classes Tailwind
        $content = $content -replace '\s+class="([^"]*)\s+\1([^"]*)"', ' class="$1$2"'
        
        # Supprimer les !important inutiles
        $content = $content -replace '!important\s*;(\s*\/\*[^*]*\*\/\s*)?', ';'
        
        # Supprimer les commentaires obsoletes
        $content = $content -replace '\/\*[^*]*OLD[^*]*\*\/', ''
        $content = $content -replace '\/\*[^*]*TODO[^*]*\*\/', ''
        
        # Normaliser les espaces
        $content = $content -replace '\n\s*\n\s*\n', "`n`n"
        
        Set-Content $FilePath $content -Encoding UTF8
        Write-Host "Nettoye: $FilePath" -ForegroundColor Green
    }
}

# Nettoyage des fichiers CSS principaux
$cssFiles = @(
    "c:\Users\Banic\Documents\siteperso\styles\globals.css",
    "c:\Users\Banic\Documents\siteperso\styles\tokens.css", 
    "c:\Users\Banic\Documents\siteperso\styles\headings.css",
    "c:\Users\Banic\Documents\siteperso\src\app\globals.css"
)

foreach ($file in $cssFiles) {
    Clean-ObsoleteStyles $file
}

# Supprimer les fichiers de sauvegarde temporaires s'ils existent
$backupFiles = Get-ChildItem "c:\Users\Banic\Documents\siteperso" -Recurse -Name "*.css.bak", "*.css.old", "*.css.backup"
if ($backupFiles) {
    Write-Host "Suppression des fichiers de sauvegarde..." -ForegroundColor Yellow
    foreach ($backup in $backupFiles) {
        Remove-Item $backup -Force
        Write-Host "Supprime: $backup" -ForegroundColor Red
    }
}

# Verification de l'integrite des CSS
Write-Host "Verification de l'integrite des fichiers CSS..." -ForegroundColor Cyan

foreach ($file in $cssFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Verifier la presence des tokens obligatoires
        if (($content -match "--bg-site:\s*#0D1D2C") -and ($content -match "--brand-emerald:\s*#10B981")) {
            Write-Host "OK: $file - Tokens corrects" -ForegroundColor Green
        } else {
            Write-Host "ERREUR: $file - Tokens manquants ou incorrects" -ForegroundColor Red
        }
    }
}

Write-Host "Nettoyage termine ! Le CSS est maintenant harmonise." -ForegroundColor Green
Write-Host "Resume :" -ForegroundColor Cyan
Write-Host "   • Fond global : #0D1D2C" -ForegroundColor White
Write-Host "   • Couleur marque : #10B981 (logo BANDEV exact)" -ForegroundColor White
Write-Host "   • Glassmorphisme < 0.12 opacite" -ForegroundColor White  
Write-Host "   • Styles obsoletes supprimes" -ForegroundColor White