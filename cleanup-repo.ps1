# Script de nettoyage complet du repository
# Date: 2025-01-XX
# Objectif: Supprimer tous les fichiers inutiles, obsoletes et redondants

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  NETTOYAGE COMPLET DU REPOSITORY BANDEV" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Compteurs
$filesDeleted = 0
$totalSize = 0

# Fonction pour supprimer un fichier avec log
function Remove-FileWithLog {
    param([string]$Path)
    if (Test-Path $Path) {
        $size = (Get-Item $Path).Length
        Remove-Item $Path -Force
        $script:filesDeleted++
        $script:totalSize += $size
        Write-Host "Supprime: $Path" -ForegroundColor Green
        return $true
    }
    return $false
}

# Fonction pour supprimer un dossier avec log
function Remove-FolderWithLog {
    param([string]$Path)
    if (Test-Path $Path) {
        $size = (Get-ChildItem $Path -Recurse | Measure-Object -Property Length -Sum).Sum
        Remove-Item $Path -Recurse -Force
        $script:totalSize += $size
        Write-Host "Supprime dossier: $Path" -ForegroundColor Green
        return $true
    }
    return $false
}

Write-Host "Phase 1: Sauvegarde Git..." -ForegroundColor Yellow
Write-Host ""

# Verifier si on est dans un repo git
if (Test-Path ".git") {
    Write-Host "Repository Git detecte" -ForegroundColor Green
    Write-Host "Creez une branche de sauvegarde manuellement si necessaire:" -ForegroundColor Yellow
    Write-Host "   git checkout -b cleanup-backup" -ForegroundColor Cyan
    Write-Host ""
    $continue = Read-Host "Continuer le nettoyage? (O/N)"
    if ($continue -ne "O" -and $continue -ne "o") {
        Write-Host "Nettoyage annule" -ForegroundColor Red
        exit
    }
} else {
    Write-Host "Pas de repository Git detecte" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Phase 2: Suppression des fichiers de documentation redondants..." -ForegroundColor Yellow
Write-Host ""

# Liste des patterns de fichiers a supprimer
$docPatterns = @(
    "LISEZ_MOI_*.md",
    "LISEZ_MOI_*.txt",
    "COMMENCEZ_ICI*.md",
    "COMMENCEZ_ICI*.txt",
    "INDEX_*.md",
    "LOGO_*.md",
    "LOGO_*.txt",
    "LOGO_*.html",
    "CHECKLIST_*.md",
    "GUIDE_*.md",
    "RAPPORT_*.md",
    "PHASE*.md",
    "MISSION_*.md",
    "MISSION_*.txt",
    "CHANGELOG_*.md",
    "README_*.md",
    "RECAP_*.md",
    "RECAP_*.txt",
    "INTEGRATION_*.md",
    "OPTIMISATION*.md",
    "REFONTE_*.md",
    "*_ASCII*.txt",
    "AVANT_APRES*.md",
    "ANALYSE_*.md",
    "AMELIORATIONS_*.md",
    "ALTERNATIVES_*.md",
    "ANIMATIONS_*.md",
    "ANIMATION_*.md",
    "BIENVENUE*.md",
    "BIENVENUE*.txt",
    "BILAN_*.md",
    "BUILD_*.md",
    "CE_QUI_*.md",
    "CHARTE_*.md",
    "COMMANDES*.md",
    "CONFIGURATION_*.md",
    "CONTACT_*.md",
    "DEMARRAGE_*.md",
    "DOCUMENTATION_*.md",
    "ETAT_*.md",
    "EXEMPLES_*.md",
    "FICHIERS_*.md",
    "FINAL_*.md",
    "FOOTER_*.md",
    "GENERATION_*.md",
    "HEADER_*.md",
    "HIERARCHIE_*.md",
    "IMAGES_*.md",
    "IMAGES_*.txt",
    "LIENS_*.md",
    "LISTE_*.md",
    "MESSAGE_*.md",
    "MILESTONE_*.txt",
    "MODIFICATIONS_*.md",
    "NEWSLETTER_*.md",
    "NOUVEAU_*.md",
    "PORTFOLIO_*.md",
    "PROGRESSION_*.md",
    "PROJET_*.md",
    "PROMPTS_*.md",
    "PROMPT_*.md",
    "QUICK_*.md",
    "REBRANDING_*.md",
    "SYNTHESE_*.md",
    "SYNTHESE_*.txt",
    "SUCCESS*.txt",
    "SUMMARY*.txt",
    "TERMINE*.txt",
    "VISUAL*.txt",
    "VISUAL*.md"
)

foreach ($pattern in $docPatterns) {
    $files = Get-ChildItem -Path "." -Filter $pattern -File -ErrorAction SilentlyContinue
    foreach ($file in $files) {
        Remove-FileWithLog $file.FullName
    }
}

Write-Host ""
Write-Host "Phase 3: Suppression des composants React non utilises..." -ForegroundColor Yellow
Write-Host ""

$unusedComponents = @(
    "src\components\Globe3D.jsx",
    "src\components\PortfolioItem.jsx",
    "src\components\PortfolioGrid.jsx",
    "src\components\CaseStudyModal.jsx",
    "src\components\PopularBadge.jsx",
    "src\components\ParallaxImage.jsx",
    "src\components\ParallaxSection.jsx",
    "src\components\Preloader.jsx",
    "src\components\PageTransition.jsx",
    "src\components\Container.jsx",
    "src\components\TestimonialCarousel.jsx"
)

foreach ($component in $unusedComponents) {
    Remove-FileWithLog $component
}

Write-Host ""
Write-Host "Phase 4: Suppression des fichiers de configuration obsoletes..." -ForegroundColor Yellow
Write-Host ""

$obsoleteFiles = @(
    "public\images\techno-typescript.svg.backup",
    "clean-dark-mode.ps1",
    "cleanup-old-logos.ps1"
)

foreach ($file in $obsoleteFiles) {
    Remove-FileWithLog $file
}

# Supprimer tous les fichiers .backup, .old, .bak
$backupPatterns = @("*.backup", "*.old", "*.bak")
foreach ($pattern in $backupPatterns) {
    $files = Get-ChildItem -Path "." -Filter $pattern -Recurse -File -ErrorAction SilentlyContinue
    foreach ($file in $files) {
        Remove-FileWithLog $file.FullName
    }
}

Write-Host ""
Write-Host "Phase 5: Suppression des assets non utilises..." -ForegroundColor Yellow
Write-Host ""

$unusedAssets = @(
    "public\file.svg",
    "public\globe.svg",
    "public\next.svg",
    "public\vercel.svg",
    "public\window.svg",
    "public\images\logos\javascript.svg",
    "public\images\logos\README.md",
    "public\images\portfolio\gtravaux\README.md"
)

foreach ($asset in $unusedAssets) {
    Remove-FileWithLog $asset
}

# Supprimer les dossiers vides du portfolio
$emptyPortfolioDirs = @(
    "public\images\portfolio\astroblog",
    "public\images\portfolio\kinetic-studio"
)

foreach ($dir in $emptyPortfolioDirs) {
    if (Test-Path $dir) {
        $files = Get-ChildItem -Path $dir -File
        if ($files.Count -eq 0) {
            Remove-FolderWithLog $dir
        }
    }
}

Write-Host ""
Write-Host "Phase 6: Suppression des fichiers HTML de preview..." -ForegroundColor Yellow
Write-Host ""

$previewFiles = Get-ChildItem -Path "." -Filter "*PREVIEW*.html" -File -ErrorAction SilentlyContinue
foreach ($file in $previewFiles) {
    Remove-FileWithLog $file.FullName
}

Remove-FileWithLog "public\brand\logo-preview.html"

Write-Host ""
Write-Host "Phase 7: Nettoyage du cache de build..." -ForegroundColor Yellow
Write-Host ""

if (Test-Path ".next") {
    Remove-FolderWithLog ".next"
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Green
Write-Host "  NETTOYAGE TERMINE AVEC SUCCES" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "STATISTIQUES:" -ForegroundColor Cyan
Write-Host "   Fichiers supprimes: $filesDeleted" -ForegroundColor White
Write-Host "   Espace libere: $([math]::Round($totalSize / 1MB, 2)) MB" -ForegroundColor White
Write-Host ""
Write-Host "VERIFICATIONS A EFFECTUER:" -ForegroundColor Yellow
Write-Host "   1. npm run lint" -ForegroundColor Cyan
Write-Host "   2. npm run typecheck" -ForegroundColor Cyan
Write-Host "   3. npm run build" -ForegroundColor Cyan
Write-Host "   4. npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "PROCHAINES ETAPES:" -ForegroundColor Yellow
Write-Host "   Tester le site en local" -ForegroundColor White
Write-Host "   Verifier que toutes les pages fonctionnent" -ForegroundColor White
Write-Host "   Commit les changements si tout est OK" -ForegroundColor White
Write-Host ""