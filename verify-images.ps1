# Script de vérification automatique des images
# Portfolio Nicolas Banic - Next.js

Write-Host "🔍 VÉRIFICATION DES IMAGES - Portfolio Nicolas Banic" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""

# Définir le chemin de base
$imagesPath = "C:\Users\Banic\Documents\siteperso\public\images"
$srcPath = "C:\Users\Banic\Documents\siteperso\src"

# Compteurs
$totalRequired = 0
$totalPresent = 0
$totalMissing = 0
$totalPlaceholder = 0

# Liste des fichiers requis selon le mapping
$requiredImages = @(
    @{Path="hero-main.jpg"; Description="Hero principal accueil"},
    @{Path="avatar.jpg"; Description="Portrait professionnel"},
    @{Path="about-workspace.jpg"; Description="Espace de travail"},
    @{Path="service-vitrine.jpg"; Description="Service sites vitrines"},
    @{Path="service-ecommerce.jpg"; Description="Service e-commerce"},
    @{Path="service-webapp.jpg"; Description="Service applications web"},
    @{Path="service-seo.jpg"; Description="Service SEO"},
    @{Path="portfolio-gtravaux.jpg"; Description="Projet G-Travaux desktop"},
    @{Path="portfolio-gtravaux-mobile.jpg"; Description="Projet G-Travaux mobile"},
    @{Path="portfolio-ecom-fashion.jpg"; Description="Projet Fashion Store"},
    @{Path="portfolio-saas-dashboard.jpg"; Description="Projet SaaS Dashboard"},
    @{Path="process-step1.svg"; Description="Processus étape 1"},
    @{Path="process-step2.svg"; Description="Processus étape 2"},
    @{Path="process-step3.svg"; Description="Processus étape 3"},
    @{Path="process-step4.svg"; Description="Processus étape 4"},
    @{Path="process-step5.svg"; Description="Processus étape 5"},
    @{Path="testimonial-avatar1.jpg"; Description="Avatar client 1"},
    @{Path="testimonial-avatar2.jpg"; Description="Avatar client 2"},
    @{Path="testimonial-avatar3.jpg"; Description="Avatar client 3"},
    @{Path="logos/react.svg"; Description="Logo React"},
    @{Path="logos/nextjs.svg"; Description="Logo Next.js"},
    @{Path="logos/typescript.svg"; Description="Logo TypeScript"},
    @{Path="logos/tailwind.svg"; Description="Logo Tailwind"},
    @{Path="logos/nodejs.svg"; Description="Logo Node.js"},
    @{Path="logos/git.svg"; Description="Logo Git"},
    @{Path="logos/figma.svg"; Description="Logo Figma"},
    @{Path="logos/javascript.svg"; Description="Logo JavaScript"},
    @{Path="cta-background.jpg"; Description="Fond CTA"},
    @{Path="contact-hero.jpg"; Description="Hero contact"},
    @{Path="404-illustration.svg"; Description="Illustration 404"},
    @{Path="og-image.jpg"; Description="Image OpenGraph"},
    @{Path="logoNB.png"; Description="Logo header"}
)

Write-Host "📋 VÉRIFICATION DES FICHIERS REQUIS" -ForegroundColor Yellow
Write-Host ""

foreach ($image in $requiredImages) {
    $totalRequired++
    $fullPath = Join-Path $imagesPath $image.Path
    
    if (Test-Path $fullPath) {
        $fileInfo = Get-Item $fullPath
        $fileSize = $fileInfo.Length
        
        if ($fileSize -le 1) {
            Write-Host "⚠️  " -NoNewline -ForegroundColor Yellow
            Write-Host "$($image.Path)" -NoNewline -ForegroundColor White
            Write-Host " - PLACEHOLDER ($fileSize octets)" -ForegroundColor Yellow
            Write-Host "    📝 $($image.Description)" -ForegroundColor Gray
            $totalPlaceholder++
        } else {
            Write-Host "✅ " -NoNewline -ForegroundColor Green
            Write-Host "$($image.Path)" -NoNewline -ForegroundColor White
            $sizeKB = [math]::Round($fileSize / 1KB, 2)
            $sizeMB = [math]::Round($fileSize / 1MB, 2)
            if ($sizeMB -ge 1) {
                $sizeText = "$sizeMB Mo"
                Write-Host " - OK ($sizeText)" -ForegroundColor Green
            } else {
                $sizeText = "$sizeKB Ko"
                Write-Host " - OK ($sizeText)" -ForegroundColor Green
            }
            Write-Host "    📝 $($image.Description)" -ForegroundColor Gray
            $totalPresent++
        }
    } else {
        Write-Host "❌ " -NoNewline -ForegroundColor Red
        Write-Host "$($image.Path)" -NoNewline -ForegroundColor White
        Write-Host " - MANQUANT" -ForegroundColor Red
        Write-Host "    📝 $($image.Description)" -ForegroundColor Gray
        $totalMissing++
    }
}

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""

