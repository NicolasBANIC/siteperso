/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'var(--font-space-grotesk)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-fira-code)', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        // ÉTAPE 5 : Mapping Tailwind avec nouvelles variables CSS sémantiques
        transparent: 'transparent',
        current: 'currentColor',

        // Tokens sémantiques principaux (ÉTAPE 2 implémentée)
        background: 'var(--background)',         // #C5C6C6 - Fond principal requis
        foreground: 'var(--foreground)',         // #111827 - Texte principal
        muted: 'var(--muted)',                   // #D3D5D5 - Surfaces atténuées  
        'muted-foreground': 'var(--muted-foreground)', // #334155 - Texte secondaire
        card: 'var(--card)',                     // #DCDDDE - Surface carte
        border: 'var(--border)',                 // #94A3B8 - Bordures

        // Primary (emerald) - COULEUR DE MARQUE PRÉSERVÉE
        primary: {
          DEFAULT: 'var(--primary)',             // #10B981 - Vert émeraude exact
          foreground: 'var(--primary-foreground)', // #0A0F0F - Texte sur accent
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',                        // Base conservée
          600: '#059669',                        // Hover (légèrement plus sombre)
          700: '#047857',                        // Active
          800: '#065F46',
          900: '#064E3B'
        },

        secondary: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63'
        },

        accent: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#172554'
        },

        // Neutral scale harmonisée avec nouveau fond
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1F2937',
          900: '#0F172A'
        },

        // Legacy compatibility
        emerald: '#10B981',                      // Préservé pour compatibilité
        turquoise: '#06B6D4',
        teal: '#14B8A6',

        // Utility colors
        ring: 'rgba(16, 185, 129, 0.35)',
        error: '#DC2626',
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 5vw, 4rem)', // 40-64px
        'display': 'clamp(2rem, 4.5vw, 3rem)', // 32-48px
        'heading-xl': 'clamp(1.75rem, 4vw, 2.5rem)', // 28-40px
        'heading-lg': 'clamp(1.5rem, 3vw, 2rem)', // 24-32px
        'heading-md': 'clamp(1.25rem, 2.5vw, 1.5rem)', // 20-24px
        'heading-sm': 'clamp(1.125rem, 2vw, 1.25rem)', // 18-20px
        'body-lg': 'clamp(1.125rem, 2vw, 1.25rem)', // 18-20px
        'body': 'clamp(1rem, 2vw, 1.125rem)', // 16-18px
        'body-sm': 'clamp(0.875rem, 1.5vw, 1rem)', // 14-16px
        'caption': 'clamp(0.75rem, 1.5vw, 0.875rem)', // 12-14px
        'ui': 'clamp(0.875rem, 2vw, 1rem)', // 14-16px
        'ui-sm': 'clamp(0.75rem, 1.5vw, 0.875rem)', // 12-14px
      },
      spacing: {
        'section': '60px',
        'gutter': '24px',
        '4': '0.25rem',
        '8': '0.5rem',
        '12': '0.75rem',
        '16': '1rem',
        '24': '1.5rem',
        '32': '2rem',
        '48': '3rem',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        'xl2': '16px',
        '2xl': 'var(--radius-xl)',
      },
      transitionDuration: {
        'fast': '200ms',
      },
      boxShadow: {
        'elev': '0 10px 30px rgba(0,0,0,0.1)',
        'matrix-sm': 'var(--shadow-sm)',
        'matrix-md': 'var(--shadow-md)',
        'matrix-lg': 'var(--shadow-lg)',
        'matrix-ring': 'var(--shadow-ring)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
      },
    },
  },
};

export default config;
