# 🚀 BANDEV - Portfolio Développeur Web Freelance

> **Transformez vos idées en expériences digitales exceptionnelles**

Site portfolio moderne et ultra-performant construit avec les dernières technologies web.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-FF0055?style=for-the-badge&logo=framer)

---

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Déploiement](#-déploiement)
- [Structure du projet](#-structure-du-projet)
- [Performance](#-performance)
- [Contact](#-contact)

---

## 🎯 À propos

**BANDEV** est le portfolio professionnel de Nicolas Banic, développeur web freelance spécialisé dans la création de sites web modernes, performants et sur mesure.

### Informations légales
- **Entreprise** : BANDEV
- **SIRET** : 841 375 652 00028
- **Email** : bcnicolaspro@gmail.com
- **Site web** : https://bandev.fr

---

## ✨ Fonctionnalités

### 🎨 Design & UX
- ✅ Design moderne avec glassmorphism et animations fluides
- ✅ Effet Matrix Rain en arrière-plan
- ✅ Particules interactives animées
- ✅ Vidéo de fond optimisée
- ✅ Dark mode avec toggle
- ✅ Responsive design (mobile, tablette, desktop)
- ✅ Barre de progression de scroll

### 🚀 Performance
- ✅ Score Lighthouse > 95
- ✅ Optimisation des images (WebP, AVIF)
- ✅ Lazy loading des composants
- ✅ Animations GPU-accelerated
- ✅ Bundle optimisé (167 KB first load)

### 📧 Formulaire de contact
- ✅ Validation en temps réel
- ✅ Feedback visuel immédiat
- ✅ Intégration email (Gmail/Hostinger)
- ✅ Design glassmorphism premium

### 🎭 Animations
- ✅ Compteurs animés pour les statistiques
- ✅ Slider de témoignages avec drag
- ✅ Badges technologiques interactifs
- ✅ Apparitions au scroll (Intersection Observer)
- ✅ Micro-animations au hover

### 📱 SEO & Accessibilité
- ✅ Métadonnées Open Graph optimisées
- ✅ Schema.org JSON-LD
- ✅ ARIA labels et sémantique HTML
- ✅ Support `prefers-reduced-motion`

---

## 🛠 Technologies

### Core
- **Next.js 15.5.4** - Framework React avec App Router
- **React 19.1.0** - Bibliothèque UI
- **TypeScript** - Typage statique (optionnel)

### Styling
- **Tailwind CSS 4.1.14** - Framework CSS utility-first
- **Framer Motion 12.23** - Animations avancées

### Outils
- **Lucide React** - Icônes modernes
- **React Hook Form** - Gestion de formulaires
- **React Intersection Observer** - Détection de scroll
- **Axios** - Requêtes HTTP

### Email
- **Nodemailer** - Envoi d'emails (à installer)

---

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/NicolasBANIC/siteperso.git
cd siteperso
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.local.example .env.local
# Éditez .env.local avec vos vraies valeurs
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

5. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

---

## ⚙️ Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Email professionnel
CONTACT_EMAIL=bcnicolaspro@gmail.com

# Configuration SMTP Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=bcnicolaspro@gmail.com
SMTP_PASSWORD=votre_mot_de_passe_application

# Informations entreprise
COMPANY_NAME=BANDEV
COMPANY_SIRET=84137565200028
COMPANY_URL=https://bandev.fr
```

### 2. Configuration Gmail

Pour utiliser Gmail avec Nodemailer :

1. Allez sur https://myaccount.google.com/security
2. Activez la **validation en 2 étapes**
3. Allez dans **"Mots de passe des applications"**
4. Générez un nouveau mot de passe pour "Mail"
5. Utilisez ce mot de passe dans `SMTP_PASSWORD`

### 3. Activer l'envoi d'emails

```bash
# Installer Nodemailer
npm install nodemailer

# Décommenter le code dans src/app/api/contact/route.js
```

### 4. Ajouter votre vidéo

Placez votre vidéo de fond dans :
```
public/videos/videolibreCoding.mp4
```

---

## 🚀 Déploiement

### Vercel (Recommandé)

1. **Installer Vercel CLI**
```bash
npm install -g vercel
```

2. **Déployer**
```bash
vercel
```

3. **Configurer les variables d'environnement**
- Allez dans votre projet sur vercel.com
- Settings > Environment Variables
- Ajoutez toutes les variables de `.env.local`

### Netlify

1. **Build le projet**
```bash
npm run build
```

2. **Déployer sur Netlify**
- Connectez votre repository GitHub
- Build command: `npm run build`
- Publish directory: `.next`

---

## 📁 Structure du projet

```
siteperso/
├── public/
│   ├── images/
│   │   ├── logoNB.png
│   │   ├── og-image.jpg
│   │   └── logos/
│   └── videos/
│       └── videolibreCoding.mp4
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.js
│   │   ├── apropos/
│   │   ├── contact/
│   │   ├── portfolio/
│   │   ├── processus/
│   │   ├── services/
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   └── page.jsx
│   └── components/
│       ├── AnimatedCounter.jsx
│       ├── BackToTop.jsx
│       ├── Footer.jsx
│       ├── Header.jsx
│       ├── HeroContactForm.jsx
│       ├── MatrixRain.jsx
│       ├── ParticlesBackground.jsx
│       ├── ScrollProgress.jsx
│       ├── TechBadge.jsx
│       ├── TestimonialSlider.jsx
│       └── ThemeToggle.jsx
├── .env.local.example
├── next.config.js
├── package.json
├── tailwind.config.js
└── README.md
```

---

## ⚡ Performance

### Scores Lighthouse (Objectifs)
- **Performance** : 95+
- **Accessibility** : 100
- **Best Practices** : 100
- **SEO** : 100

### Optimisations appliquées
- ✅ Images optimisées (WebP, AVIF)
- ✅ Lazy loading des composants lourds
- ✅ Code splitting automatique (Next.js)
- ✅ Compression gzip/brotli
- ✅ Fonts optimisées (Poppins avec display: swap)
- ✅ Animations GPU-accelerated
- ✅ Prefetching des liens

---

## 📚 Documentation

- [REFONTE_MODERNE_COMPLETE.md](./REFONTE_MODERNE_COMPLETE.md) - Documentation complète du projet
- [CONFIGURATION_EMAIL.md](./CONFIGURATION_EMAIL.md) - Guide configuration email
- [QUICK_START.md](./QUICK_START.md) - Guide de démarrage rapide

---

## 🐛 Résolution de problèmes

### Le formulaire ne fonctionne pas
1. Vérifiez que `.env.local` est configuré
2. Installez nodemailer : `npm install nodemailer`
3. Décommentez le code dans `src/app/api/contact/route.js`

### La vidéo ne s'affiche pas
1. Vérifiez que le fichier existe : `public/videos/videolibreCoding.mp4`
2. Vérifiez le format (MP4 H.264)
3. Compressez la vidéo si elle est trop lourde

### Erreurs de build
```bash
# Nettoyer le cache
rm -rf .next node_modules
npm install
npm run build
```

---

## 📞 Contact

**Nicolas Banic** - Développeur Web Freelance

- 📧 Email : [bcnicolaspro@gmail.com](mailto:bcnicolaspro@gmail.com)
- 🌐 Site web : [bandev.fr](https://bandev.fr)
- 💼 LinkedIn : [linkedin.com/in/nicolasbanic](https://linkedin.com/in/nicolasbanic)
- 🐙 GitHub : [github.com/NicolasBANIC](https://github.com/NicolasBANIC)

---

## 📄 Licence

© 2025 BANDEV - Nicolas Banic. Tous droits réservés.

**SIRET** : 841 375 652 00028

---

## 🙏 Remerciements

Construit avec ❤️ et les meilleures technologies web modernes.

- Next.js Team
- Vercel
- Tailwind Labs
- Framer Motion
- React Community

---

**Made with 💻 by BANDEV**
