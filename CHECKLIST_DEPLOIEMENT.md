# ✅ CHECKLIST DE DÉPLOIEMENT - BANDEV

## 🎯 Votre feuille de route pour mettre bandev.fr en ligne

---

## 📋 PHASE 1 : Configuration Email (15 min)

### Gmail - Mot de passe d'application

- [ ] Aller sur https://myaccount.google.com/security
- [ ] Se connecter avec `bcnicolaspro@gmail.com`
- [ ] Activer la **validation en 2 étapes** (si pas déjà fait)
- [ ] Chercher **"Mots de passe des applications"**
- [ ] Créer un mot de passe pour **"BANDEV Website"**
- [ ] **COPIER** le mot de passe (16 caractères)
- [ ] Le sauvegarder dans un endroit sûr

### Variables d'environnement locales

- [ ] Copier `.env.local.example` vers `.env.local`
- [ ] Remplir `SMTP_PASSWORD` avec le mot de passe d'application
- [ ] Vérifier que tous les autres champs sont corrects
- [ ] Sauvegarder le fichier

### Installation et activation

- [ ] Exécuter : `npm install nodemailer`
- [ ] Ouvrir `src/app/api/contact/route.js`
- [ ] Décommenter le bloc de code email (lignes 32-69)
- [ ] Commenter la ligne de simulation (ligne 29)
- [ ] Sauvegarder le fichier

### Test local

- [ ] Exécuter : `npm run dev`
- [ ] Ouvrir http://localhost:3000
- [ ] Remplir le formulaire de contact
- [ ] Envoyer un message de test
- [ ] Vérifier la réception sur `bcnicolaspro@gmail.com`
- [ ] ✅ **Email reçu avec le bon design BANDEV**

---

## 🌐 PHASE 2 : Achat du domaine (10 min)

### Choisir un registrar

