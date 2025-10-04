# 🧪 Logo BANDEV Contraste Renforcé — Guide de Tests

## 🎯 Objectif
Valider que les logos BANDEV avec contraste renforcé fonctionnent correctement dans tous les contextes.

---

## ✅ Tests à Effectuer

### 1️⃣ Test Visuel (Aperçu HTML)

#### Commande
```bash
start LOGO_BANDEV_CONTRAST_PREVIEW.html
```

#### Vérifications
- [ ] **Fonds sombres** : Logo lisible sur #0B0B0B, #111, #1A1A1A
- [ ] **Fonds clairs** : Logo lisible sur #FFFFFF, #F7F7F7, #E5E5E5
- [ ] **Fonds colorés** : Logo lisible sur #0047AB, #006D77
- [ ] **Overlay image** : Logo lisible sur image avec overlay sombre
- [ ] **Tailles** : Logo net à 24px, 28px, 32px, 48px

**Résultat attendu** : ✅ Tous les logos sont lisibles et nets

---

### 2️⃣ Test d'Intégration (Next.js)

#### Étape 1 : Ajouter les CSS Variables
Dans `src/app/globals.css`, ajouter à la fin :

```css
/* Logo BANDEV — Contraste Renforcé */
:root {
  --logo-gold: #8C6A18;
  --logo-ink: #0B0B0B;
  --logo-keyline: rgba(255, 255, 255, 0.85);
  --logo-green: #00FF45;
}

@media (prefers-color-scheme: dark) {
  :root {
    --logo-gold: #E5C461;
    --logo-ink: #FFFFFF;
    --logo-keyline: rgba(0, 0, 0, 0.65);
  }
}

[data-theme="dark"] {
  --logo-gold: #E5C461;
  --logo-ink: #FFFFFF;
  --logo-keyline: rgba(0, 0, 0, 0.65);
}

[data-theme="light"] {
  --logo-gold: #8C6A18;
  --logo-ink: #0B0B0B;
  --logo-keyline: rgba(255, 255, 255, 0.85);
}
```

#### Étape 2 : Remplacer le Logo dans le Header
Dans `src/components/Header.jsx`, remplacer :

```jsx
// AVANT
<Image 
  src="/images/logos/logo-bandev-optimized.svg" 
  alt="BANDEV" 
  width={240} 
  height={64} 
/>

// APRÈS
<Image 
  src="/images/logos/logo-bandev-contrast-adaptive.svg" 
  alt="BANDEV" 
  width={240} 
  height={64} 
  priority
  className="h-6 w-auto md:h-7"
/>
```

#### Étape 3 : Lancer le Serveur de Dev
```bash
npm run dev
```

#### Vérifications
- [ ] **Logo visible** dans le header
- [ ] **Taille correcte** : 24px sur mobile, 28px sur desktop
- [ ] **Lisibilité** : Logo net et lisible
- [ ] **Pas d'erreur** dans la console

**Résultat attendu** : ✅ Logo affiché correctement dans le header

---

### 3️⃣ Test de Thème (Dark/Light)

