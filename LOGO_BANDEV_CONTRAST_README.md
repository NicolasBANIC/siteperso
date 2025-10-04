# 🎨 Logo BANDEV — Contraste Renforcé

## 📦 Livrables

### 3 Logos SVG
- ⭐ **logo-bandev-contrast-adaptive.svg** — Thème-aware (recommandé)
- 🌙 **logo-bandev-contrast-dark.svg** — Fonds sombres
- ☀️ **logo-bandev-contrast-light.svg** — Fonds clairs

**Localisation** : `/public/images/logos/`

---

## 📊 Contraste WCAG 2.1

| Élément | Dark Mode | Light Mode | Statut |
|---------|-----------|------------|--------|
| **Texte DEV** | 15.8–18.5:1 | 16.2–18.2:1 | ✅ AAA |
| **Cadre BAN** | 7.8–9.2:1 | 5.2–5.8:1 | ✅ AAA |
| **Soulignement** | 10.9–12.8:1 | Renforcé par keyline | ✅ AA |

---

## 🚀 Quick Start

### 1. Tester
```bash
start LOGO_BANDEV_CONTRAST_PREVIEW.html
```

### 2. Intégrer
```jsx
<Image 
  src="/images/logos/logo-bandev-contrast-adaptive.svg" 
  alt="BANDEV" 
  width={240} 
  height={64} 
/>
```

### 3. Ajouter CSS Variables
Voir `LOGO_BANDEV_CONTRAST_QUICKSTART.md`

---

## 📚 Documentation

| Fichier | Description |
|---------|-------------|
| **LOGO_BANDEV_CONTRAST_QUICKSTART.md** | ⚡ Démarrage rapide (2 min) |
| **LOGO_BANDEV_CONTRAST_INTEGRATION.md** | 📘 Guide d'intégration complet |
| **LOGO_BANDEV_CONTRAST_REPORT.md** | 📊 Rapport de contraste détaillé |
| **LOGO_BANDEV_CONTRAST_PREVIEW.html** | 🖼️ Aperçu visuel interactif |
| **LOGO_BANDEV_CONTRAST_LIVRAISON.md** | 📦 Récapitulatif de livraison |

---

## ✅ Validation

- [x] **Lisibilité parfaite** à 24px (mobile)
- [x] **Contraste WCAG AA/AAA** respecté
- [x] **Thème adaptatif** (dark/light)
- [x] **SVG vectoriel** propre
- [x] **Keyline (contour)** pour lisibilité renforcée
- [x] **Documentation complète**

---

## 🎯 Améliorations

### Contraste Renforcé
- ✅ **Or plus clair** en dark mode (#E5C461 vs #D4AF37)
- ✅ **Or plus profond** en light mode (#8C6A18 vs #D4AF37)
- ✅ **Keyline 1.25px** autour des lettres
- ✅ **Double trait** pour le soulignement
- ✅ **Cadre plus épais** en light mode (3.5px vs 3px)

### Technique
- ✅ **paint-order: stroke fill** (lisibilité sécurisée)
- ✅ **CSS variables** avec fallbacks
- ✅ **Media query** `prefers-color-scheme`
- ✅ **shape-rendering: geometricPrecision**

---

## 📐 Tailles Recommandées

| Contexte | Hauteur | Classe Tailwind |
|----------|---------|-----------------|
| Header Mobile | 24px | `h-6 w-auto` |
| Header Desktop | 28px | `h-7 w-auto` |
| Footer | 32px | `h-8 w-auto` |
| Hero Section | 48px | `h-12 w-auto` |

---

**Statut** : ✅ **Prêt pour intégration**
**Conformité** : WCAG 2.1 AA/AAA ✅
**Version** : 1.0.0

---

**Créé avec ❤️ pour BANDEV**