# 🧪 Tests Rapides - Post-Refactoring

Ce document contient toutes les commandes et procédures de test à exécuter après le refactoring.

---

## 🚀 Tests Automatisés

### 1. Build Production

```bash
npm run build
```

**Attendu :** ✅ SUCCESS, 0 erreurs, 24 pages générées

**Vérifier :**
- Compilation réussie
- Aucune erreur de build
- Warnings acceptables (import "next" dans pages statiques)

---

### 2. Lint

```bash
npm run lint
```

**Attendu :** ✅ 0 erreurs, 0 warnings

---

### 3. Format Check

```bash
npm run format:check
```

**Attendu :** ✅ Tous les fichiers correctement formatés

**Si échec :**
```bash
npm run format
```

---

### 4. Type Check (si TypeScript)

```bash
npm run typecheck
```

**Attendu :** ✅ 0 erreurs de type

---

### 5. Lighthouse (si configuré)

```bash
npm run lighthouse
```

**Cibles :**
- Performance : ≥ 90
- Accessibility : ≥ 95
- Best Practices : ≥ 90
- SEO : ≥ 95

**Métriques clés :**
- CLS (Cumulative Layout Shift) : < 0.1
- LCP (Largest Contentful Paint) : < 2.5s
- FID (First Input Delay) : < 100ms

---

## 🖱️ Tests Manuels

### Footer

#### Test 1 : Responsive Design

**Mobile (< 768px) :**
1. Ouvrir DevTools (F12)
2. Activer le mode responsive (Ctrl+Shift+M)
3. Définir la largeur à 375px (iPhone SE)
4. Vérifier que le footer affiche **1 colonne** (stacked)
5. Vérifier que tous les éléments sont lisibles
6. Vérifier l'espacement entre les sections

**Tablette (768px - 1024px) :**
1. Définir la largeur à 768px (iPad)
2. Vérifier que le footer affiche **2 colonnes**
3. Vérifier l'équilibre visuel
4. Tester en mode portrait et paysage

**Desktop (≥ 1024px) :**
1. Définir la largeur à 1920px
2. Vérifier que le footer affiche **3 colonnes**
3. Vérifier l'alignement et l'espacement
4. Vérifier que les colonnes sont équilibrées

**Résultat attendu :** ✅ Layout stable et harmonieux à tous les breakpoints

---

#### Test 2 : Navigation Clavier

1. Ouvrir la page d'accueil
2. Appuyer sur `Tab` jusqu'à atteindre le footer
3. Vérifier que le focus est visible sur chaque lien
4. Vérifier que les liens sociaux ont un ring bleu visible
5. Vérifier que `Shift+Tab` fonctionne (navigation inverse)
6. Appuyer sur `Enter` sur un lien pour vérifier qu'il fonctionne

**Résultat attendu :** ✅ Focus visible avec ring bleu, navigation fluide

---

#### Test 3 : Liens Fonctionnels

Vérifier que tous les liens du footer fonctionnent :

**Navigation :**
- [ ] Services → `/services`
- [ ] Portfolio → `/portfolio`
- [ ] Tarifs → `/tarifs`
- [ ] Processus → `/processus`
- [ ] À propos → `/apropos`
- [ ] Contact → `/contact`
- [ ] Mentions légales → `/mentions-legales`
- [ ] Politique de confidentialité → `/politique-confidentialite`

**Contact :**
- [ ] Email → `mailto:bcnicolaspro@gmail.com`
- [ ] Téléphone → `tel:+33XXXXXXXXX`

**Réseaux sociaux :**
- [ ] LinkedIn → Ouvre le profil LinkedIn
- [ ] GitHub → Ouvre le profil GitHub
- [ ] Twitter → Ouvre le profil Twitter
- [ ] Instagram → Ouvre le profil Instagram

**Résultat attendu :** ✅ Tous les liens fonctionnent correctement

---

#### Test 4 : Mode Sombre / Clair

1. Activer le mode sombre (si disponible)
2. Vérifier le contraste du footer
3. Vérifier la lisibilité du texte
4. Vérifier les couleurs des liens
5. Activer le mode clair
6. Répéter les vérifications