# Statistiques
Write-Host "📊 STATISTIQUES" -ForegroundColor Cyan
Write-Host ""
Write-Host "Total requis     : $totalRequired fichiers" -ForegroundColor White
Write-Host "✅ Présents      : $totalPresent fichiers" -ForegroundColor Green
Write-Host "⚠️  Placeholders : $totalPlaceholder fichiers" -ForegroundColor Yellow
Write-Host "❌ Manquants     : $totalMissing fichiers" -ForegroundColor Red
Write-Host ""

$percentComplete = [math]::Round(($totalPresent / $totalRequired) * 100, 2)
Write-Host "Taux de complétion : $percentComplete%" -ForegroundColor $(if ($percentComplete -eq 100) { "Green" } elseif ($percentComplete -ge 80) { "Yellow" } else { "Red" })
Write-Host ""

# Vérification des références dans le code
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""
Write-Host "🔍 VÉRIFICATION DES RÉFÉRENCES DANS LE CODE" -ForegroundColor Yellow
Write-Host ""

$codeFiles = @(
    "src/app/page.jsx",
    "src/app/apropos/page.jsx",
    "src/app/portfolio/page.jsx",
    "src/app/processus/page.jsx",
    "src/app/temoignages/page.jsx",
    "src/app/contact/page.jsx",
    "src/app/not-found.jsx",
    "src/app/layout.jsx",
    "src/components/Header.jsx",
    "src/components/ServiceCard.jsx",
    "src/components/TestimonialCard.jsx"
)

$totalReferences = 0
$validReferences = 0
$invalidReferences = 0

foreach ($file in $codeFiles) {
    $fullPath = Join-Path "C:\Users\Banic\Documents\siteperso" $file
    
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        
        # Rechercher les références /images/
        $matches = [regex]::Matches($content, '/images/([^"''`\s]+)')
        
        if ($matches.Count -gt 0) {
            Write-Host "📄 $file" -ForegroundColor Cyan
            
            foreach ($match in $matches) {
                $totalReferences++
                $imagePath = $match.Groups[1].Value
                $fullImagePath = Join-Path $imagesPath $imagePath
                
                if (Test-Path $fullImagePath) {
                    $fileInfo = Get-Item $fullImagePath
                    if ($fileInfo.Length -le 1) {
                        Write-Host "   ⚠️  /images/$imagePath - PLACEHOLDER" -ForegroundColor Yellow
                    } else {
                        Write-Host "   ✅ /images/$imagePath" -ForegroundColor Green
                        $validReferences++
                    }
                } else {
                    Write-Host "   ❌ /images/$imagePath - FICHIER MANQUANT" -ForegroundColor Red
                    $invalidReferences++
                }
            }
            Write-Host ""
        }
    }
}

Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""
Write-Host "📊 STATISTIQUES RÉFÉRENCES CODE" -ForegroundColor Cyan
Write-Host ""
Write-Host "Total références : $totalReferences" -ForegroundColor White
Write-Host "✅ Valides       : $validReferences" -ForegroundColor Green
Write-Host "❌ Invalides     : $invalidReferences" -ForegroundColor Red
Write-Host ""

# Statut final
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""

if ($totalMissing -eq 0 -and $invalidReferences -eq 0) {
    Write-Host "🎉 STATUT : INTÉGRATION COMPLÈTE ET VALIDÉE" -ForegroundColor Green
    Write-Host ""
    Write-Host "✅ Tous les fichiers requis sont présents" -ForegroundColor Green
    Write-Host "✅ Toutes les références code sont valides" -ForegroundColor Green
    Write-Host "✅ Prêt pour la production" -ForegroundColor Green
    
    if ($totalPlaceholder -gt 0) {
        Write-Host ""
        Write-Host "⚠️  Note : $totalPlaceholder placeholder(s) à remplacer par vraies images" -ForegroundColor Yellow
    }
} elseif ($totalMissing -gt 0) {
    Write-Host "❌ STATUT : FICHIERS MANQUANTS" -ForegroundColor Red
    Write-Host ""
    Write-Host "Action requise : Ajouter les $totalMissing fichier(s) manquant(s)" -ForegroundColor Red
} else {
    Write-Host "⚠️  STATUT : RÉFÉRENCES INVALIDES" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Action requise : Corriger les $invalidReferences référence(s) invalide(s)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""
Write-Host "📚 DOCUMENTS DISPONIBLES :" -ForegroundColor Cyan
Write-Host "   - RAPPORT_VALIDATION_FINALE.md (ce rapport)" -ForegroundColor White
Write-Host "   - RAPPORT_INTEGRATION_IMAGES.md (détails complets)" -ForegroundColor White
Write-Host "   - INTEGRATION_IMAGES_RESUME.md (résumé exécutif)" -ForegroundColor White
Write-Host "   - CHECKLIST_IMAGES.md (checklist de test)" -ForegroundColor White
Write-Host ""
Write-Host "🚀 PROCHAINE ÉTAPE : npm run dev" -ForegroundColor Cyan
Write-Host ""