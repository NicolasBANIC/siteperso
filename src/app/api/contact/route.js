import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // TODO: Intégrer avec votre service email Hostinger
    // Pour l'instant, on simule un envoi réussi
    // Vous devrez configurer nodemailer ou un autre service avec vos credentials Hostinger
    
    console.log('Nouveau message de contact:', { name, email, message });

    // Exemple de configuration pour Hostinger (à compléter avec vos credentials)
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // ex: smtp.hostinger.com
      port: process.env.SMTP_PORT, // ex: 465
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // bcnicolaspro@gmail.com
        pass: process.env.SMTP_PASSWORD, // votre mot de passe d'application Gmail
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'bcnicolaspro@gmail.com', // Votre email professionnel
      replyTo: email, // Email du client pour répondre facilement
      subject: `[BANDEV] Nouveau message de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0047AB; border-bottom: 2px solid #00FF41; padding-bottom: 10px;">
            Nouveau message depuis BANDEV.fr
          </h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            SIRET: 841 375 652 00028 | BANDEV - Nicolas Banic
          </p>
        </div>
      `,
    });
    */

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}