# Script pour identifier les imports inutilisés dans page.jsx
$filePath = "c:\Users\Banic\Documents\siteperso\src\app\page.jsx"

$content = Get-Content $filePath -Raw

# Liste des imports détectés
$imports = @(
    'HeroContactForm', 'HeroContactFormNew', 'ParticlesBackground', 
    'CodeTypingAnimation', 'GlassmorphismCard', 'MeshGradient',
    'StatItem', 'Card', 'PricingCard', 'TestimonialSlider',
    'TechBadge', 'AnimatedCounter'
)

Write-Host "Analysing imports in page.jsx..."
Write-Host "=================================="

foreach ($import in $imports) {
    $pattern = "<$import"
    if ($content -match $pattern) {
        Write-Host "✅ USED: $import" -ForegroundColor Green
    } else {
        Write-Host "❌ UNUSED: $import" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Checking for usage with different patterns..."

# Vérifications supplémentaires pour les patterns complexes
if ($content -match "TestimonialSlider|testimonial") {
    Write-Host "✅ TestimonialSlider might be used" -ForegroundColor Yellow
}

if ($content -match "AnimatedCounter|animated.*counter") {
    Write-Host "✅ AnimatedCounter might be used" -ForegroundColor Yellow
}