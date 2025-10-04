# 💻 Snippets d'intégration - Logo BANDEV Moderne

Guide rapide pour intégrer le nouveau logo BANDEV dans différents contextes.

---

## 🎯 Cas d'usage rapides

### 1. Header (SVG inline adaptatif) - RECOMMANDÉ

```jsx
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/" className="brand" aria-label="Accueil BANDEV">
        <svg 
          viewBox="0 0 640 180" 
          xmlns="http://www.w3.org/2000/svg" 
          role="img" 
          className="h-7 w-auto md:h-8"
          shapeRendering="geometricPrecision"
          paintOrder="stroke fill"
          aria-label="Logo BANDEV"
        >
          <title>BANDEV</title>
          <desc>Logo badge : BAN doré, DEV vert néon, chevrons, sous-lignes</desc>
          <style>{`
            .logo-gold { fill: var(--logo-gold, #8C6A18); }
            .logo-green { fill: var(--logo-green, #00FF45); }
            .logo-ink { fill: var(--logo-ink, #0B0B0B); }
            .logo-keyline { fill: none; stroke: var(--logo-keyline, rgba(255,255,255,.85)); stroke-width: 1.35; }
            .logo-glow { fill: var(--logo-green, #00FF45); opacity: 0.4; filter: blur(3px); }
            @media (prefers-color-scheme: dark) {
              .logo-gold { fill: var(--logo-gold, #E5C461); }
              .logo-ink { fill: var(--logo-ink, #FFFFFF); }
              .logo-keyline { stroke: var(--logo-keyline, rgba(0,0,0,.65)); }
            }
          `}</style>
          {/* Voir Header.jsx pour le contenu SVG complet */}
        </svg>
      </Link>
    </header>
  );
}
```

---

### 2. Footer (Icône compacte)

```jsx
export default function Footer() {
  return (
    <footer>
      <div className="flex items-center gap-3">
        <svg 
          viewBox="0 0 120 120" 
          xmlns="http://www.w3.org/2000/svg" 
          role="img" 
          className="h-10 w-10"
          shapeRendering="geometricPrecision"
          aria-label="Logo BANDEV"
        >
          <title>BANDEV Icon</title>
          <desc>Icône compacte BANDEV</desc>
          <style>{`
            .footer-logo-gold { fill: var(--logo-gold, #8C6A18); }
            .footer-logo-green { fill: var(--logo-green, #00FF45); }
            .footer-logo-keyline { fill: none; stroke: var(--logo-keyline, rgba(255,255,255,.85)); stroke-width: 2; }
            @media (prefers-color-scheme: dark) {
              .footer-logo-gold { fill: var(--logo-gold, #E5C461); }
              .footer-logo-keyline { stroke: var(--logo-keyline, rgba(0,0,0,.65)); }
            }
          `}</style>
          {/* Voir Footer.jsx pour le contenu SVG complet */}
        </svg>
        <p className="text-lg font-semibold">BANDEV</p>
      </div>
    </footer>
  );
}
```

---

### 3. Image externe (Next.js)

```jsx
import Image from "next/image";

// Logo adaptatif
<Image 
  src="/images/logos/logo-bandev-modern.svg" 
  alt="Logo BANDEV"
  width={200}
  height={56}
  className="h-8 w-auto"
  priority
/>

// Icône compacte
<Image 
  src="/images/logos/logo-bandev-icon.svg" 
  alt="Logo BANDEV"
  width={40}
  height={40}
  className="h-10 w-10"
/>
```

---

### 4. HTML simple

```html
<!-- Logo adaptatif -->
<img 
  src="/images/logos/logo-bandev-modern.svg" 
  alt="Logo BANDEV"
  style="height: 32px; width: auto;"
/>

<!-- Version dark (fond sombre) -->
<img 
  src="/images/logos/logo-bandev-modern-dark.svg" 
  alt="Logo BANDEV"
  style="height: 32px; width: auto;"
/>

<!-- Version light (fond clair) -->
<img 
  src="/images/logos/logo-bandev-modern-light.svg" 
  alt="Logo BANDEV"
  style="height: 32px; width: auto;"
/>
```

---

### 5. Email HTML

```html
<!-- Utiliser la version fixe selon le fond -->
<table>
  <tr>
    <td style="padding: 20px;">
      <img 
        src="https://bandev.fr/images/logos/logo-bandev-modern-light.svg" 
        alt="Logo BANDEV"
        width="200"
        height="56"
        style="display: block; height: auto;"
      />
    </td>
  </tr>
</table>
```

---

### 6. Markdown (README, docs)

```markdown
![Logo BANDEV](public/images/logos/logo-bandev-modern.svg)

<!-- Avec lien -->
[![Logo BANDEV](public/images/logos/logo-bandev-modern.svg)](https://bandev.fr)

<!-- Taille contrôlée (HTML dans Markdown) -->
<img src="public/images/logos/logo-bandev-modern.svg" alt="Logo BANDEV" height="40">
```

---

### 7. CSS Background

```css
.logo-background {
  background-image: url('/images/logos/logo-bandev-modern.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 200px;
  height: 56px;
}
```

---

### 8. React Native / Expo

```jsx
import { SvgUri } from 'react-native-svg';

<SvgUri
  uri="https://bandev.fr/images/logos/logo-bandev-modern.svg"
  width="200"
  height="56"
/>
```

---

## 🎨 Variables CSS (à ajouter dans globals.css)

```css
:root {
  /* Logo BANDEV tokens */
  --logo-gold: #8C6A18;
  --logo-green: #00FF45;
  --logo-ink: #0B0B0B;
  --logo-keyline: rgba(255, 255, 255, 0.85);
}

.dark {
  /* Logo BANDEV tokens (dark mode) */
  --logo-gold: #E5C461;
  --logo-ink: #FFFFFF;
  --logo-keyline: rgba(0, 0, 0, 0.65);
}
```

---

## 📏 Tailles recommandées

```css
/* Header mobile */
.logo-header-mobile {
  height: 28px;
  width: auto;
}

/* Header desktop */
.logo-header-desktop {
  height: 32px;
  width: auto;
}

/* Footer */
.logo-footer {
  height: 40px;
  width: auto;
}

/* Hero section */
.logo-hero {
  height: 64px;
  width: auto;
}

/* Favicon / Avatar */
.logo-icon {
  height: 24px;
  width: 24px;
}
```

---

## 🔧 Tailwind CSS Classes

```jsx
// Header
<svg className="h-7 w-auto md:h-8" />

// Footer
<svg className="h-10 w-10" />

// Hero
<svg className="h-16 w-auto" />

// Icône
<svg className="h-6 w-6" />
```

---

## 🎯 Choix de la variante

| Contexte | Fichier à utiliser |
|----------|-------------------|
| **Header/Footer** (inline) | `logo-bandev-modern.svg` (adaptatif) |
| **Email fond clair** | `logo-bandev-modern-light.svg` |
| **Email fond sombre** | `logo-bandev-modern-dark.svg` |
| **PDF/Print fond clair** | `logo-bandev-modern-light.svg` |
| **PDF/Print fond sombre** | `logo-bandev-modern-dark.svg` |
| **Favicon/Avatar** | `logo-bandev-icon.svg` |
| **OG Image** | `logo-bandev-modern.svg` |
| **Réseaux sociaux** | `logo-bandev-icon.svg` (carré) |

---

## ♿ Accessibilité

### Attributs ARIA obligatoires

```jsx
<svg 
  role="img" 
  aria-label="Logo BANDEV"
>
  <title>BANDEV</title>
  <desc>Logo badge : BAN doré, DEV vert néon, chevrons, sous-lignes</desc>
  {/* Contenu SVG */}
</svg>
```

### Pour les images externes

```jsx
<Image 
  src="/images/logos/logo-bandev-modern.svg" 
  alt="Logo BANDEV - Développeur web freelance"
  // ...
/>
```

---

## 🚀 Performance

### Inline SVG (recommandé)
✅ **Avantages** :
- Chargement immédiat (pas de requête HTTP)
- Variables CSS adaptatives
- Contrôle total du style
- Pas de CLS (Cumulative Layout Shift)

❌ **Inconvénients** :
- Augmente la taille du HTML (~4 KB)
- Pas de cache navigateur

### Image externe
✅ **Avantages** :
- Cache navigateur
- HTML plus léger
- Réutilisable

❌ **Inconvénients** :
- Requête HTTP supplémentaire
- Pas de contrôle CSS direct
- Possible CLS si dimensions non définies

---

## 📦 Export pour design tools

### Figma
1. Importer le SVG : `File > Import > logo-bandev-modern.svg`
2. Le logo est vectoriel, entièrement éditable
3. Couleurs : utiliser les tokens CSS

### Adobe Illustrator
1. Ouvrir le SVG : `File > Open > logo-bandev-modern.svg`
2. Éditer les paths si nécessaire
3. Exporter : `File > Export > Export As > SVG`

### Sketch
1. Drag & drop le fichier SVG
2. Convertir en symbole pour réutilisation
3. Couleurs : créer des styles partagés

---

## 🎨 Personnalisation des couleurs

### Modifier les couleurs globalement

```css
/* Dans votre CSS */
:root {
  --logo-gold: #FFD700;      /* Or plus clair */
  --logo-green: #39FF14;     /* Vert plus vif */
  --logo-ink: #000000;       /* Noir pur */
}
```

### Modifier pour un composant spécifique

```jsx
<svg 
  style={{
    '--logo-gold': '#FFD700',
    '--logo-green': '#39FF14'
  }}
>
  {/* Contenu SVG */}
</svg>
```

---

## 🔍 Debugging

### Le logo ne s'affiche pas
1. Vérifier le chemin : `/images/logos/logo-bandev-modern.svg`
2. Vérifier que le fichier existe dans `public/`
3. Vérifier la console pour erreurs 404

### Les couleurs ne changent pas en dark mode
1. Vérifier que les variables CSS sont définies dans `globals.css`
2. Vérifier que la classe `.dark` est appliquée au `<body>` ou `<html>`
3. Vérifier que `prefers-color-scheme` fonctionne

### L'effet glow ne s'affiche pas
1. Vérifier que le navigateur supporte les filtres SVG
2. Vérifier que le calque `.logo-glow` est présent
3. Essayer d'augmenter l'opacité pour tester

---

## 📞 Support

Pour toute question :
- **Documentation complète** : `LOGO_BANDEV_MODERN_README.md`
- **Changelog** : `CHANGELOG_LOGO_BANDEV_MODERN.md`
- **Exemples** : `src/components/Header.jsx`, `src/components/Footer.jsx`

---

**Dernière mise à jour** : Décembre 2024  
**Version** : 2.0