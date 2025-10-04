# 📖 Guide Typographie Inter — Référence Rapide

## 🎯 Cheat Sheet : Classes à Utiliser

### **Titres & Hero**

```jsx
// Hero principal (page d'accueil)
<h1 className="text-hero font-bold tracking-tighter">
  Titre Principal
</h1>

// Titre de section (H2)
<h2 className="text-heading-xl font-semibold">
  Titre de Section
</h2>

// Sous-titre important (H3)
<h3 className="text-heading-lg font-semibold">
  Sous-titre
</h3>

// Titre de carte (H4)
<h4 className="text-heading-md font-semibold">
  Titre de Carte
</h4>

// Petit titre (H5)
<h5 className="text-heading-sm font-semibold">
  Petit Titre
</h5>
```

---

### **Corps de Texte**

```jsx
// Introduction / Lead paragraph
<p className="text-body-lg leading-relaxed">
  Texte d'introduction important...
</p>

// Paragraphe standard
<p className="text-body leading-relaxed">
  Texte de paragraphe normal...
</p>

// Texte secondaire
<p className="text-body-sm">
  Texte secondaire ou description...
</p>

// Légende / Note
<p className="text-caption">
  Petite note ou légende...
</p>
```

---

### **Éléments UI**

```jsx
// Bouton primaire
<button className="btn-primary">
  Cliquez ici
</button>

// Bouton secondaire
<button className="btn-secondary">
  En savoir plus
</button>

// Badge / Tag
<span className="badge">
  Nouveau
</span>

// Eyebrow (surtitres)
<span className="eyebrow">
  CATÉGORIE
</span>

// Lien de navigation
<a className="text-ui font-medium">
  Menu Item
</a>

// Label de formulaire
<label className="text-ui-sm font-medium">
  Nom complet
</label>
```

---

### **Couleurs de Texte**

```jsx
// Texte principal
text-[var(--color-foreground)]

// Texte secondaire / muted
text-[var(--color-muted)]

// Accent (bleu roi)
text-[var(--color-accent)]

// Accent secondaire (bleu pétrole)
text-[var(--color-accent-secondary)]

// Matrix (vert)
text-[var(--color-accent-matrix)]

// Blanc (pour fonds colorés)
text-white
```

---

## 📏 Tableau de Référence Rapide

| Usage | Classe | Taille | Graisse | Couleur |
|-------|--------|--------|---------|---------|
| **Hero** | `.text-hero` | 40-64px | 700 | `--color-foreground` |
| **Titre Section** | `.text-heading-xl` | 28-40px | 600 | `--color-foreground` |
| **Sous-titre** | `.text-heading-lg` | 24-32px | 600 | `--color-foreground` |
| **Titre Carte** | `.text-heading-md` | 20-24px | 600 | `--color-foreground` |
| **Intro** | `.text-body-lg` | 18-20px | 400 | `--color-muted` |
| **Paragraphe** | `.text-body` | 16-18px | 400 | `--color-muted` |
| **Texte Petit** | `.text-body-sm` | 14-16px | 400 | `--color-muted` |
| **Bouton** | `.btn-primary` | 14-16px | 600 | `white` |
| **Menu** | `.text-ui` | 14-16px | 500 | `--color-muted` |
| **Badge** | `.badge` | 12-14px | 500 | `--color-accent` |
| **Eyebrow** | `.eyebrow` | 12-14px | 600 | `--color-accent` |

---

## ⚡ Exemples Complets

