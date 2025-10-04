# 📧 Configuration Email - BANDEV

## Guide complet pour configurer l'envoi d'emails depuis le formulaire de contact

---

## 🎯 Objectif

Permettre aux visiteurs de **bandev.fr** d'envoyer des messages via le formulaire de contact, qui seront reçus sur **bcnicolaspro@gmail.com**.

---

## 📋 Informations importantes

- **Email de réception** : `bcnicolaspro@gmail.com`
- **SIRET** : 841 375 652 00028
- **Domaine** : bandev.fr
- **Nom de l'entreprise** : BANDEV

---

## ✅ Solution recommandée : Gmail SMTP

### Pourquoi Gmail ?

- ✅ **Fiabilité maximale** : 99.9% de délivrabilité
- ✅ **Gratuit** : Jusqu'à 500 emails/jour
- ✅ **Sécurisé** : Authentification 2FA + mots de passe d'application
- ✅ **Simple** : Configuration en 5 minutes
- ✅ **Support** : Documentation Google complète

---

## 🚀 Configuration Gmail (Recommandé)

### Étape 1 : Activer la validation en 2 étapes

1. Allez sur https://myaccount.google.com/security
2. Connectez-vous avec `bcnicolaspro@gmail.com`
3. Cherchez **"Validation en deux étapes"**
4. Cliquez sur **"Activer"**
5. Suivez les instructions (SMS ou application Google Authenticator)

### Étape 2 : Créer un mot de passe d'application

1. Retournez sur https://myaccount.google.com/security
2. Cherchez **"Mots de passe des applications"** (en bas de la page)
3. Cliquez dessus
4. Sélectionnez :
   - **Application** : Mail
   - **Appareil** : Autre (nom personnalisé)
5. Tapez : `BANDEV Website Contact Form`
6. Cliquez sur **"Générer"**
7. **COPIEZ LE MOT DE PASSE** (16 caractères, format : `xxxx xxxx xxxx xxxx`)
8. ⚠️ **IMPORTANT** : Vous ne pourrez plus le voir après !

### Étape 3 : Configurer les variables d'environnement

#### En local (développement)

Créez le fichier `.env.local` à la racine du projet :

```bash
cp .env.local.example .env.local
```

Éditez `.env.local` et remplissez :

```env
# Configuration Email Gmail (RECOMMANDÉ)
CONTACT_EMAIL=bcnicolaspro@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=bcnicolaspro@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx  # ← Collez le mot de passe d'application ici

# Informations de l'entreprise
COMPANY_NAME=BANDEV
COMPANY_SIRET=84137565200028
COMPANY_URL=https://bandev.fr
```

⚠️ **ATTENTION** : Ne commitez JAMAIS ce fichier sur Git ! Il est déjà dans `.gitignore`.

#### En production (Vercel)

1. Allez sur https://vercel.com/
2. Sélectionnez votre projet **"siteperso"**
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez **une par une** les variables suivantes :

