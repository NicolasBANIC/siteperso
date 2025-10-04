# 🎨 Logo BANDEV — Assets SVG

## 📦 Fichiers Disponibles

### **1. logo-bandev-optimized.svg** (Recommandé)
Version minifiée et optimisée pour utilisation inline dans le header.
- **Poids** : ~2 KB
- **Usage** : Header, inline SVG
- **Couleurs** : Or #D4AF37, Blanc #FFFFFF, Vert Matrix #00FF45

### **2. logo-bandev.svg**
Version complète avec styles CSS internes.
- **Poids** : ~2.5 KB
- **Usage** : Référence, édition
- **Couleurs** : Or #D4AF37, Blanc #FFFFFF, Vert Matrix #00FF45

### **3. logo-bandev-mono.svg**
Variante monochrome utilisant `currentColor`.
- **Poids** : ~2 KB
- **Usage** : S'adapte à la couleur du texte parent
- **Couleurs** : `currentColor` (hérite de la couleur du parent)

### **4. logo-bandev-inverse.svg**
Variante inversée pour fond clair.
- **Poids** : ~2 KB
- **Usage** : Fond clair, mode light
- **Couleurs** : Or #D4AF37, Noir #0B0B0B, Vert Matrix #00FF45

---

## 🆕 Variantes Contraste Renforcé (Nouveau)

### **5. logo-bandev-contrast-adaptive.svg** ⭐ (Recommandé)
Version thème-aware avec contraste renforcé qui s'adapte automatiquement au thème (dark/light).
- **Poids** : ~3.5 KB
- **Usage** : **Recommandé pour tous les contextes** (header, footer, etc.)
- **Fonctionnalité** : Détecte `prefers-color-scheme` et ajuste les couleurs automatiquement
- **Couleurs Dark** : Or clair #E5C461, Blanc #FFFFFF, Vert #00FF45
- **Couleurs Light** : Or profond #8C6A18, Noir #0B0B0B, Vert #00FF45
- **Contraste** : WCAG 2.1 AA/AAA (texte 16.2–18.5:1, graphiques 5.2–9.2:1)
- **Keyline** : Contour de 1.25px pour lisibilité renforcée

### **6. logo-bandev-contrast-dark.svg**
Version statique avec contraste renforcé pour fonds sombres.
- **Poids** : ~2.8 KB
- **Usage** : Fonds sombres uniquement (#0B0B0B, #111, etc.)
- **Couleurs** : Or clair #E5C461, Blanc #FFFFFF, Vert #00FF45
- **Contraste** : WCAG 2.1 AAA (texte 15.8–18.5:1, graphiques 7.8–9.2:1)
- **Keyline** : Contour noir rgba(0,0,0,.65)

### **7. logo-bandev-contrast-light.svg**
Version statique avec contraste renforcé pour fonds clairs.
- **Poids** : ~2.8 KB
- **Usage** : Fonds clairs uniquement (#FFFFFF, #F7F7F7, etc.)
- **Couleurs** : Or profond #8C6A18, Noir #0B0B0B, Vert #00FF45
- **Contraste** : WCAG 2.1 AAA (texte 16.2–18.2:1, graphiques 5.2–5.8:1)
- **Keyline** : Contour blanc rgba(255,255,255,.85)

**📊 Documentation complète** : Voir `LOGO_BANDEV_CONTRAST_INTEGRATION.md` et `LOGO_BANDEV_CONTRAST_REPORT.md` à la racine du projet.

---

## 🎨 Spécifications

### **Design**
- **"BAN"** : Encadré rectangle or (#D4AF37), stroke 3px, coins arrondis rx=4
- **"DEV"** : Texte blanc (#FFFFFF) avec soulignement vert Matrix (#00FF45)
- **Soulignement** : Trait 4px, linecap="round", décalé 6px sous la ligne de base

### **Technique**
- **ViewBox** : `0 0 240 64` (ratio 3.75:1)
- **Format** : SVG vectoriel
- **Poids** : ~2 KB minifié
- **Accessibilité** : `role="img"`, `<title>`, `<desc>`

---

## 🔧 Utilisation

### **Inline dans HTML**
```html
<img src="/images/logos/logo-bandev-optimized.svg" alt="BANDEV" />
```

### **Inline dans React/Next.js**
```jsx
import Image from "next/image";

<Image 
  src="/images/logos/logo-bandev-optimized.svg" 
  alt="BANDEV"
  width={240}
  height={64}
/>
```

### **SVG Inline (Recommandé pour header)**
Voir `LOGO_BANDEV_SNIPPETS.md` à la racine du projet.

---

## 📐 Tailles Recommandées

| Contexte | Hauteur | Largeur (auto) |
|----------|---------|----------------|
| Header Mobile | 24px | ~90px |
| Header Desktop | 28px | ~105px |
| Footer | 32px | ~120px |
| Hero Section | 48px | ~180px |

---

## 🎨 Palette de Couleurs

```css
--logo-gold: #D4AF37;      /* Or (cadre "BAN") */
--logo-white: #FFFFFF;     /* Blanc (texte "DEV") */
--logo-green: #00FF45;     /* Vert Matrix (soulignement) */
--logo-black: #0B0B0B;     /* Noir UI (variante inversée) */
```

---

## ♿ Accessibilité

Tous les fichiers SVG incluent :
- ✅ `role="img"` pour les lecteurs d'écran
- ✅ `<title>BANDEV</title>` pour le nom
- ✅ `<desc>"BAN" encadré or, "DEV" souligné vert</desc>` pour description
- ✅ Contrastes AA respectés

---

## 📚 Documentation

Pour plus d'informations, consulter à la racine du projet :
- `START_HERE_LOGO.md` (résumé rapide)
- `LOGO_BANDEV_SNIPPETS.md` (code prêt à copier)
- `INTEGRATION_LOGO_BANDEV.md` (exemples avancés)
- `INDEX_LOGO_BANDEV.md` (index complet)

---

**Créé avec ❤️ pour BANDEV**