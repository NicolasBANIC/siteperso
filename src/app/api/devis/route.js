import { NextResponse } from 'next/server';

const requiredFields = ['name', 'email', 'projectType', 'budget', 'message'];

export async function POST(request) {
  try {
    const payload = await request.json();

    for (const field of requiredFields) {
      if (!payload?.[field] || typeof payload[field] !== 'string' || payload[field].trim() === '') {
        return NextResponse.json(
          { ok: false, error: `Le champ ${field} est requis.` },
          { status: 400 }
        );
      }
    }

    if (!/.+@.+\..+/.test(payload.email)) {
      return NextResponse.json({ ok: false, error: 'Adresse email invalide.' }, { status: 400 });
    }

    await new Promise((resolve) => setTimeout(resolve, 400));

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Erreur serveur.' }, { status: 500 });
  }
}