| Name | Value |
|------|-------|
| `CONTACT_EMAIL` | `bcnicolaspro@gmail.com` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `bcnicolaspro@gmail.com` |
| `SMTP_PASSWORD` | `xxxx xxxx xxxx xxxx` (votre mot de passe d'application) |
| `COMPANY_NAME` | `BANDEV` |
| `COMPANY_SIRET` | `84137565200028` |
| `COMPANY_URL` | `https://bandev.fr` |

5. Cliquez sur **"Save"** pour chaque variable
6. Redéployez le projet (automatique ou manuel)

### Étape 4 : Installer Nodemailer

```bash
npm install nodemailer
```

### Étape 5 : Activer le code d'envoi d'email

Ouvrez `src/app/api/contact/route.js` et :

1. **Décommentez** tout le bloc entre `/*` et `*/` (lignes 32-69)
2. **Supprimez** ou commentez la ligne de simulation (ligne 29)

Le fichier devrait ressembler à ceci :

```javascript
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Validation basique
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Configuration Nodemailer avec Gmail
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Envoi de l'email
    await transporter.sendMail({
      from: `"${process.env.COMPANY_NAME} Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `[${process.env.COMPANY_NAME}] Nouveau message de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: linear-gradient(135deg, #0047AB 0%, #00FF41 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
              ${process.env.COMPANY_NAME}
            </h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">
              Nouveau message depuis le formulaire de contact
            </p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #0047AB; margin-top: 0; border-bottom: 2px solid #00FF41; padding-bottom: 10px;">
              📬 Détails du message
            </h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0; color: #666;">
                <strong style="color: #0047AB;">👤 Nom :</strong> ${name}
              </p>
              <p style="margin: 10px 0; color: #666;">
                <strong style="color: #0047AB;">📧 Email :</strong> 
                <a href="mailto:${email}" style="color: #00FF41; text-decoration: none;">${email}</a>
              </p>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #00FF41; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0; color: #0047AB; font-weight: bold;">💬 Message :</p>
              <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <a href="mailto:${email}?subject=Re: Votre message sur ${process.env.COMPANY_URL}" 
                 style="display: inline-block; background: linear-gradient(135deg, #0047AB 0%, #00FF41 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                ↩️ Répondre à ${name}
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px;">
            <p style="margin: 5px 0;">
              <strong>${process.env.COMPANY_NAME}</strong> - Développeur Web Freelance
            </p>
            <p style="margin: 5px 0;">
              SIRET : ${process.env.COMPANY_SIRET}
            </p>
            <p style="margin: 5px 0;">
              <a href="${process.env.COMPANY_URL}" style="color: #0047AB; text-decoration: none;">
                ${process.env.COMPANY_URL}
              </a>
            </p>
            <p style="margin: 15px 0 5px 0; color: #999; font-size: 11px;">
              Ce message a été envoyé depuis le formulaire de contact de ${process.env.COMPANY_URL}
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Message envoyé avec succès !' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}
```

### Étape 6 : Tester en local

```bash
# Démarrer le serveur de développement
npm run dev
```

1. Ouvrez http://localhost:3000
2. Scrollez jusqu'au formulaire de contact
3. Remplissez les champs :
   - **Nom** : Test BANDEV
   - **Email** : votre-email@example.com
   - **Message** : Test du formulaire de contact
4. Cliquez sur **"Envoyer le message"**
5. Vérifiez votre boîte mail `bcnicolaspro@gmail.com`

✅ **Succès** : Vous devriez recevoir un email avec le design BANDEV !

---

## 🔧 Alternative : Hostinger SMTP

Si vous préférez utiliser l'email de votre hébergeur Hostinger :

### Configuration Hostinger

```env
# Configuration Email Hostinger
CONTACT_EMAIL=contact@bandev.fr
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=contact@bandev.fr
SMTP_PASSWORD=votre_mot_de_passe_email

# Informations de l'entreprise
COMPANY_NAME=BANDEV
COMPANY_SIRET=84137565200028
COMPANY_URL=https://bandev.fr
```

### Avantages Hostinger

- ✅ Email professionnel : `contact@bandev.fr`
- ✅ Plusieurs adresses possibles
- ✅ Intégration avec le domaine

### Inconvénients Hostinger

- ⚠️ Peut être moins fiable que Gmail
- ⚠️ Risque de finir en spam
- ⚠️ Limites d'envoi plus strictes

---

## 🧪 Tests et vérifications

### Test 1 : Envoi basique

```bash
# Formulaire de contact
Nom: Test User
Email: test@example.com
Message: Ceci est un test
```

**Résultat attendu** : Email reçu dans les 30 secondes

### Test 2 : Validation des champs

```bash
# Champs vides
Nom: [vide]
Email: [vide]
Message: [vide]
```

**Résultat attendu** : Message d'erreur "Tous les champs sont requis"

### Test 3 : Email invalide

```bash
# Email mal formaté
Nom: Test User
Email: email-invalide
Message: Test
```

**Résultat attendu** : Message d'erreur "Email invalide"

### Test 4 : Réponse rapide

Depuis l'email reçu, cliquez sur le bouton **"Répondre à [Nom]"**

**Résultat attendu** : Votre client email s'ouvre avec l'adresse du visiteur pré-remplie

---

## 🐛 Dépannage

### Problème : "Erreur lors de l'envoi du message"

**Causes possibles** :

1. **Mot de passe d'application incorrect**
   - Vérifiez que vous avez copié le bon mot de passe
   - Recréez un nouveau mot de passe d'application

2. **Variables d'environnement manquantes**
   - Vérifiez que `.env.local` existe
   - Vérifiez que toutes les variables sont définies
   - Redémarrez le serveur : `npm run dev`

3. **Nodemailer non installé**
   ```bash
   npm install nodemailer
   ```

4. **Code encore commenté**
   - Vérifiez que le code dans `route.js` est décommenté

### Problème : Email non reçu

**Solutions** :

1. **Vérifiez les spams**
   - Allez dans le dossier "Spam" de Gmail
   - Marquez comme "Non spam" si trouvé

2. **Vérifiez les logs**
   ```bash
   # En local
   Regardez la console du terminal
   
   # En production (Vercel)
   Settings → Functions → Logs
   ```

3. **Testez avec un autre email**
   - Essayez d'envoyer vers une autre adresse
   - Vérifiez si le problème persiste

### Problème : "Invalid login" ou "Authentication failed"

**Solutions** :

1. **Vérifiez la validation en 2 étapes**
   - Elle doit être activée sur le compte Gmail

2. **Recréez le mot de passe d'application**
   - Supprimez l'ancien
   - Créez-en un nouveau
   - Mettez à jour `.env.local` et Vercel

3. **Vérifiez le compte Gmail**
   - Connectez-vous à Gmail pour vérifier qu'il n'y a pas d'alerte de sécurité

---

## 📊 Limites et quotas

### Gmail SMTP

- **Limite quotidienne** : 500 emails/jour
- **Limite par minute** : ~20 emails/minute
- **Taille max** : 25 MB par email
- **Pièces jointes** : Supportées

### Recommandations

Pour un site de portfolio, ces limites sont largement suffisantes. Si vous dépassez 500 messages/jour, considérez :

1. **SendGrid** (100 emails/jour gratuits, puis payant)
2. **Mailgun** (5000 emails/mois gratuits)
3. **Amazon SES** (62,000 emails/mois gratuits la première année)

---

## 🔒 Sécurité

### Bonnes pratiques

✅ **À FAIRE** :
- Utilisez des mots de passe d'application (jamais le mot de passe principal)
- Ne commitez JAMAIS `.env.local` sur Git
- Utilisez des variables d'environnement sur Vercel
- Activez la validation en 2 étapes sur Gmail
- Vérifiez régulièrement les logs d'envoi

❌ **À NE PAS FAIRE** :
- Ne partagez jamais vos credentials SMTP
- Ne stockez pas les mots de passe en clair dans le code
- Ne désactivez pas la validation en 2 étapes
- Ne donnez pas accès à votre compte Gmail à des tiers

### Protection contre le spam

Le formulaire inclut déjà :
- ✅ Validation des champs côté serveur
- ✅ Validation du format email
- ✅ Rate limiting (à implémenter si nécessaire)

Pour ajouter un captcha (optionnel) :
```bash
npm install @hcaptcha/react-hcaptcha
```

---

## 📈 Monitoring

### Suivre les emails envoyés

1. **Gmail** : Consultez "Messages envoyés"
2. **Vercel Logs** : Consultez les logs de la fonction API
3. **Google Analytics** : Suivez les soumissions du formulaire

### Métriques importantes

- Nombre de messages reçus/jour
- Taux de réponse
- Temps de réponse moyen
- Taux de spam (si applicable)

---

## 🎯 Prochaines étapes

Une fois l'email configuré :

1. ✅ Testez le formulaire en local
2. ✅ Déployez sur Vercel avec les variables d'environnement
3. ✅ Testez le formulaire en production
4. ✅ Configurez une réponse automatique (optionnel)
5. ✅ Ajoutez Google Analytics pour suivre les soumissions
6. ✅ Créez un template de réponse pour gagner du temps

---

## 📞 Support

### Documentation officielle

- **Nodemailer** : https://nodemailer.com/
- **Gmail SMTP** : https://support.google.com/mail/answer/7126229
- **Vercel Environment Variables** : https://vercel.com/docs/environment-variables

### Ressources BANDEV

- [README.md](./README.md) - Documentation complète
- [GUIDE_DEMARRAGE_RAPIDE.md](./GUIDE_DEMARRAGE_RAPIDE.md) - Démarrage rapide
- [REBRANDING_BANDEV.md](./REBRANDING_BANDEV.md) - Historique du rebranding

---

## ✅ Checklist de configuration

### Configuration Gmail
- [ ] Validation en 2 étapes activée
- [ ] Mot de passe d'application créé
- [ ] Mot de passe copié et sauvegardé

### Configuration locale
- [ ] `.env.local` créé
- [ ] Variables d'environnement remplies
- [ ] Nodemailer installé
- [ ] Code décommenté dans `route.js`
- [ ] Test en local réussi

### Configuration production
- [ ] Variables ajoutées sur Vercel
- [ ] Projet redéployé
- [ ] Test en production réussi
- [ ] Email reçu avec le bon design

### Vérifications finales
- [ ] Formulaire accessible sur bandev.fr
- [ ] Validation des champs fonctionne
- [ ] Emails reçus dans les 30 secondes
- [ ] Design de l'email correct
- [ ] Bouton "Répondre" fonctionne
- [ ] Pas d'erreurs dans les logs

---

**Configuration créée le** : 2025-01-XX  
**Version** : 1.0.0  
**SIRET** : 841 375 652 00028  

**Made with 💻 by BANDEV**