### **Section Hero**
```jsx
<section className="container-page">
  <div className="space-y-6 text-center">
    <span className="eyebrow">
      DÉVELOPPEUR WEB FREELANCE
    </span>
    
    <h1 className="text-hero font-bold tracking-tighter text-[var(--color-foreground)]">
      Créons ensemble votre{" "}
      <span className="text-[var(--color-accent)]">
        projet digital
      </span>
    </h1>
    
    <p className="text-body-lg leading-relaxed text-[var(--color-muted)] max-w-2xl mx-auto">
      Développeur Full-Stack spécialisé en Next.js et React. 
      Je transforme vos idées en applications web modernes et performantes.
    </p>
    
    <div className="flex gap-4 justify-center">
      <button className="btn-primary">
        Demander un devis
      </button>
      <button className="btn-secondary">
        Voir mes projets
      </button>
    </div>
  </div>
</section>
```

---

### **Card de Service**
```jsx
<article className="card">
  <div className="flex items-center gap-4 mb-4">
    <div className="h-12 w-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
      <Icon className="h-6 w-6 text-[var(--color-accent)]" />
    </div>
    <span className="badge">
      Populaire
    </span>
  </div>
  
  <h3 className="text-heading-md font-semibold text-[var(--color-foreground)] mb-3">
    Site Vitrine Premium
  </h3>
  
  <p className="text-body text-[var(--color-muted)] leading-relaxed mb-4">
    Une présence en ligne élégante, responsive et optimisée pour vos clients.
  </p>
  
  <ul className="space-y-2">
    <li className="flex items-start gap-2 text-body-sm text-[var(--color-muted)]">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
      Design personnalisé et moderne
    </li>
    <li className="flex items-start gap-2 text-body-sm text-[var(--color-muted)]">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
      Optimisation SEO avancée
    </li>
  </ul>
  
  <button className="btn-primary mt-6 w-full">
    En savoir plus
  </button>
</article>
```

---

### **Formulaire**
```jsx
<form className="space-y-6">
  <div>
    <label htmlFor="name" className="block text-ui-sm font-medium text-[var(--color-foreground)] mb-2">
      Nom complet <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      id="name"
      className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-body text-[var(--color-foreground)] focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
      placeholder="Jean Dupont"
    />
    <p className="mt-1 text-body-sm text-[var(--color-muted)]">
      Votre nom tel qu'il apparaîtra sur les documents
    </p>
  </div>
  
  <button type="submit" className="btn-primary w-full">
    Envoyer le formulaire
  </button>
</form>
```

---

### **Section CTA**
```jsx
<section className="rounded-3xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] px-8 py-12 text-white">
  <div className="max-w-2xl mx-auto text-center space-y-6">
    <h2 className="text-heading-xl font-bold tracking-tight">
      Prêt à démarrer votre projet ?
    </h2>
    
    <p className="text-body-lg text-white/90">
      Contactez-moi pour un devis gratuit et personnalisé. 
      Je réponds sous 24h.
    </p>
    
    <div className="flex gap-4 justify-center">
      <button className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-ui font-semibold text-[var(--color-accent)] shadow-lg transition-all hover:-translate-y-0.5">
        Demander un devis
      </button>
      <button className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 text-ui font-semibold text-white transition-all hover:bg-white hover:text-[var(--color-accent)]">
        Me contacter
      </button>
    </div>
  </div>
</section>
```

---

## 🎨 Graisses de Police (Font Weights)

```jsx
// Regular (400) - Corps de texte
<p className="font-regular">Texte normal</p>

// Medium (500) - Éléments UI
<span className="font-medium">Menu, boutons</span>

// SemiBold (600) - Titres H2-H6
<h2 className="font-semibold">Titre de section</h2>

// Bold (700) - H1, Hero, CTA
<h1 className="font-bold">Titre principal</h1>
```

---

## 📐 Letter-Spacing

```jsx
// Très serré (-0.02em) - Hero
<h1 className="tracking-tighter">Hero Title</h1>

// Serré (-0.01em) - Titres H2-H3
<h2 className="tracking-tight">Section Title</h2>

// Normal (0) - Corps de texte
<p className="tracking-normal">Paragraph text</p>

// Large (0.005em) - Boutons
<button className="tracking-wide">Button</button>

// Très large (0.08em) - Eyebrows
<span className="tracking-widest">CATEGORY</span>
```