- [ ] Option A : OVH (https://www.ovh.com/fr/)
- [ ] Option B : Gandi (https://www.gandi.net/fr)
- [ ] Option C : Hostinger (https://www.hostinger.fr/)

### Acheter bandev.fr

- [ ] Rechercher **"bandev.fr"**
- [ ] Vérifier la disponibilité
- [ ] Ajouter au panier
- [ ] Activer la **protection WHOIS** (recommandé)
- [ ] Créer un compte ou se connecter
- [ ] Finaliser l'achat
- [ ] Noter les identifiants de connexion

### Informations à noter

```
Registrar choisi : ___________________
Login : ___________________
Email de confirmation : ___________________
Date d'achat : ___________________
Date d'expiration : ___________________
```

---

## 🚀 PHASE 3 : Déploiement Vercel (15 min)

### Créer un compte Vercel

- [ ] Aller sur https://vercel.com/signup
- [ ] Se connecter avec **GitHub**
- [ ] Autoriser Vercel à accéder aux repos

### Importer le projet

- [ ] Cliquer sur **"Add New..."** → **"Project"**
- [ ] Sélectionner le repo **"siteperso"**
- [ ] Cliquer sur **"Import"**

### Configurer les variables d'environnement

**⚠️ IMPORTANT : À faire AVANT de déployer !**

- [ ] Dans **"Environment Variables"**, ajouter :

```
CONTACT_EMAIL = bcnicolaspro@gmail.com
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 465
SMTP_USER = bcnicolaspro@gmail.com
SMTP_PASSWORD = [votre_mot_de_passe_application]
COMPANY_NAME = BANDEV
COMPANY_SIRET = 84137565200028
COMPANY_URL = https://bandev.fr
```

- [ ] Vérifier que toutes les variables sont ajoutées
- [ ] Cliquer sur **"Deploy"**

### Attendre le déploiement

- [ ] ⏳ Attendre 2-3 minutes
- [ ] ✅ Déploiement réussi
- [ ] Noter l'URL temporaire : `https://siteperso-xxx.vercel.app`
- [ ] Tester cette URL

---

## 🔗 PHASE 4 : Connexion du domaine (15 min)

### Dans Vercel

- [ ] Aller dans le projet
- [ ] **Settings** → **Domains**
- [ ] Ajouter **"bandev.fr"**
- [ ] Noter les enregistrements DNS fournis :

```
Type A :
Nom : @
Valeur : ___________________

Type CNAME :
Nom : www
Valeur : ___________________
```

### Dans votre registrar (OVH/Gandi/Hostinger)

#### Si OVH :
- [ ] **Web Cloud** → **Noms de domaine** → **bandev.fr**
- [ ] Onglet **"Zone DNS"**
- [ ] Ajouter les enregistrements Vercel
- [ ] Sauvegarder

#### Si Gandi :
- [ ] **Domaines** → **bandev.fr**
- [ ] Onglet **"Enregistrements DNS"**
- [ ] Ajouter les enregistrements Vercel
- [ ] Sauvegarder

#### Si Hostinger :
- [ ] **Domaines** → **bandev.fr**
- [ ] **DNS / Serveurs de noms**
- [ ] Ajouter les enregistrements Vercel
- [ ] Sauvegarder

### Vérifier la propagation DNS

- [ ] Aller sur https://dnschecker.org/#A/bandev.fr
- [ ] Vérifier que les DNS se propagent
- [ ] ⏳ Attendre (10 min à 48h max)
- [ ] ✅ DNS propagés partout

---

## 🧪 PHASE 5 : Tests finaux (15 min)

### Test desktop

- [ ] Ouvrir https://bandev.fr
- [ ] Vérifier l'affichage de la page d'accueil
- [ ] Tester la navigation (Services, Portfolio, Contact)
- [ ] Vérifier les animations (Matrix Rain, compteurs, etc.)
- [ ] Tester le formulaire de contact
- [ ] Vérifier la réception de l'email

### Test mobile

- [ ] Ouvrir bandev.fr sur smartphone
- [ ] Vérifier le responsive design
- [ ] Tester le menu mobile (hamburger)
- [ ] Vérifier les animations
- [ ] Tester le formulaire de contact
- [ ] Vérifier que tout est lisible

### Test tablette

- [ ] Ouvrir bandev.fr sur tablette
- [ ] Vérifier l'affichage
- [ ] Tester la navigation
- [ ] Vérifier les animations

### Test navigateurs

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 📊 PHASE 6 : SEO & Analytics (20 min)

### Google Search Console

- [ ] Aller sur https://search.google.com/search-console
- [ ] Cliquer sur **"Ajouter une propriété"**
- [ ] Entrer `https://bandev.fr`
- [ ] Choisir la méthode de vérification (DNS ou balise HTML)
- [ ] Vérifier la propriété
- [ ] ✅ Propriété vérifiée
- [ ] Aller dans **Sitemaps**
- [ ] Ajouter `https://bandev.fr/sitemap.xml`
- [ ] Soumettre le sitemap
- [ ] ✅ Sitemap soumis

### Google Analytics 4

- [ ] Aller sur https://analytics.google.com/
- [ ] Créer un compte **"BANDEV"**
- [ ] Créer une propriété **"bandev.fr"**
- [ ] Copier l'ID de mesure : `G-XXXXXXXXXX`
- [ ] Noter l'ID : ___________________

### Ajouter Analytics au site

- [ ] Ouvrir `src/app/layout.jsx`
- [ ] Ajouter le code Google Analytics dans le `<head>`
- [ ] Remplacer `G-XXXXXXXXXX` par votre ID
- [ ] Sauvegarder
- [ ] Commiter : `git add . && git commit -m "🔍 Ajout Google Analytics"`
- [ ] Pousser : `git push origin main`
- [ ] Attendre le redéploiement automatique Vercel
- [ ] Vérifier que le tracking fonctionne

---

## 🎯 PHASE 7 : Performance (10 min)

### Lighthouse

- [ ] Aller sur https://pagespeed.web.dev/
- [ ] Entrer `https://bandev.fr`
- [ ] Lancer l'analyse
- [ ] Noter les scores :

```
Performance : _____ / 100 (objectif : 95+)
Accessibility : _____ / 100 (objectif : 100)
Best Practices : _____ / 100 (objectif : 100)
SEO : _____ / 100 (objectif : 100)
```

- [ ] Si scores < objectifs, consulter les recommandations
- [ ] Optimiser si nécessaire

---

## 🎉 PHASE 8 : Célébration !

### Vérifications finales

- [ ] ✅ Site accessible sur https://bandev.fr
- [ ] ✅ HTTPS actif (cadenas vert)
- [ ] ✅ Formulaire de contact fonctionnel
- [ ] ✅ Emails reçus sur bcnicolaspro@gmail.com
- [ ] ✅ Design parfait sur tous les devices
- [ ] ✅ Animations fluides
- [ ] ✅ Google Search Console configuré
- [ ] ✅ Google Analytics actif
- [ ] ✅ Lighthouse scores > 95

### Partager votre réussite

- [ ] Partager sur LinkedIn
- [ ] Partager sur Twitter/X
- [ ] Envoyer à vos contacts
- [ ] Mettre à jour votre CV
- [ ] Mettre à jour vos profils freelance

### Prochaines étapes

- [ ] Ajouter vos vrais projets au portfolio
- [ ] Demander des témoignages clients
- [ ] Créer une page Google My Business
- [ ] Publier un premier article de blog
- [ ] Optimiser pour le référencement local

---

## 📞 En cas de problème

### Formulaire ne fonctionne pas
→ Consulter **CONFIGURATION_EMAIL.md**

### Domaine ne fonctionne pas
→ Vérifier DNS sur dnschecker.org
→ Attendre la propagation (jusqu'à 48h)

### Erreur de build Vercel
→ Consulter les logs Vercel
→ Tester `npm run build` en local

### Autre problème
→ Consulter **README.md** section Troubleshooting
→ Consulter **GUIDE_DEMARRAGE_RAPIDE.md**

---

## 📚 Documentation disponible

- **README.md** - Documentation complète
- **GUIDE_DEMARRAGE_RAPIDE.md** - Guide en 5 minutes
- **CONFIGURATION_EMAIL.md** - Configuration email détaillée
- **REBRANDING_BANDEV.md** - Historique du rebranding
- **RECAP_FINAL_BANDEV.md** - Vue d'ensemble complète
- **CHECKLIST_DEPLOIEMENT.md** - Ce fichier

---

## ⏱️ Temps total estimé : 1h30

- Phase 1 (Email) : 15 min
- Phase 2 (Domaine) : 10 min
- Phase 3 (Vercel) : 15 min
- Phase 4 (DNS) : 15 min
- Phase 5 (Tests) : 15 min
- Phase 6 (SEO) : 20 min
- Phase 7 (Performance) : 10 min

---

## 🎯 Votre objectif

**Cocher toutes les cases et avoir bandev.fr en ligne !**

---

**Bon courage ! Vous allez y arriver ! 💪**

---

**BANDEV** - Transformez vos idées en expériences digitales exceptionnelles  
**SIRET** : 841 375 652 00028  
**Email** : bcnicolaspro@gmail.com  
**GitHub** : https://github.com/NicolasBANIC/siteperso

---

**Made with 💻 by BANDEV**