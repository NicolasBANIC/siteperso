# 📧 Configuration du Formulaire de Contact

Ce document explique comment configurer le formulaire de contact pour envoyer des emails.

---

## ✅ Fonctionnalités Actuelles

Le formulaire de contact inclut déjà :

### 🛡️ Sécurité Anti-Spam
- **Honeypot** : Champ invisible `website` qui piège les bots
- **Rate Limiting** : Maximum 3 requêtes par minute par IP
- **Validation stricte** : Tous les champs sont validés côté client et serveur

### 📝 Champs du Formulaire
- **Nom complet** (obligatoire, 2-100 caractères)
- **Email** (obligatoire, format validé)
- **Sujet** (obligatoire, 3-200 caractères)
- **Budget estimé** (optionnel, liste déroulante)
- **Message** (obligatoire, 10-5000 caractères)

### ♿ Accessibilité
- Labels associés aux champs
- Messages d'erreur avec `aria-live`
- Support du clavier complet
- Indicateurs visuels clairs

---

## 🚀 Activation de l'Envoi d'Emails

### Étape 1 : Installer Nodemailer

```bash
npm install nodemailer
```

### Étape 2 : Configurer les Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

#### Option A : Gmail (Recommandé pour le développement)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-application
SMTP_FROM_NAME=Nicolas Banic
CONTACT_EMAIL=bcnicolaspro@gmail.com
```

**⚠️ Important pour Gmail :**
1. Activez la validation en 2 étapes sur votre compte Google
2. Générez un "mot de passe d'application" :
   - Allez dans [Paramètres Google](https://myaccount.google.com/security)
   - Sécurité → Validation en 2 étapes → Mots de passe d'application
   - Créez un mot de passe pour "Mail"
   - Utilisez ce mot de passe dans `SMTP_PASSWORD`

#### Option B : Hostinger (Recommandé pour la production)

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=bonjour@nicolasbanic.dev
SMTP_PASSWORD=votre-mot-de-passe-email
SMTP_FROM_NAME=Nicolas Banic
CONTACT_EMAIL=bonjour@nicolasbanic.dev
```

### Étape 3 : Activer le Code d'Envoi

Dans `src/app/api/contact/route.js`, décommentez le bloc de code entre les lignes 113-215 :

```javascript
// Supprimez les /* et */ autour du code nodemailer
```

### Étape 4 : Tester

1. Redémarrez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Allez sur `/contact`

3. Remplissez le formulaire et envoyez

4. Vérifiez votre boîte email

---

## 🧪 Test du Honeypot

Pour tester que le honeypot fonctionne :

1. Ouvrez la console du navigateur (F12)
2. Remplissez le formulaire normalement
3. Dans la console, tapez :
   ```javascript
   document.getElementById('website').value = 'bot-test';
   ```
4. Soumettez le formulaire
5. Le message devrait afficher "succès" mais rien ne sera envoyé
6. Dans la console serveur, vous verrez : `Bot detected via honeypot`

---

## 🔒 Sécurité en Production

### Rate Limiting Avancé

Pour la production, remplacez le rate limiting en mémoire par Redis :

```bash
npm install ioredis
```

```javascript
// src/app/api/contact/route.js
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

async function checkRateLimit(ip) {
  const key = `rate-limit:${ip}`;
  const requests = await redis.incr(key);
  
  if (requests === 1) {
    await redis.expire(key, 60); // 1 minute
  }
  
  return requests <= 3;
}
```

### Variables d'Environnement en Production

Sur Vercel/Netlify, ajoutez les variables dans le dashboard :
- Settings → Environment Variables
- Ajoutez toutes les variables `SMTP_*` et `CONTACT_EMAIL`

---

## 📊 Monitoring

### Logs

Les messages de contact sont loggés dans la console avec :
- Nom, email, sujet
- Budget (si spécifié)
- IP de l'expéditeur
- Timestamp

### Détection de Bots

Les tentatives de spam via honeypot sont loggées :
```
Bot detected via honeypot from IP: xxx.xxx.xxx.xxx
```

---

## 🎨 Personnalisation de l'Email

L'email HTML envoyé utilise :
- **Gradient d'en-tête** : Teal (#00C49A) → Blue (#0084C8)
- **Design moderne** : Cards avec bordures colorées
- **Responsive** : S'adapte aux clients email
- **Informations complètes** : Nom, email, sujet, budget, message

Pour personnaliser, modifiez le template HTML dans `route.js` (lignes 127-192).

---

## 🐛 Dépannage

### Erreur : "Trop de requêtes"
- Attendez 1 minute entre les tests
- Le rate limiting est de 3 requêtes/minute

### Email non reçu (Gmail)
- Vérifiez le dossier Spam
- Vérifiez que le mot de passe d'application est correct
- Vérifiez que la validation en 2 étapes est activée

### Email non reçu (Hostinger)
- Vérifiez les credentials dans le panneau Hostinger
- Utilisez le port 465 (SSL) ou 587 (TLS)
- Vérifiez que l'email expéditeur existe sur votre domaine

### Erreur de connexion SMTP
- Vérifiez que les variables d'environnement sont bien définies
- Redémarrez le serveur après modification du `.env.local`
- Vérifiez les logs serveur pour plus de détails

---

## 📝 TODO Futur

- [ ] Ajouter un CAPTCHA (reCAPTCHA v3) pour une protection supplémentaire
- [ ] Implémenter un système de notification (Slack, Discord)
- [ ] Ajouter une confirmation email automatique au client
- [ ] Créer un dashboard admin pour voir les messages
- [ ] Intégrer avec un CRM (HubSpot, Pipedrive)

---

**Dernière mise à jour :** Phase 4 - Contact Form Enhancement
**Statut :** ✅ Prêt pour la production (après configuration SMTP)