---

## 🚫 À Éviter

### **❌ NE PAS UTILISER**
```jsx
// Classes Tailwind natives
<h1 className="text-4xl">Titre</h1>           // ❌
<p className="text-sm">Texte</p>              // ❌
<span className="text-lg">Badge</span>        // ❌

// Couleurs hardcodées
<p className="text-gray-900">Texte</p>        // ❌
<h2 className="text-blue-600">Titre</h2>      // ❌
<span className="text-white">Badge</span>     // ❌ (sauf sur fond coloré)

// Graisses non standardisées
<h1 className="font-extrabold">Titre</h1>     // ❌
<p className="font-light">Texte</p>           // ❌
```

### **✅ UTILISER À LA PLACE**
```jsx
// Classes personnalisées
<h1 className="text-hero">Titre</h1>                              // ✅
<p className="text-body-sm">Texte</p>                             // ✅
<span className="badge">Badge</span>                              // ✅

// Variables CSS
<p className="text-[var(--color-foreground)]">Texte</p>          // ✅
<h2 className="text-[var(--color-accent)]">Titre</h2>            // ✅
<span className="text-white">Badge</span>                         // ✅ (sur fond coloré uniquement)

// Graisses standardisées
<h1 className="font-bold">Titre</h1>                              // ✅
<p className="font-regular">Texte</p>                             // ✅
```

---

## 💡 Conseils Pro

### **1. Hiérarchie Visuelle**
- Toujours utiliser `.text-hero` pour le titre principal de la page
- Limiter à 1 seul `.text-hero` par page
- Utiliser `.text-heading-xl` pour les titres de sections principales
- Respecter l'ordre H1 → H2 → H3 pour le SEO

### **2. Lisibilité**
- Toujours ajouter `leading-relaxed` aux paragraphes longs
- Utiliser `max-w-2xl` ou `max-w-3xl` pour limiter la largeur des textes
- Préférer `text-[var(--color-muted)]` pour les paragraphes (meilleur contraste)

### **3. Cohérence**
- Utiliser `.btn-primary` et `.btn-secondary` pour tous les boutons
- Utiliser `.badge` pour tous les badges/tags
- Utiliser `.eyebrow` pour tous les surtitres/catégories

### **4. Accessibilité**
- Ne jamais descendre en dessous de `text-caption` (12px minimum)
- Toujours respecter les contrastes de couleurs
- Utiliser `font-medium` minimum pour les éléments cliquables

---

## 🔍 Debugging

### **Comment vérifier la cohérence ?**

1. **Rechercher les classes Tailwind natives** :
   ```bash
   # Chercher text-sm, text-lg, etc.
   grep -r "text-\(xs\|sm\|base\|lg\|xl\|2xl\|3xl\)" src/
   ```

2. **Rechercher les couleurs hardcodées** :
   ```bash
   # Chercher text-gray-, text-blue-, etc.
   grep -r "text-\(gray\|blue\|red\|green\)-" src/
   ```

3. **Vérifier les graisses de police** :
   ```bash
   # Chercher font-light, font-extrabold, etc.
   grep -r "font-\(thin\|light\|extralight\|extrabold\|black\)" src/
   ```

---

## 📞 Besoin d'Aide ?

Si vous avez un doute sur quelle classe utiliser :

1. **Pour un titre** → Utilisez `.text-heading-*` selon l'importance
2. **Pour du texte** → Utilisez `.text-body` ou `.text-body-sm`
3. **Pour un bouton** → Utilisez `.btn-primary` ou `.btn-secondary`
4. **Pour un badge** → Utilisez `.badge`
5. **Pour un menu** → Utilisez `.text-ui font-medium`

---

**Dernière mise à jour** : ${new Date().toLocaleDateString('fr-FR')}
**Police** : Inter (Google Fonts)
**Variantes** : 400, 500, 600, 700