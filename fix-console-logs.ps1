# Script pour nettoyer les console.log de développement
Write-Host "Nettoyage des console.log de développement..." -ForegroundColor Green

$files = @(
    "src\components\FormulaireContact.jsx",
    "src\components\Header.jsx",
    "src\app\charte-demo\page.jsx",
    "src\app\api\contact\route.js"
)

foreach ($file in $files) {
    $fullPath = "c:\Users\Banic\Documents\siteperso\$file"
    if (Test-Path $fullPath) {
        Write-Host "Traitement de $file..." -ForegroundColor Yellow
        
        $content = Get-Content $fullPath -Raw -Encoding UTF8
        $originalContent = $content
        
        # Supprimer les console.log conditionnels de développement
        $content = $content -replace "if \(process\.env\.NODE_ENV === 'development'\) \{\s*console\.log\([^}]+\}\s*", ""
        $content = $content -replace "\s*if \(process\.env\.NODE_ENV === 'development'\) \{\s*console\.log\([^}]+\}", ""
        
        # Supprimer les console.error dans les catch blocks (les garder)
        # Ne pas toucher aux console.error car ils sont utiles pour le debugging
        
        if ($content -ne $originalContent) {
            Set-Content $fullPath -Value $content -Encoding UTF8 -NoNewline
            Write-Host "✓ $file nettoyé" -ForegroundColor Green
        } else {
            Write-Host "- $file - aucun changement" -ForegroundColor Gray
        }
    } else {
        Write-Host "✗ Fichier non trouvé: $file" -ForegroundColor Red
    }
}

Write-Host "Nettoyage terminé!" -ForegroundColor Green