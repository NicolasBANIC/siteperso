# 🚀 Commandes utiles - Matrix Rain

## 🏃 Démarrage rapide

### Lancer le serveur de développement
```powershell
cd C:\Users\Banic\Documents\siteperso
npm run dev
```

**URL** : http://localhost:3001

---

## 🛠️ Commandes de développement

### Installer les dépendances
```powershell
npm install
```

### Lancer en mode développement
```powershell
npm run dev
```

### Build de production
```powershell
npm run build
```

### Démarrer en mode production
```powershell
npm start
```

### Linter le code
```powershell
npm run lint
```

### Formater le code
```powershell
npm run format
```

---

## 🎨 Personnalisation du Matrix Rain

### Modifier l'opacité
**Fichier** : `src/components/MatrixRain.jsx`

```jsx
// Ligne 88
className="absolute inset-0 opacity-[0.08]"
//                              ↑
//                         Changer cette valeur
//                         0.05 = plus subtil
//                         0.10 = plus visible
```

### Modifier la couleur
**Fichier** : `src/components/MatrixRain.jsx`

```jsx
// Ligne 53
ctx.fillStyle = '#00FF41'; // Vert Matrix
//               ↑
//          Changer cette couleur
//          #00FF41 = vert Matrix
//          #0D99FF = bleu
//          #10B981 = vert émeraude
```

### Modifier la vitesse
**Fichier** : `src/components/MatrixRain.jsx`

```jsx
// Ligne 74
animationInterval = setInterval(draw, 50);
//                                    ↑
//                              Changer cette valeur
//                              33 = 30 FPS (plus rapide)
//                              50 = 20 FPS (actuel)
//                              100 = 10 FPS (plus lent)
```

---

## 🎨 Personnalisation des couleurs

### Modifier les couleurs globales
**Fichier** : `src/app/globals.css`

```css
:root {
  /* Fond principal */
  --color-background: #FFFFFF;  /* Blanc */
  
  /* Texte principal */
  --color-foreground: #0A192F;  /* Bleu foncé */
  
  /* Accent Matrix (vert) */
  --color-accent-matrix: #00FF41;  /* Vert Matrix */
  
  /* Accent principal (bleu) */
  --color-accent: #0D99FF;  /* Bleu */
}
```

---

## 🔧 Dépannage

### Le serveur ne démarre pas
```powershell
# Arrêter tous les processus Node.js
Get-Process -Name "node" | Stop-Process -Force

# Relancer le serveur
npm run dev
```

### Port 3000 déjà utilisé
Le serveur utilisera automatiquement le port 3001 ou suivant.

### Erreur de build
```powershell
# Nettoyer le cache
Remove-Item -Recurse -Force .next

# Réinstaller les dépendances
Remove-Item -Recurse -Force node_modules
npm install

# Relancer le build
npm run build
```

---

## 📚 Documentation

- **Guide rapide** : `LISEZ_MOI_MATRIX_RAIN.md`
- **Documentation complète** : `REFONTE_MATRIX_RAIN_COMPLETE.md`
- **Guide visuel** : `TRANSFORMATION_MATRIX_RAIN.txt`
- **Résumé** : `RESUME_TRANSFORMATION.txt`

---

## 🌐 URLs

- **Local** : http://localhost:3001
- **Network** : http://192.168.1.2:3001

---

## 📝 Notes

- Le Matrix Rain est en arrière-plan fixe (z-index: 0)
- L'opacité actuelle est de 8% pour visibilité optimale sur fond blanc
- L'animation tourne à 20 FPS pour économiser les ressources
- Le système de thème (dark/light) a été complètement supprimé