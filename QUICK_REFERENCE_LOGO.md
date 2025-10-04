# ⚡ Quick Reference — Logo BANDEV

## 🎯 Essentiel

**Logo** : "BAN" encadré or + "DEV" blanc souligné vert Matrix  
**Format** : SVG 2 KB, 24-28px responsive  
**Fichier** : `public/images/logos/logo-bandev-optimized.svg`  
**Intégré** : `src/components/Header.jsx` (ligne 50)  

---

## 📦 Fichiers

```
public/images/logos/
├── logo-bandev-optimized.svg  (recommandé)
├── logo-bandev-mono.svg       (monochrome)
└── logo-bandev-inverse.svg    (fond clair)
```

---

## 🔧 Code Minimal

### **HTML**
```html
<a href="/" class="brand">
  <svg viewBox="0 0 240 64" class="h-6 md:h-7">
    <!-- SVG complet dans LOGO_BANDEV_SNIPPETS.md -->
  </svg>
</a>
```

### **CSS**
```css
.brand { display: inline-block; line-height: 0; }
.brand svg { height: 24px; width: auto; }
@media (min-width: 768px) { .brand svg { height: 28px; } }
```

---

## 🎨 Couleurs

```css
--gold: #D4AF37;   /* Cadre "BAN" */
--white: #FFFFFF;  /* Texte "DEV" */
--green: #00FF45;  /* Soulignement */
```

---

## ✅ Corrections

- ✅ Box-sizing global
- ✅ Safe-area support
- ✅ Meta tags explicites
- ✅ ARIA complet
- ✅ -1 requête HTTP
- ✅ -60% poids logo

---

## 📚 Docs

- **Démarrer** : `START_HERE_LOGO.md`
- **Copier SVG** : `LOGO_BANDEV_SNIPPETS.md`
- **Voir logo** : `LOGO_BANDEV_PREVIEW.html`
- **Rapport** : `MISSION_ACCOMPLIE_LOGO_BANDEV.md`
- **Index** : `INDEX_LOGO_BANDEV.md`

---

## 🚀 Commandes

```bash
npm run dev              # Dev server
npm run build            # Production build
npx lighthouse URL       # Audit
```

**Serveur** : http://localhost:3008  
**Statut** : ✅ TERMINÉ