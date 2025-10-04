# 🟢 Logo < BAN.DEV > Matrix Premium

## Description

Logo **< BAN.DEV >** avec effet Matrix immersif et premium :
- **Texte** : "< BAN.DEV >" avec chevrons gauche et droit
- **Chevrons** : Parfaitement symétriques et équidistants (< et >)
- **Couleur de base** : Vert Matrix foncé profond (#0B3D0B → #145214 → #0A2F0A)
- **Effet Matrix** : Pluie de code en vert clair lumineux (#00FF55 → #33FF77)
- **Animation** : Flux de code traversant chaque lettre et chevron
- **Lisibilité** : Texte parfaitement lisible malgré l'animation

## Fichiers

- `logo.svg` - Logo principal avec effet Matrix premium
- `logo-preview.html` - Page de prévisualisation interactive
- `logo-preview-dark.html` - Prévisualisation sur fond sombre
- `README.md` - Ce fichier

## Utilisation

### HTML / JSX
```jsx
<img 
  src="/brand/logo.svg" 
  alt="BAN.DEV" 
  className="h-11 w-auto md:h-[52px]"
/>
```

### Dans le Header (Next.js)
```jsx
<Link
  href="/"
  className="brand flex items-center transition-opacity duration-200 hover:opacity-90"
  aria-label="Accueil BAN.DEV"
>
  <img
    src="/brand/logo.svg"
    alt="BAN.DEV"
    width="280"
    height="80"
    className="h-11 w-auto md:h-[52px]"
    style={{ display: 'block' }}
  />
</Link>
```

## Tailles Recommandées

- **Mobile** : `h-11` (44px)
- **Desktop** : `h-[52px]` (52px)
- **Header** : `h-11 md:h-[52px]`
- **Footer** : `h-8` (32px)
- **Hero** : `h-16` ou `h-20` (64px ou 80px)

## Couleurs

### Vert Matrix Foncé (Texte et Chevrons)
- `#0B3D0B` - Début du dégradé (vert très foncé)
- `#145214` - Milieu du dégradé (vert foncé)
- `#0A2F0A` - Fin du dégradé (vert profond)

### Vert Matrix Clair (Flux de code)
- `#00FF55` - Vert néon lumineux
- `#33FF77` - Vert clair brillant

## Effet Matrix

### Lignes de code animées
- **Lignes horizontales** : Défilement de gauche à droite (3.2s à 4.2s)
- **Lignes verticales** : Défilement de haut en bas (4.8s à 5.8s)
- **Opacité** : Pulsation subtile (0.9 → 0.2 → 0.9)
- **Stroke-dasharray** : Effet de lignes pointillées
- **Clip-path** : Masque pour chaque lettre et chevron

### Caractéristiques de l'effet
- ✅ Flux continu et immersif
- ✅ Vert clair lumineux contrastant avec le vert foncé
- ✅ Rappelle la "pluie de code" Matrix
- ✅ Lignes fines traversant les lettres
- ✅ Texte reste parfaitement lisible
- ✅ Subtil mais bien visible

## Animations

- **Lignes horizontales** : 3.2s à 4.2s (durées variées pour effet naturel)
- **Lignes verticales** : 4.8s à 5.8s (durées variées)
- **Pulsation opacité** : Synchronisée avec le mouvement
- **Effet de lueur** : Gaussian Blur (2.5px)

## Spécifications Techniques

- **Format** : SVG vectoriel
- **Dimensions** : 480×100px (viewBox)
- **Fond** : Transparent
- **Police** : Montserrat Black (900)
- **Taille texte** : 56px
- **Letter-spacing** : 2px
- **Espacement chevrons** : Uniforme et symétrique
- **Poids fichier** : ~12KB
- **Animations** : CSS natives (GPU-accelerated)

## Compatibilité

- ✅ Chrome/Edge (toutes versions récentes)
- ✅ Firefox (toutes versions récentes)
- ✅ Safari (toutes versions récentes)
- ✅ Mobile (iOS/Android)
- ✅ Tous navigateurs modernes

## Performance

- **Taille** : ~12KB (ultra-léger)
- **Format** : SVG vectoriel (scalable sans perte)
- **Animations** : CSS natives (GPU-accelerated, 60fps)
- **Pas de JavaScript** : Aucune dépendance
- **Chargement** : Instantané

## Accessibilité

- ✅ Alt text obligatoire : "BAN.DEV"
- ✅ Contraste WCAG AAA (vert foncé sur fond clair/sombre)
- ✅ Support `prefers-reduced-motion` (animations désactivables)
- ✅ Lisibilité parfaite malgré l'animation
- ✅ Chevrons symétriques et équilibrés

## Structure du Logo

```
< BAN.DEV >
│ │   │   │ │
│ │   │   │ └─ Chevron droit (>)
│ │   │   └─── Texte "DEV"
│ │   └─────── Point central (.)
│ └─────────── Texte "BAN"
└───────────── Chevron gauche (<)
```

### Espacement
- Chevron gauche `<` : 0.35em du texte
- Texte `BAN` : Letter-spacing 2px
- Point `.` : Centré, rayon 7px
- Texte `DEV` : Letter-spacing 2px
- Chevron droit `>` : 0.35em du texte

## Prévisualisation

Ouvrez `logo-preview.html` dans votre navigateur pour voir :
- ✅ Le logo sur différents fonds (sombre, clair, coloré, Matrix)
- ✅ Différentes tailles (32px à 100px)
- ✅ Palette de couleurs complète
- ✅ Spécifications techniques détaillées
- ✅ Effet Matrix en action

## Notes Importantes

1. **Une seule version** : Ce logo est la version unique et officielle
2. **Chevrons obligatoires** : Toujours afficher `< BAN.DEV >`
3. **Symétrie parfaite** : Chevrons équidistants du texte
4. **Effet Matrix** : Toujours actif, immersif et lisible
5. **Responsive** : S'adapte à tous les écrans
6. **Pas de modifications** : Utiliser tel quel pour garantir la cohérence

## Intégration

Le logo est déjà intégré dans :
- ✅ Header (`src/components/Header.jsx`)
- ✅ Toutes les pages du site
- ✅ Version mobile et desktop

## Support

Pour toute question ou modification, contactez l'équipe de développement.

---

**Version** : 3.0 - Matrix Premium Edition  
**Date** : 2024  
**Licence** : Propriétaire BAN.DEV  
**Statut** : ✅ Production Ready