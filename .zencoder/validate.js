#!/usr/bin/env node

/**
 * Script de validation Zencoder
 * Exécute toutes les règles de validation et génère un rapport
 */

const fs = require('fs');
const path = require('path');

// Couleurs pour le terminal
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

async function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        await getAllFiles(filePath, fileList);
      }
    } else {
      fileList.push({
        path: filePath,
        read: async () => fs.readFileSync(filePath, 'utf-8')
      });
    }
  }
  
  return fileList;
}

async function runValidation() {
  console.log(`${colors.cyan}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║         🔍 ZENCODER VALIDATION - BANDEV PROJECT          ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`);
  
  const rulesDir = path.join(__dirname, 'rules');
  const projectRoot = path.join(__dirname, '..');
  
  // Charger toutes les règles
  const ruleFiles = fs.readdirSync(rulesDir).filter(f => f.endsWith('.js'));
  const rules = ruleFiles.map(f => require(path.join(rulesDir, f)));
  
  console.log(`${colors.blue}📋 Chargement de ${rules.length} règle(s) de validation...${colors.reset}\n`);
  
  // Récupérer tous les fichiers du projet
  const files = await getAllFiles(path.join(projectRoot, 'src'));
  
  const context = { files };
  const allIssues = [];
  let totalPassed = 0;
  let totalFailed = 0;
  
  // Exécuter chaque règle
  for (const rule of rules) {
    console.log(`${colors.cyan}▶ Exécution : ${rule.name}${colors.reset}`);
    console.log(`  ${rule.description}\n`);
    
    try {
      const result = await rule.check(context);
      
      if (result.passed) {
        console.log(`  ${colors.green}✓ PASSED${colors.reset} - ${result.summary}\n`);
        totalPassed++;
      } else {
        console.log(`  ${colors.red}✗ FAILED${colors.reset} - ${result.summary}\n`);
        totalFailed++;
      }
      
      // Afficher les problèmes
      if (result.issues.length > 0) {
        result.issues.forEach(issue => {
          const icon = issue.severity === 'error' ? '❌' : 
                      issue.severity === 'warning' ? '⚠️' : 'ℹ️';
          const color = issue.severity === 'error' ? colors.red : 
                       issue.severity === 'warning' ? colors.yellow : colors.blue;
          
          console.log(`  ${icon} ${color}[${issue.severity.toUpperCase()}]${colors.reset} ${issue.file}:${issue.line || '?'}`);
          console.log(`     ${issue.message}`);
          if (issue.suggestion) {
            console.log(`     💡 ${colors.green}${issue.suggestion}${colors.reset}`);
          }
          console.log('');
        });
        
        allIssues.push(...result.issues.map(i => ({ ...i, rule: rule.name })));
      }
    } catch (error) {
      console.log(`  ${colors.red}✗ ERROR${colors.reset} - ${error.message}\n`);
      totalFailed++;
    }
  }
  
  // Résumé final
  console.log(`${colors.cyan}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║                    📊 RÉSUMÉ FINAL                        ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`);
  
  console.log(`  ${colors.green}✓ Règles passées :${colors.reset} ${totalPassed}/${rules.length}`);
  console.log(`  ${colors.red}✗ Règles échouées :${colors.reset} ${totalFailed}/${rules.length}`);
  console.log(`  ${colors.yellow}⚠ Total problèmes :${colors.reset} ${allIssues.length}\n`);
  
  const errors = allIssues.filter(i => i.severity === 'error').length;
  const warnings = allIssues.filter(i => i.severity === 'warning').length;
  const infos = allIssues.filter(i => i.severity === 'info').length;
  
  console.log(`  ${colors.red}❌ Erreurs :${colors.reset} ${errors}`);
  console.log(`  ${colors.yellow}⚠️  Avertissements :${colors.reset} ${warnings}`);
  console.log(`  ${colors.blue}ℹ️  Informations :${colors.reset} ${infos}\n`);
  
  // Générer rapport HTML
  generateHTMLReport(allIssues, { totalPassed, totalFailed, rules: rules.length });
  
  console.log(`${colors.green}✓ Rapport HTML généré : .zencoder/report.html${colors.reset}\n`);
  
  // Code de sortie
  process.exit(errors > 0 ? 1 : 0);
}

function generateHTMLReport(issues, stats) {
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rapport Zencoder - BANDEV</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      padding: 2rem;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { color: #00FF41; margin-bottom: 2rem; font-size: 2.5rem; }
    .stats { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .stat-card {
      background: rgba(255,255,255,0.05);
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .stat-value { font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem; }
    .stat-label { color: #94a3b8; font-size: 0.875rem; }
    .issue {
      background: rgba(255,255,255,0.05);
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 8px;
      border-left: 4px solid;
    }
    .issue.error { border-color: #ef4444; }
    .issue.warning { border-color: #f59e0b; }
    .issue.info { border-color: #3b82f6; }
    .issue-header { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
    .issue-severity { 
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    .severity-error { background: #ef4444; color: white; }
    .severity-warning { background: #f59e0b; color: white; }
    .severity-info { background: #3b82f6; color: white; }
    .issue-file { color: #94a3b8; font-size: 0.875rem; }
    .issue-message { margin-bottom: 0.5rem; }
    .issue-suggestion { 
      background: rgba(0,255,65,0.1);
      padding: 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
      color: #00FF41;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔍 Rapport Zencoder - BANDEV</h1>
    
    <div class="stats">
      <div class="stat-card">
        <div class="stat-value" style="color: #00FF41">${stats.totalPassed}</div>
        <div class="stat-label">Règles passées</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: #ef4444">${stats.totalFailed}</div>
        <div class="stat-label">Règles échouées</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: #f59e0b">${issues.length}</div>
        <div class="stat-label">Total problèmes</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: #3b82f6">${stats.rules}</div>
        <div class="stat-label">Règles exécutées</div>
      </div>
    </div>
    
    <h2 style="margin-bottom: 1rem; color: #00FF41;">Problèmes détectés</h2>
    
    ${issues.map(issue => `
      <div class="issue ${issue.severity}">
        <div class="issue-header">
          <span class="issue-severity severity-${issue.severity}">${issue.severity}</span>
          <span class="issue-file">${issue.file}:${issue.line || '?'}</span>
        </div>
        <div class="issue-message">${issue.message}</div>
        ${issue.suggestion ? `<div class="issue-suggestion">💡 ${issue.suggestion}</div>` : ''}
      </div>
    `).join('')}
    
    ${issues.length === 0 ? '<p style="color: #00FF41; font-size: 1.5rem;">✅ Aucun problème détecté !</p>' : ''}
  </div>
</body>
</html>
  `;
  
  fs.writeFileSync(path.join(__dirname, 'report.html'), html);
}

runValidation().catch(console.error);