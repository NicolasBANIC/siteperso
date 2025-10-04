# ⚡ Référence Rapide - Typographie Inter

## 🎯 Classes essentielles

### Titres
```jsx
<h1 className="text-hero font-bold tracking-tighter">        // 40-64px, Bold 700
<h2 className="text-heading-xl font-semibold tracking-tight"> // 28-40px, SemiBold 600
<h3 className="text-heading-lg font-semibold">               // 24-32px, SemiBold 600
<h4 className="text-heading-md font-semibold">               // 20-24px, SemiBold 600
```

### Corps de texte
```jsx
<p className="text-body-lg leading-relaxed">  // 18-20px, Regular 400
<p className="text-body leading-relaxed">     // 16-18px, Regular 400
<p className="text-body-sm">                  // 14-16px, Regular 400
<small className="text-caption">             // 12-14px, Regular 400
```

### UI / Composants
```jsx
<button className="btn-primary">             // 14-16px, SemiBold 600
<button className="btn-secondary">           // 14-16px, Medium 500
<span className="badge">                     // 12-14px, Medium 500
<span className="eyebrow">                   // 12-14px, SemiBold 600, uppercase
```

---

## 📏 Graisses

| Classe | Poids | Usage |
|--------|-------|-------|
| `font-regular` | 400 | Paragraphes |
| `font-medium` | 500 | Navigation, UI |
| `font-semibold` | 600 | Titres, Boutons |
| `font-bold` | 700 | H1, Hero |

---

## ✍️ Letter-spacing

| Classe | Valeur | Usage |
|--------|--------|-------|
| `tracking-tighter` | -0.02em | H1, grands titres |
| `tracking-tight` | -0.01em | H2, H3 |
| `tracking-normal` | 0 | Paragraphes |
| `tracking-wide` | 0.005em | Boutons |
| `tracking-widest` | 0.08em | Eyebrow, uppercase |

---

## 📐 Line-height

| Classe | Valeur | Usage |
|--------|--------|-------|
| `leading-tight` | 1.1 | H1 |
| `leading-snug` | 1.2 | H2, H3 |
| `leading-normal` | 1.4 | Boutons, UI |
| `leading-relaxed` | 1.6 | Paragraphes |

---

## 🎨 Exemples rapides

### Hero
```jsx
<span className="eyebrow">Nouveau</span>
<h1 className="text-hero font-bold tracking-tighter leading-tight">
  Titre principal
</h1>
<p className="text-body-lg leading-relaxed">Description</p>
<button className="btn-primary">CTA</button>
```

### Section
```jsx
<h2 className="section-title">Titre de section</h2>
<p className="section-subtitle">Sous-titre</p>
```

### Card
```jsx
<div className="card">
  <h3 className="text-heading-md font-semibold">Titre</h3>
  <p className="text-body text-[var(--color-muted)]">Description</p>
  <span className="badge">Tag</span>
</div>
```

---

## 📱 Responsive automatique

Toutes les classes utilisent `clamp()` :
- **Mobile** : Taille minimale
- **Tablet** : Taille fluide (viewport-based)
- **Desktop** : Taille maximale

**Aucun breakpoint manuel nécessaire !**

---

## ✅ Checklist

- [ ] Utiliser `.text-hero` pour H1
- [ ] Utiliser `.text-heading-xl` pour H2
- [ ] Utiliser `.text-body` pour paragraphes
- [ ] Utiliser `.btn-primary` pour CTA
- [ ] Ajouter `leading-relaxed` aux paragraphes
- [ ] Ajouter `tracking-tighter` aux grands titres
- [ ] Utiliser `font-semibold` pour titres
- [ ] Utiliser `font-regular` pour texte

---

**Docs complètes** : `GUIDE_TYPOGRAPHIE_INTER.md`  
**Exemples** : `EXEMPLES_TYPOGRAPHIE.md`