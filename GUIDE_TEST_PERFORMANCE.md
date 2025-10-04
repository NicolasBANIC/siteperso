# 🧪 Guide de Test Performance - Page d'Accueil

## 🎯 Objectif
Vérifier que les optimisations ont réduit drastiquement la consommation CPU/GPU et que les ventilateurs ne s'emballent plus.

---

## ✅ Tests à Effectuer

### 1. 🔥 Test des Ventilateurs (Test Principal)

**Avant les optimisations :**
- ❌ Ventilateurs qui s'emballent dès l'ouverture
- ❌ Bruit constant
- ❌ Ordinateur qui chauffe

**Après les optimisations (attendu) :**
- ✅ Ventilateurs silencieux ou très discrets
- ✅ Pas de bruit excessif
- ✅ Température normale

**Procédure :**
1. Fermer tous les onglets du navigateur
2. Ouvrir un nouvel onglet
3. Naviguer vers `http://localhost:3000`
4. Attendre 30 secondes sur la page d'accueil
5. Écouter les ventilateurs
6. Scroller doucement vers le bas
7. Attendre encore 30 secondes

**Résultat attendu :**
- Les ventilateurs restent silencieux ou très discrets
- Pas d'emballement soudain
- Température stable

---

### 2. 📊 Test Chrome DevTools Performance

**Procédure :**
1. Ouvrir Chrome DevTools (F12)
2. Aller dans l'onglet **Performance**
3. Cliquer sur le bouton d'enregistrement (rond)
4. Attendre 10 secondes sur la page d'accueil
5. Scroller doucement
6. Attendre encore 5 secondes
7. Arrêter l'enregistrement

**Analyse :**
- **FPS** : Doit rester stable à ~60 FPS
- **CPU Usage** : Doit être < 40% en moyenne
- **Long Tasks** : Aucune tâche > 50ms
- **Scripting** : < 30% du temps total

**Captures d'écran :**
- Prendre une capture du flamegraph
- Vérifier qu'il n'y a pas de pics rouges

---

### 3. 🎬 Test des Animations

**Procédure :**
1. Ouvrir la page d'accueil
2. Observer chaque effet :
   - Matrix Rain (doit être visible mais subtil)
   - Particules (doivent flotter doucement)
   - Globe 3D (doit tourner lentement)
   - Dégradés (doivent bouger lentement)
   - Vidéo (doit être visible sur desktop, absente sur mobile)

**Vérifications :**
- ✅ Tous les effets sont visibles
- ✅ Les animations sont fluides
- ✅ Pas de saccades
- ✅ Pas de freeze

---

### 4. 📱 Test Mobile

**Procédure :**
1. Ouvrir Chrome DevTools (F12)
2. Activer le mode responsive (Ctrl+Shift+M)
3. Sélectionner "iPhone 12 Pro" ou similaire
4. Recharger la page
5. Observer les performances

**Vérifications :**
- ✅ Vidéo désactivée (remplacée par gradient)
- ✅ Animations fluides
- ✅ Pas de lag
- ✅ Scroll fluide

---

### 5. 🔍 Test Intersection Observer

**Procédure :**
1. Ouvrir la console (F12 → Console)
2. Scroller rapidement vers le bas
3. Scroller rapidement vers le haut
4. Observer les animations

**Vérifications :**
- ✅ Les animations se mettent en pause hors écran
- ✅ Les animations reprennent quand visible
- ✅ Pas de lag lors du scroll

**Test avancé :**
```javascript
// Dans la console, vérifier les canvas
document.querySelectorAll('canvas').forEach((canvas, i) => {
  console.log(`Canvas ${i}:`, canvas.getBoundingClientRect());
});
```

---

### 6. 💾 Test Mémoire

**Procédure :**
1. Ouvrir Chrome DevTools (F12)
2. Aller dans l'onglet **Memory**
3. Prendre un snapshot initial
4. Rester 2 minutes sur la page
5. Prendre un second snapshot
6. Comparer

**Vérifications :**
- ✅ Pas de fuite mémoire (heap stable)
- ✅ Mémoire < 100MB
- ✅ Pas d'augmentation continue

---

### 7. 🌐 Test Multi-onglets

**Procédure :**
1. Ouvrir 3 onglets avec la page d'accueil
2. Basculer entre les onglets
3. Observer les performances

**Vérifications :**
- ✅ Chaque onglet reste fluide
- ✅ Pas de ralentissement global
- ✅ Ventilateurs restent calmes

---

### 8. ⚡ Test Lighthouse

**Procédure :**
```bash
# Build production
npm run build

# Démarrer en mode production
npm run start
```

Puis :
1. Ouvrir Chrome DevTools (F12)
2. Aller dans l'onglet **Lighthouse**
3. Sélectionner :
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
4. Mode : Desktop
5. Cliquer sur "Analyze page load"

**Scores attendus :**
- **Performance** : > 90
- **Accessibility** : > 95
- **Best Practices** : > 95
- **SEO** : 100

**Métriques clés :**
- **FCP** (First Contentful Paint) : < 1.5s
- **LCP** (Largest Contentful Paint) : < 2.5s
- **TBT** (Total Blocking Time) : < 200ms
- **CLS** (Cumulative Layout Shift) : < 0.1