**Résultat attendu :** ✅ Contraste suffisant dans les deux modes (WCAG AA)

---

### Carrousel de Témoignages

#### Test 5 : Stabilité du Layout

1. Ouvrir la page d'accueil
2. Scroller jusqu'au carrousel de témoignages
3. Observer les transitions automatiques (6 secondes)
4. Vérifier qu'il n'y a **aucun saut visuel** lors du changement de slide
5. Vérifier que la hauteur du conteneur reste stable

**Résultat attendu :** ✅ Aucun saut visuel, hauteur stable

---

#### Test 6 : Navigation par Flèches

1. Cliquer sur la flèche droite (→)
2. Vérifier que le slide suivant s'affiche
3. Vérifier la fluidité de la transition
4. Cliquer sur la flèche gauche (←)
5. Vérifier que le slide précédent s'affiche
6. Vérifier que la navigation est circulaire (dernier → premier)

**Résultat attendu :** ✅ Navigation fluide, transitions à 60 FPS

---

#### Test 7 : Navigation par Indicateurs (Dots)

1. Cliquer sur le deuxième indicateur (dot)
2. Vérifier que le deuxième témoignage s'affiche
3. Vérifier que l'indicateur actif change de couleur
4. Cliquer sur le troisième indicateur
5. Vérifier le changement de slide

**Résultat attendu :** ✅ Navigation directe fonctionnelle, indicateurs mis à jour

---

#### Test 8 : Drag Gesture (Swipe)

**Desktop :**
1. Cliquer et maintenir sur le témoignage
2. Glisser vers la gauche
3. Relâcher
4. Vérifier que le slide suivant s'affiche
5. Répéter en glissant vers la droite

**Mobile :**
1. Ouvrir sur un appareil mobile ou simulateur
2. Swiper vers la gauche
3. Vérifier le changement de slide
4. Swiper vers la droite
5. Vérifier le changement de slide

**Résultat attendu :** ✅ Drag gestures fonctionnels, transitions fluides

---

#### Test 9 : Auto-Play

1. Ouvrir la page d'accueil
2. Scroller jusqu'au carrousel
3. Ne pas toucher au carrousel
4. Attendre 6 secondes
5. Vérifier que le slide change automatiquement
6. Attendre 6 secondes supplémentaires
7. Vérifier le changement suivant

**Résultat attendu :** ✅ Auto-play fonctionne (6 secondes par slide)

---

#### Test 10 : Navigation Clavier (Carrousel)

1. Appuyer sur `Tab` jusqu'à atteindre le carrousel
2. Vérifier que le focus est sur le bouton "Précédent"
3. Appuyer sur `Enter` pour naviguer
4. Appuyer sur `Tab` pour atteindre les indicateurs
5. Appuyer sur `Enter` pour sélectionner un indicateur
6. Appuyer sur `Tab` pour atteindre le bouton "Suivant"
7. Appuyer sur `Enter` pour naviguer

**Résultat attendu :** ✅ Navigation clavier complète, focus visible

---

#### Test 11 : Images des Témoignages

1. Ouvrir DevTools (F12)
2. Onglet "Network"
3. Filtrer par "Img"
4. Recharger la page
5. Vérifier que les images se chargent :
   - `/images/testimonial-avatar1.jpg`
   - `/images/testimonial-avatar2.jpg`
   - `/images/testimonial-avatar3.jpg`
6. Vérifier qu'il n'y a pas d'erreur 404

**Si erreur 404 :**
- Ajouter des images de placeholder
- Ou utiliser des avatars génériques

**Résultat attendu :** ✅ Toutes les images se chargent sans erreur

---

#### Test 12 : Performance du Carrousel

1. Ouvrir DevTools (F12)
2. Onglet "Performance"
3. Cliquer sur "Record"
4. Naviguer dans le carrousel (3-4 transitions)
5. Arrêter l'enregistrement
6. Vérifier le FPS (doit être proche de 60)
7. Vérifier qu'il n'y a pas de "Layout Shift" dans la timeline

**Résultat attendu :** ✅ 60 FPS, pas de layout shift

---

### Politique de Confidentialité

#### Test 13 : Vérification des Références Newsletter

