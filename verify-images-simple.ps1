# Script de vérification simple des images
# Portfolio Nicolas Banic

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VERIFICATION DES IMAGES - Portfolio  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$imagesPath = "C:\Users\Banic\Documents\siteperso\public\images"

# Liste des fichiers requis
$requiredImages = @(
    "hero-main.jpg",
    "avatar.jpg",
    "about-workspace.jpg",
    "service-vitrine.jpg",
    "service-ecommerce.jpg",
    "service-webapp.jpg",
    "service-seo.jpg",
    "portfolio-gtravaux.jpg",
    "portfolio-gtravaux-mobile.jpg",
    "portfolio-ecom-fashion.jpg",
    "portfolio-saas-dashboard.jpg",
    "process-step1.svg",
    "process-step2.svg",
    "process-step3.svg",
    "process-step4.svg",
    "process-step5.svg",
    "testimonial-avatar1.jpg",
    "testimonial-avatar2.jpg",
    "testimonial-avatar3.jpg",
    "logos/react.svg",
    "logos/nextjs.svg",
    "logos/typescript.svg",
    "logos/tailwind.svg",
    "logos/nodejs.svg",
    "logos/git.svg",
    "logos/figma.svg",
    "logos/javascript.svg",
    "cta-background.jpg",
    "contact-hero.jpg",
    "404-illustration.svg",
    "og-image.jpg",
    "logoNB.png"
)

$totalRequired = $requiredImages.Count
$totalPresent = 0
$totalMissing = 0
$totalPlaceholder = 0

Write-Host "Verification de $totalRequired fichiers..." -ForegroundColor Yellow
Write-Host ""

foreach ($image in $requiredImages) {
    $fullPath = Join-Path $imagesPath $image
    
    if (Test-Path $fullPath) {
        $fileInfo = Get-Item $fullPath
        $fileSize = $fileInfo.Length
        
        if ($fileSize -le 1) {
            Write-Host "[PLACEHOLDER] $image" -ForegroundColor Yellow
            $totalPlaceholder++
        } else {
            $sizeMB = [math]::Round($fileSize / 1MB, 2)
            Write-Host "[OK] $image ($sizeMB Mo)" -ForegroundColor Green
            $totalPresent++
        }
    } else {
        Write-Host "[MANQUANT] $image" -ForegroundColor Red
        $totalMissing++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "STATISTIQUES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Total requis     : $totalRequired" -ForegroundColor White
Write-Host "Presents (OK)    : $totalPresent" -ForegroundColor Green
Write-Host "Placeholders     : $totalPlaceholder" -ForegroundColor Yellow
Write-Host "Manquants        : $totalMissing" -ForegroundColor Red
Write-Host ""

$percentComplete = [math]::Round(($totalPresent / $totalRequired) * 100, 2)
Write-Host "Taux completion  : $percentComplete%" -ForegroundColor $(if ($percentComplete -eq 100) { "Green" } elseif ($percentComplete -ge 80) { "Yellow" } else { "Red" })
Write-Host ""

if ($totalMissing -eq 0) {
    Write-Host "STATUT : INTEGRATION COMPLETE" -ForegroundColor Green -BackgroundColor Black
    Write-Host ""
    Write-Host "Tous les fichiers requis sont presents!" -ForegroundColor Green
    Write-Host "Pret pour: npm run dev" -ForegroundColor Cyan
    
    if ($totalPlaceholder -gt 0) {
        Write-Host ""
        Write-Host "Note: $totalPlaceholder placeholder(s) a remplacer" -ForegroundColor Yellow
    }
} else {
    Write-Host "STATUT : FICHIERS MANQUANTS" -ForegroundColor Red -BackgroundColor Black
    Write-Host ""
    Write-Host "Action requise: Ajouter les $totalMissing fichier(s) manquant(s)" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""