#### Vérifications
- [ ] **Mode clair** : Logo avec or profond (#8C6A18) et texte noir (#0B0B0B)
- [ ] **Mode sombre** : Logo avec or clair (#E5C461) et texte blanc (#FFFFFF)
- [ ] **Transition** : Changement de couleur fluide lors du basculement de thème
- [ ] **Keyline** : Contour visible et adapté au thème

#### Comment Tester
1. Ouvrir le site en mode clair
2. Basculer en mode sombre (via toggle ou DevTools)
3. Observer le changement de couleur du logo

**Résultat attendu** : ✅ Logo s'adapte automatiquement au thème

---

### 4️⃣ Test de Contraste (WCAG)

#### Outils Recommandés
- **WebAIM Contrast Checker** : https://webaim.org/resources/contrastchecker/
- **Chrome DevTools** : Lighthouse > Accessibility

#### Vérifications Mode Dark
- [ ] **Texte DEV** : Contraste ≥ 4.5:1 (AA) ✅ Attendu : 15.8–18.5:1
- [ ] **Cadre BAN** : Contraste ≥ 3:1 (AA graphique) ✅ Attendu : 7.8–9.2:1
- [ ] **Soulignement** : Contraste ≥ 3:1 (AA graphique) ✅ Attendu : 10.9–12.8:1

#### Vérifications Mode Light
- [ ] **Texte DEV** : Contraste ≥ 4.5:1 (AA) ✅ Attendu : 16.2–18.2:1
- [ ] **Cadre BAN** : Contraste ≥ 3:1 (AA graphique) ✅ Attendu : 5.2–5.8:1
- [ ] **Soulignement** : Contraste ≥ 3:1 (AA graphique) ✅ Attendu : Renforcé par keyline

**Résultat attendu** : ✅ Tous les contrastes respectent WCAG 2.1 AA

---

### 5️⃣ Test Responsive (Mobile/Desktop)

#### Vérifications Mobile (< 768px)
- [ ] **Taille** : Logo à 24px (h-6)
- [ ] **Lisibilité** : Logo net et lisible
- [ ] **Alignement** : Logo bien aligné dans le header
- [ ] **Pas de débordement** : Logo ne dépasse pas du header

#### Vérifications Desktop (≥ 768px)
- [ ] **Taille** : Logo à 28px (h-7)
- [ ] **Lisibilité** : Logo net et lisible
- [ ] **Alignement** : Logo bien aligné dans le header
- [ ] **Proportions** : Logo garde son ratio 3.75:1

#### Comment Tester
1. Ouvrir le site en mode responsive (DevTools)
2. Tester sur différentes tailles d'écran (320px, 768px, 1024px, 1920px)
3. Vérifier la lisibilité et l'alignement

**Résultat attendu** : ✅ Logo s'adapte correctement à toutes les tailles d'écran

---

### 6️⃣ Test de Performance

#### Vérifications
- [ ] **Poids** : Logo adaptive ~3.5 KB (acceptable)
- [ ] **Chargement** : Logo se charge rapidement (< 100ms)
- [ ] **Pas de FOUC** : Pas de flash de contenu non stylisé
- [ ] **Priority** : Attribut `priority` présent sur l'Image Next.js

#### Outils Recommandés
- **Chrome DevTools** : Network > Images
- **Lighthouse** : Performance

**Résultat attendu** : ✅ Logo se charge rapidement sans impact sur la performance

---

### 7️⃣ Test d'Accessibilité

#### Vérifications
- [ ] **Attribut alt** : `alt="BANDEV"` présent
- [ ] **Attribut role** : `role="img"` dans le SVG
- [ ] **Titre** : `<title>BANDEV</title>` dans le SVG
- [ ] **Description** : `<desc>` dans le SVG
- [ ] **Lecteur d'écran** : Logo annoncé correctement

#### Outils Recommandés
- **Chrome DevTools** : Lighthouse > Accessibility
- **NVDA** ou **JAWS** (lecteurs d'écran)

**Résultat attendu** : ✅ Logo accessible aux lecteurs d'écran

---

### 8️⃣ Test de Compatibilité Navigateurs

#### Navigateurs à Tester
- [ ] **Chrome** (dernière version)
- [ ] **Firefox** (dernière version)
- [ ] **Safari** (dernière version)
- [ ] **Edge** (dernière version)
- [ ] **Chrome Mobile** (Android)
- [ ] **Safari Mobile** (iOS)

#### Vérifications
- [ ] **Logo visible** sur tous les navigateurs
- [ ] **Couleurs correctes** (or, blanc/noir, vert)
- [ ] **Keyline visible** (contour)
- [ ] **Pas de distorsion** (proportions correctes)

**Résultat attendu** : ✅ Logo fonctionne sur tous les navigateurs modernes

---

### 9️⃣ Test de Fallback (Navigateurs Anciens)

#### Vérifications
- [ ] **CSS variables** : Fallbacks présents dans le SVG
- [ ] **Media query** : Fallback si non supporté
- [ ] **Logo visible** même sans support des CSS variables

#### Comment Tester
1. Désactiver les CSS variables dans DevTools
2. Vérifier que le logo reste visible
3. Vérifier que les couleurs par défaut sont appliquées

**Résultat attendu** : ✅ Logo fonctionne même sans support des CSS variables

---

### 🔟 Test de Régression (Ancien Logo)

#### Vérifications
- [ ] **Ancien logo** : Toujours présent dans `/public/images/logos/`
- [ ] **Pas de conflit** : Nouveau logo ne casse pas l'ancien
- [ ] **Migration facile** : Possibilité de revenir à l'ancien logo

#### Comment Tester
1. Remplacer temporairement le nouveau logo par l'ancien
2. Vérifier que le site fonctionne toujours
3. Remettre le nouveau logo

**Résultat attendu** : ✅ Possibilité de revenir à l'ancien logo si besoin

---

## 📊 Rapport de Tests

### Template de Rapport

```markdown
# Rapport de Tests — Logo BANDEV Contraste Renforcé

**Date** : [DATE]
**Testeur** : [NOM]
**Environnement** : [OS / Navigateur / Version]

## Résultats

### 1. Test Visuel (Aperçu HTML)
- [ ] ✅ Pass / [ ] ❌ Fail
- **Commentaires** : 

### 2. Test d'Intégration (Next.js)
- [ ] ✅ Pass / [ ] ❌ Fail
- **Commentaires** : 

### 3. Test de Thème (Dark/Light)
- [ ] ✅ Pass / [ ] ❌ Fail
- **Commentaires** : 

### 4. Test de Contraste (WCAG)
- [ ] ✅ Pass / [ ] ❌ Fail
- **Commentaires** : 

### 5. Test Responsive (Mobile/Desktop)
- [ ] ✅ Pass / [ ] ❌ Fail
- **Commentaires** : 

### 6. Test de Performance
- [ ] ✅ Pass / [ ] ❌ Fail
- **Commentaires** : 

### 7. Test d'Accessibilité
- [ ] ✅ Pass / [ ] ❌ Fail
- **Commentaires** : 

### 8. Test de Compatibilité Navigateurs
- [ ] ✅ Pass / [ ] ❌ Fail
- **Commentaires** : 

### 9. Test de Fallback (Navigateurs Anciens)
- [ ] ✅ Pass / [ ] ❌ Fail
- **Commentaires** : 

### 10. Test de Régression (Ancien Logo)
- [ ] ✅ Pass / [ ] ❌ Fail
- **Commentaires** : 

## Conclusion

**Statut Global** : [ ] ✅ Tous les tests passent / [ ] ⚠️ Quelques tests échouent / [ ] ❌ Échec critique

**Recommandations** :
- 
- 
- 

**Prochaines Étapes** :
- 
- 
- 
```

---

## 🎯 Checklist de Validation Finale

### Avant de Déployer en Production
- [ ] **Tous les tests passent** (10/10)
- [ ] **Rapport de tests** complété
- [ ] **Aucune erreur** dans la console
- [ ] **Performance** : Lighthouse > 90
- [ ] **Accessibilité** : Lighthouse > 90
- [ ] **Compatibilité** : Testé sur 3+ navigateurs
- [ ] **Responsive** : Testé sur mobile et desktop
- [ ] **Thème** : Testé en dark et light mode
- [ ] **Contraste** : WCAG 2.1 AA respecté
- [ ] **Documentation** : Lue et comprise

**Résultat attendu** : ✅ Prêt pour déploiement en production

---

## 🆘 Troubleshooting

### Problème : Le logo ne s'affiche pas
**Solutions** :
1. Vérifier le chemin : `/public/images/logos/logo-bandev-contrast-adaptive.svg`
2. Vérifier que le fichier existe
3. Redémarrer le serveur de dev (`npm run dev`)
4. Vider le cache du navigateur (Ctrl+Shift+R)

---

### Problème : Le logo ne change pas de couleur
**Solutions** :
1. Vérifier que les CSS variables sont bien ajoutées dans `globals.css`
2. Vérifier que le thème dark/light fonctionne sur votre site
3. Utiliser les versions statiques si besoin (dark/light)
4. Inspecter le SVG dans DevTools pour voir les styles appliqués

---

### Problème : Le contraste est insuffisant
**Solutions** :
1. Vérifier le fond utilisé (voir `LOGO_BANDEV_CONTRAST_REPORT.md`)
2. Éviter le fond vert Matrix (#00FF45)
3. Utiliser la version adaptative pour un contraste optimal
4. Mesurer le contraste avec WebAIM Contrast Checker

---

### Problème : Le logo est flou ou pixelisé
**Solutions** :
1. Vérifier que le fichier SVG n'est pas corrompu
2. Vérifier que l'attribut `shape-rendering="geometricPrecision"` est présent
3. Vérifier que la taille du logo est correcte (24px minimum)
4. Désactiver les filtres CSS qui pourraient flouter le logo

---

### Problème : Le logo ne s'adapte pas au responsive
**Solutions** :
1. Vérifier que les classes Tailwind sont correctes (`h-6 w-auto md:h-7`)
2. Vérifier que le logo a `width="auto"` ou `w-auto`
3. Tester sur différentes tailles d'écran
4. Inspecter le logo dans DevTools pour voir les styles appliqués

---

## 📚 Documentation Associée

Pour plus d'informations, consultez :

1. **LOGO_BANDEV_CONTRAST_QUICKSTART.md** — Guide de démarrage rapide
2. **LOGO_BANDEV_CONTRAST_INTEGRATION.md** — Guide d'intégration complet
3. **LOGO_BANDEV_CONTRAST_REPORT.md** — Rapport de contraste détaillé
4. **LOGO_BANDEV_CONTRAST_PREVIEW.html** — Aperçu visuel interactif

---

**Créé avec ❤️ pour BANDEV — Contraste Renforcé**
**Version** : 1.0.0