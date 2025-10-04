# 🚀 DÉMARRAGE RAPIDE - Refonte Visuelle

## ⚡ En 30 Secondes

### 1. Voir le Nouveau Logo (10 secondes)

Ouvrez dans votre navigateur :
```
/public/brand/logo-preview-dark.html
```

✨ Vous verrez le logo avec :
- Couleurs doré sombre + vert matrix sombre
- Lignes de code animées
- Intégration dans un header

---

### 2. Démarrer le Site (10 secondes)

```powershell
npm run dev
```

Ouvrez : `http://localhost:3000`

---

### 3. Vérifier les Changements (10 secondes)

**Header :**
- ✅ Logo centré avec nouvelles couleurs
- ✅ Animations de lignes de code

**Sections :**
- ✅ Hauteurs adaptées au contenu
- ✅ Pas d'espaces vides excessifs

---

## 📚 Documentation Complète

### Pour Tout Comprendre (5 minutes)
👉 **RECAP_REFONTE_VISUELLE.md**
- Résumé de tous les changements
- Fichiers modifiés
- Prochaines étapes

### Pour Appliquer les Classes (15 minutes)
👉 **GUIDE_APPLICATION_CLASSES.md**
- Exemples pratiques
- Avant/Après
- Checklist d'application

### Pour les Détails Techniques (30 minutes)
👉 **REFONTE_VISUELLE_COMPLETE.md**
- Documentation complète
- Toutes les classes CSS
- Palette de couleurs

---

## 🎯 Ce Qui a Changé

### Logo BANDEV
- ✅ Doré sombre métallique (#8B7500 → #B8860B)
- ✅ Vert matrix sombre (#0B3D0B → #145214)
- ✅ Lignes de code animées
- ✅ Centrage parfait dans le header

### Sections
- ✅ `.section-compact` pour peu de contenu
- ✅ `.section` pour contenu normal
- ✅ `.section-full` pour hero sections
- ✅ `.section-auto` pour beaucoup de contenu

### Textes
- ✅ `.section-content` pour centrer
- ✅ `.section-title` et `.section-subtitle` améliorés
- ✅ Classes de corps de texte (`.body-large`, `.body-regular`, `.body-small`)

---

## 🚀 Prochaine Étape

Appliquez les nouvelles classes à vos pages :

```jsx
// Avant
<section className="container-page">
  <div className="mb-16 space-y-4 text-center">
    <h2 className="section-title">Titre</h2>
  </div>
</section>

// Après
<section className="section">
  <div className="section-content mb-16">
    <h2 className="section-title">Titre</h2>
  </div>
</section>
```

Consultez **GUIDE_APPLICATION_CLASSES.md** pour plus d'exemples !

---

## ✅ Checklist Rapide

- [ ] Voir le logo dans `logo-preview-dark.html`
- [ ] Démarrer le site avec `npm run dev`
- [ ] Vérifier le header (logo centré, nouvelles couleurs)
- [ ] Lire `RECAP_REFONTE_VISUELLE.md`
- [ ] Appliquer les nouvelles classes avec `GUIDE_APPLICATION_CLASSES.md`
- [ ] Tester sur mobile, tablet, desktop

---

**Temps total estimé :** 30 secondes pour voir, 1 heure pour tout appliquer

**Statut :** ✅ Prêt à l'emploi