1. Ouvrir `/politique-confidentialite`
2. Rechercher "newsletter" (Ctrl+F)
3. Vérifier qu'il n'y a **aucune occurrence**
4. Vérifier que la section 2.2 est "Données de navigation"
5. Vérifier que la section 3 ne mentionne pas "Envoyer la newsletter"
6. Vérifier que la section 6 ne mentionne pas "Newsletter : Jusqu'à votre désinscription"

**Résultat attendu :** ✅ Aucune mention de la newsletter

---

## 🌐 Tests Cross-Browser

### Navigateurs Desktop

- [ ] **Chrome** (dernière version)
  - Footer responsive
  - Carrousel fluide
  - Aucun saut visuel

- [ ] **Firefox** (dernière version)
  - Footer responsive
  - Carrousel fluide
  - Aucun saut visuel

- [ ] **Safari** (macOS)
  - Footer responsive
  - Carrousel fluide
  - Aucun saut visuel

- [ ] **Edge** (dernière version)
  - Footer responsive
  - Carrousel fluide
  - Aucun saut visuel

### Navigateurs Mobile

- [ ] **Chrome Mobile** (Android)
  - Footer 1 colonne
  - Carrousel swipe fonctionnel
  - Hauteur stable

- [ ] **Safari Mobile** (iOS)
  - Footer 1 colonne
  - Carrousel swipe fonctionnel
  - Hauteur stable

---

## 📊 Checklist Complète

### Avant Déploiement

- [x] Build production réussi
- [x] Lint passé sans erreur
- [ ] Tests manuels footer effectués
- [ ] Tests manuels carrousel effectués
- [ ] Tests cross-browser effectués
- [ ] Lighthouse audit effectué (scores ≥ 90)
- [ ] Images des témoignages vérifiées
- [ ] Politique de confidentialité vérifiée
- [ ] CHANGELOG.md mis à jour
- [ ] README.md mis à jour

### Après Déploiement

- [ ] Vérifier le site en production
- [ ] Tester sur mobile réel (iOS + Android)
- [ ] Vérifier les variables d'environnement
- [ ] Supprimer les variables newsletter (plateforme)
- [ ] Vérifier les analytics (pas d'erreurs)
- [ ] Notifier les abonnés newsletter (si applicable)

---

## 🐛 Problèmes Connus & Solutions

### Problème 1 : Images des Témoignages Manquantes

**Symptôme :** Erreur 404 sur `/images/testimonial-avatar1.jpg`

**Solution :**
1. Ajouter des images de placeholder dans `public/images/`
2. Ou utiliser des avatars génériques (Unsplash, UI Avatars)
3. Ou générer des avatars avec initiales

**Commande pour générer des placeholders :**
```bash
# Télécharger des avatars depuis Unsplash
curl -o public/images/testimonial-avatar1.jpg https://source.unsplash.com/96x96/?portrait,professional
curl -o public/images/testimonial-avatar2.jpg https://source.unsplash.com/96x96/?portrait,business
curl -o public/images/testimonial-avatar3.jpg https://source.unsplash.com/96x96/?portrait,woman
```

---

### Problème 2 : Hauteur du Carrousel Trop Grande sur Mobile

**Symptôme :** Espace vide en bas du carrousel sur mobile

**Solution :**
Modifier `src/components/TestimonialSlider.jsx` :

```jsx
// Remplacer
style={{ minHeight: '450px' }}

// Par
style={{ minHeight: 'clamp(400px, 50vh, 600px)' }}
```

---

### Problème 3 : Warnings ESLint sur Import "next"

**Symptôme :** Warnings lors du build sur import "next"

**Solution :**
Ces warnings sont normaux pour les pages statiques. Ils ne sont pas bloquants.

**Si vous voulez les supprimer :**
Vérifier que les pages concernées n'importent pas directement "next" mais utilisent "next/link", "next/image", etc.

---

## 📞 Support

**Problème non résolu ?**
- Consulter `docs/rapport-travaux.md` pour plus de détails
- Ouvrir une issue sur le repository Git
- Contacter le développeur : bcnicolaspro@gmail.com

---

**Date de création :** 2025-01-XX  
**Version :** 1.0  
**Statut :** ✅ Prêt pour les tests