---

### 9. 🎨 Test Qualité Visuelle

**Procédure :**
1. Comparer visuellement avec la version précédente
2. Vérifier que l'aspect reste moderne et premium

**Checklist visuelle :**
- ✅ Matrix Rain visible et subtil
- ✅ Particules présentes et connectées
- ✅ Globe 3D tourne doucement
- ✅ Dégradés animés visibles
- ✅ Vidéo visible (desktop) ou gradient (mobile)
- ✅ Animations d'apparition fluides
- ✅ Pas de perte de qualité notable

---

### 10. ♿ Test Accessibilité

**Procédure :**
1. Activer "Reduce motion" dans les paramètres système :
   - **Windows** : Paramètres → Accessibilité → Affichage → Effets d'animation
   - **Mac** : Préférences Système → Accessibilité → Affichage → Réduire les animations

2. Recharger la page

**Vérifications :**
- ✅ Animations désactivées ou très réduites
- ✅ Page reste utilisable
- ✅ Contenu accessible

---

## 📈 Comparaison Avant/Après

### Métriques à Comparer

| Métrique | Avant | Après (Attendu) | Amélioration |
|----------|-------|-----------------|--------------|
| **CPU Usage** | 80-100% | 20-40% | -60% |
| **FPS** | 30-45 | 55-60 | +50% |
| **Mémoire** | 150-200MB | 80-120MB | -40% |
| **Ventilateurs** | Bruyants | Silencieux | ✅ |
| **Lighthouse Performance** | 60-70 | 90+ | +30 points |
| **TBT** | 500-800ms | <200ms | -70% |

---

## 🐛 Problèmes Potentiels et Solutions

### Problème 1 : Ventilateurs encore bruyants
**Causes possibles :**
- Autres onglets/applications consomment du CPU
- Navigateur non à jour
- Extensions Chrome gourmandes

**Solutions :**
1. Fermer tous les autres onglets
2. Désactiver les extensions
3. Tester en navigation privée
4. Mettre à jour le navigateur

---

### Problème 2 : Animations saccadées
**Causes possibles :**
- GPU non utilisé
- Trop d'onglets ouverts
- Ordinateur ancien

**Solutions :**
1. Vérifier l'accélération matérielle dans Chrome :
   - `chrome://settings/system`
   - Activer "Utiliser l'accélération matérielle si disponible"
2. Fermer les autres applications
3. Considérer les alternatives CSS (voir ALTERNATIVES_VISUELLES_LEGERES.md)

---

### Problème 3 : Effets invisibles
**Causes possibles :**
- Intersection Observer trop strict
- Opacité trop faible
- Z-index incorrect

**Solutions :**
1. Vérifier la console pour les erreurs
2. Augmenter l'opacité dans les composants
3. Vérifier les classes CSS

---

## 🎯 Critères de Validation

### ✅ Test Réussi Si :
1. **Ventilateurs silencieux** pendant 1 minute sur la page
2. **FPS stable** à 55-60 pendant le scroll
3. **CPU < 40%** en moyenne
4. **Lighthouse Performance > 90**
5. **Qualité visuelle préservée** (aspect moderne intact)
6. **Pas de bugs** visuels ou fonctionnels

### ❌ Test Échoué Si :
1. Ventilateurs s'emballent après 30 secondes
2. FPS < 45 de manière constante
3. CPU > 60% en moyenne
4. Lighthouse Performance < 80
5. Perte notable de qualité visuelle
6. Bugs ou erreurs console

---

## 📝 Rapport de Test

Après les tests, remplir ce rapport :

```markdown
# Rapport de Test Performance - Page d'Accueil

**Date :** [DATE]
**Navigateur :** [Chrome/Firefox/Safari] [VERSION]
**OS :** [Windows/Mac/Linux]
**Matériel :** [Processeur, RAM, GPU]

## Résultats

### 1. Test Ventilateurs
- [ ] ✅ Silencieux
- [ ] ⚠️ Discrets
- [ ] ❌ Bruyants

**Notes :** 

### 2. Chrome DevTools Performance
- **FPS moyen :** [XX] FPS
- **CPU Usage :** [XX]%
- **Long Tasks :** [XX]
- **Scripting :** [XX]%

### 3. Lighthouse
- **Performance :** [XX]/100
- **Accessibility :** [XX]/100
- **Best Practices :** [XX]/100
- **SEO :** [XX]/100

### 4. Qualité Visuelle
- [ ] ✅ Identique
- [ ] ⚠️ Légèrement réduite
- [ ] ❌ Dégradée

### 5. Conclusion
- [ ] ✅ Optimisations réussies
- [ ] ⚠️ Améliorations nécessaires
- [ ] ❌ Problèmes majeurs

**Commentaires :**
```

---

## 🚀 Commandes Utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer production
npm run start

# Analyser le bundle
npm run build
# Puis ouvrir .next/analyze/client.html
```

---

## 📚 Ressources

- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

**Date :** $(date)
**Statut :** 📋 Guide de test prêt à utiliser