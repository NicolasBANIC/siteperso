# Script de verification du logo BAN.DEV Matrix Premium

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Green
Write-Host "      VERIFICATION LOGO BAN.DEV MATRIX PREMIUM" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green
Write-Host ""

$errors = 0

Write-Host "VERIFICATION DES FICHIERS PRINCIPAUX" -ForegroundColor Cyan
Write-Host "--------------------------------------------------" -ForegroundColor Cyan
Write-Host ""

# Verifier les fichiers principaux
$files = @(
    @{Path="public\brand\logo.svg"; Name="Logo SVG principal"},
    @{Path="public\brand\logo-preview.html"; Name="Page de previsualisation"},
    @{Path="public\brand\README.md"; Name="Documentation technique"},
    @{Path="LOGO_BANDEV_MATRIX_PREMIUM_FINAL.md"; Name="Rapport complet"},
    @{Path="START_HERE_LOGO_MATRIX_PREMIUM.md"; Name="Guide de demarrage"},
    @{Path="TEST_LOGO_MATRIX_PREMIUM.html"; Name="Page de test"},
    @{Path="LISEZ_MOI_LOGO_MATRIX.txt"; Name="Fichier LISEZ-MOI"}
)

foreach ($file in $files) {
    if (Test-Path $file.Path) {
        Write-Host "[OK] $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "[ERREUR] $($file.Name) - MANQUANT" -ForegroundColor Red
        $errors++
    }
}

Write-Host ""
Write-Host "VERIFICATION DU CONTENU DU LOGO" -ForegroundColor Cyan
Write-Host "--------------------------------------------------" -ForegroundColor Cyan
Write-Host ""

if (Test-Path "public\brand\logo.svg") {
    $logoContent = Get-Content "public\brand\logo.svg" -Raw
    
    $checks = @(
        @{Pattern="viewBox"; Name="ViewBox defini"},
        @{Pattern="#0B3D0B"; Name="Couleur vert Matrix fonce"},
        @{Pattern="#00FF55"; Name="Couleur flux lumineux"},
        @{Pattern="matrixDarkGradient"; Name="Degrade Matrix fonce"},
        @{Pattern="matrixLightGradient"; Name="Degrade Matrix clair"},
        @{Pattern="animate"; Name="Animations SVG"}
    )
    
    foreach ($check in $checks) {
        if ($logoContent -match $check.Pattern) {
            Write-Host "[OK] $($check.Name)" -ForegroundColor Green
        } else {
            Write-Host "[ATTENTION] $($check.Name) - NON TROUVE" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "[ERREUR] Impossible de verifier le contenu - fichier manquant" -ForegroundColor Red
}

Write-Host ""
Write-Host "VERIFICATION DE L'INTEGRATION" -ForegroundColor Cyan
Write-Host "--------------------------------------------------" -ForegroundColor Cyan
Write-Host ""

if (Test-Path "src\components\Header.jsx") {
    $headerContent = Get-Content "src\components\Header.jsx" -Raw
    
    if ($headerContent -match "/brand/logo.svg") {
        Write-Host "[OK] Logo integre dans le Header" -ForegroundColor Green
    } else {
        Write-Host "[ATTENTION] Logo non trouve dans le Header" -ForegroundColor Yellow
    }
} else {
    Write-Host "[ERREUR] Header.jsx non trouve" -ForegroundColor Red
    $errors++
}

Write-Host ""
Write-Host "RESUME" -ForegroundColor Cyan
Write-Host "--------------------------------------------------" -ForegroundColor Cyan
Write-Host ""

if ($errors -eq 0) {
    Write-Host "[SUCCESS] TOUT EST PARFAIT !" -ForegroundColor Green
    Write-Host ""
    Write-Host "Le logo BAN.DEV Matrix Premium est correctement installe." -ForegroundColor Green
    Write-Host ""
    Write-Host "PROCHAINES ETAPES :" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Ouvrir dans votre navigateur :" -ForegroundColor White
    Write-Host "   -> public\brand\logo-preview.html" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "2. Ou lancer le site :" -ForegroundColor White
    Write-Host "   -> npm run dev" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "[ERREUR] $errors erreur(s) detectee(s)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Veuillez corriger les erreurs ci-dessus." -ForegroundColor Red
    Write-Host ""
}

Write-Host "==================================================================" -ForegroundColor Green
Write-Host "                  VERIFICATION TERMINEE" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green
Write-Host ""