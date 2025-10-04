# Script de nettoyage des anciens logos BANDEV
# À exécuter APRÈS avoir vérifié que le nouveau logo fonctionne correctement

Write-Host "╔══════════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                                              ║" -ForegroundColor Cyan
Write-Host "║              🗑️  NETTOYAGE DES ANCIENS LOGOS BANDEV                         ║" -ForegroundColor Cyan
Write-Host "║                                                                              ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Chemins
$logosPath = "c:\Users\Banic\Documents\siteperso\public\images\logos"
$imagesPath = "c:\Users\Banic\Documents\siteperso\public\images"

# Liste des fichiers à supprimer
$oldLogos = @(
    "$logosPath\logo-bandev.svg",
    "$logosPath\logo-bandev-optimized.svg",
    "$logosPath\logo-bandev-inverse.svg",
    "$logosPath\logo-bandev-mono.svg",
    "$logosPath\logo-bandev-contrast-adaptive.svg",
    "$logosPath\logo-bandev-contrast-dark.svg",
    "$logosPath\logo-bandev-contrast-light.svg",
    "$imagesPath\logoNB.png",
    "$imagesPath\logoNB.webp"
)

# Nouveaux logos à conserver
$newLogos = @(
    "$logosPath\logo-bandev-modern.svg",
    "$logosPath\logo-bandev-modern-dark.svg",
    "$logosPath\logo-bandev-modern-light.svg",
    "$logosPath\logo-bandev-icon.svg"
)

Write-Host "⚠️  ATTENTION : Ce script va supprimer les anciens fichiers logo." -ForegroundColor Yellow
Write-Host "   Assurez-vous d'avoir testé le nouveau logo avant de continuer." -ForegroundColor Yellow
Write-Host ""

# Vérifier que les nouveaux logos existent
Write-Host "🔍 Vérification des nouveaux logos..." -ForegroundColor Cyan
$allNewLogosExist = $true
foreach ($logo in $newLogos) {
    if (Test-Path $logo) {
        Write-Host "   ✅ $($logo.Split('\')[-1])" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $($logo.Split('\')[-1]) - MANQUANT !" -ForegroundColor Red
        $allNewLogosExist = $false
    }
}
Write-Host ""

if (-not $allNewLogosExist) {
    Write-Host "❌ ERREUR : Certains nouveaux logos sont manquants." -ForegroundColor Red
    Write-Host "   Veuillez vérifier l'installation avant de supprimer les anciens fichiers." -ForegroundColor Red
    exit 1
}

# Lister les fichiers à supprimer
Write-Host "📋 Fichiers qui seront supprimés :" -ForegroundColor Cyan
$totalSize = 0
$existingFiles = @()
foreach ($file in $oldLogos) {
    if (Test-Path $file) {
        $fileInfo = Get-Item $file
        $sizeKB = [math]::Round($fileInfo.Length / 1KB, 2)
        $totalSize += $fileInfo.Length
        Write-Host "   🗑️  $($fileInfo.Name) ($sizeKB KB)" -ForegroundColor Yellow
        $existingFiles += $file
    }
}

if ($existingFiles.Count -eq 0) {
    Write-Host "   ℹ️  Aucun ancien fichier à supprimer." -ForegroundColor Gray
    Write-Host ""
    Write-Host "✅ Nettoyage déjà effectué ou fichiers déjà supprimés." -ForegroundColor Green
    exit 0
}

$totalSizeMB = [math]::Round($totalSize / 1MB, 2)
Write-Host ""
Write-Host "   Total : $($existingFiles.Count) fichiers ($totalSizeMB MB)" -ForegroundColor Cyan
Write-Host ""

# Demander confirmation
$confirmation = Read-Host "Voulez-vous supprimer ces fichiers ? (oui/non)"

if ($confirmation -ne "oui") {
    Write-Host ""
    Write-Host "❌ Opération annulée." -ForegroundColor Red
    Write-Host "   Les anciens fichiers n'ont pas été supprimés." -ForegroundColor Gray
    exit 0
}

Write-Host ""
Write-Host "🗑️  Suppression en cours..." -ForegroundColor Cyan

# Créer un dossier de backup (optionnel)
$backupPath = "c:\Users\Banic\Documents\siteperso\backup-old-logos-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
$createBackup = Read-Host "Voulez-vous créer un backup avant suppression ? (oui/non)"

if ($createBackup -eq "oui") {
    New-Item -ItemType Directory -Path $backupPath -Force | Out-Null
    Write-Host "   📦 Backup créé : $backupPath" -ForegroundColor Green
    
    foreach ($file in $existingFiles) {
        if (Test-Path $file) {
            $fileName = Split-Path $file -Leaf
            Copy-Item $file -Destination "$backupPath\$fileName"
            Write-Host "   ✅ Backup : $fileName" -ForegroundColor Green
        }
    }
    Write-Host ""
}

# Supprimer les fichiers
$deletedCount = 0
foreach ($file in $existingFiles) {
    if (Test-Path $file) {
        try {
            Remove-Item $file -Force
            $fileName = Split-Path $file -Leaf
            Write-Host "   ✅ Supprimé : $fileName" -ForegroundColor Green
            $deletedCount++
        } catch {
            Write-Host "   ❌ Erreur lors de la suppression de $fileName : $_" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                                              ║" -ForegroundColor Green
Write-Host "║                        ✅ NETTOYAGE TERMINÉ                                  ║" -ForegroundColor Green
Write-Host "║                                                                              ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Résumé :" -ForegroundColor Cyan
Write-Host "   • Fichiers supprimés : $deletedCount" -ForegroundColor Green
Write-Host "   • Espace libéré : $totalSizeMB MB" -ForegroundColor Green
if ($createBackup -eq "oui") {
    Write-Host "   • Backup créé : $backupPath" -ForegroundColor Green
}
Write-Host ""
Write-Host "🎉 Les anciens logos ont été supprimés avec succès !" -ForegroundColor Green
Write-Host "   Les nouveaux logos sont maintenant les seuls en place." -ForegroundColor Gray
Write-Host ""