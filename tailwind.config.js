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
        // Refonte BANDEV - Mapping avec nouveaux tokens harmonisés
        transparent: 'transparent',
        current: 'currentColor',

        // Tokens sémantiques principaux (Refonte #5D726F)
        background: 'var(--bg-site)',            // #5D726F - Fond principal selon spécifications
        foreground: 'var(--text-primary)',      // Texte principal optimal sur fond foncé
        muted: 'var(--surface-glass)',          // Surfaces glassmorphiques atténuées  
        'muted-foreground': 'var(--text-secondary)', // Texte secondaire lisible
        card: 'var(--surface-card)',            // Surface carte glassmorphique
        border: 'var(--border-subtle)',         // Bordures glassmorphiques

        // Glassmorphism tokens unifiés selon spécifications
        'card-start': 'var(--gradient-card-start)',    // Début dégradé léger
        'card-end': 'var(--gradient-card-end)',        // Fin dégradé léger
        'card-border': 'var(--stroke-glass)',          // Bordure semi-transparente
        'card-glass': 'var(--surface-glass)',          // Fond glassmorphism subtil
        'card-glass-hover': 'var(--surface-glass-hover)', // Hover glassmorphism

        // Primary (emerald) - COULEUR EXACTE DU LOGO BANDEV
        primary: {
          DEFAULT: 'var(--brand-emerald)',       // #10B981 - Vert émeraude exact logo BANDEV
          foreground: 'var(--anthracite-50)',   // Texte sur accent (contraste optimal)
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: 'var(--brand-emerald)',          // Base - couleur exacte du logo
          600: '#059669',                        // Hover
          700: '#047857',                        // Active
          800: '#065F46',
          900: '#064E3B'
        },

        // Anthracite scale - Gamme complète selon spécifications
        anthracite: {
          50: 'var(--anthracite-50)',
          100: 'var(--anthracite-100)',
          200: 'var(--anthracite-200)',
          300: 'var(--anthracite-300)',
          400: 'var(--anthracite-400)',
          500: 'var(--anthracite-500)',
          600: 'var(--anthracite-600)',
          700: 'var(--anthracite-700)',
          800: 'var(--anthracite-800)',
          900: 'var(--anthracite-900)'
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

        // Neutral scale harmonisée avec anthracite
        neutral: {
          50: 'var(--anthracite-50)',
          100: 'var(--anthracite-100)',
          200: 'var(--anthracite-200)',
          300: 'var(--anthracite-300)',
          400: 'var(--anthracite-400)',
          500: 'var(--anthracite-500)',
          600: 'var(--anthracite-600)',
          700: 'var(--anthracite-700)',
          800: 'var(--anthracite-800)',
          900: 'var(--anthracite-900)'
        },

        // Brand tokens harmonisés
        'brand-emerald': 'var(--brand-emerald)',  // Couleur exacte du logo BANDEV
        'bg-site': 'var(--bg-site)',             // Fond global #5D726F

        // Legacy compatibility (transitoire)
        emerald: 'var(--brand-emerald)',         // Utilise la couleur exacte du logo
        turquoise: '#06B6D4',
        teal: '#14B8A6',

        // Utility colors harmonisées
        ring: 'var(--color-ring)',
        error: '#DC2626',
      },
      fontSize: {
        // Échelle typographique harmonisée selon tokens
        'hero': 'var(--text-hero)',         // clamp(2.5rem, 5vw, 4rem)
        'display': 'var(--text-h1)',        // clamp(2rem, 4vw, 3rem)
        'heading-xl': 'var(--text-h2)',     // clamp(1.75rem, 3.5vw, 2.25rem)
        'heading-lg': 'var(--text-h3)',     // clamp(1.5rem, 3vw, 1.875rem)
        'heading-md': 'var(--text-h4)',     // clamp(1.25rem, 2.5vw, 1.5rem)
        'heading-sm': 'clamp(1.125rem, 2vw, 1.25rem)', // 18-20px
        'body-lg': 'clamp(1.125rem, 2vw, 1.25rem)', // 18-20px
        'body': 'var(--text-body)',         // clamp(1rem, 2vw, 1.125rem)
        'body-sm': 'var(--text-small)',     // clamp(0.875rem, 1.5vw, 1rem)
        'caption': 'clamp(0.75rem, 1.5vw, 0.875rem)', // 12-14px
        'ui': 'var(--text-small)',          // 14-16px
        'ui-sm': 'clamp(0.75rem, 1.5vw, 0.875rem)', // 12-14px
      },
      spacing: {
        // Espacements harmonisés selon spécifications
        'section': 'var(--spacing-section)',   // 24px
        'card': 'var(--spacing-card)',         // 20px
        'grid': 'var(--gap-grid)',             // 20px
        'gutter': '24px',
        '4': '0.25rem',
        '8': '0.5rem',
        '12': '0.75rem',
        '16': '1rem',
        '20': '1.25rem',  // 20px harmonisé
        '24': '1.5rem',
        '32': '2rem',
        '48': '3rem',
      },
      borderRadius: {
        // Radius harmonisés selon tokens
        'sm': '8px',
        'md': 'var(--radius-xl)',      // 16px
        'lg': 'var(--radius-2xl)',     // 20px
        'xl': 'var(--radius-3xl)',     // 24px
        '2xl': 'var(--radius-3xl)',    // 24px
        '3xl': '28px',
      },
      transitionDuration: {
        // Transitions harmonisées selon tokens
        'fast': '160ms',              // var(--transition-fast)
        'medium': '240ms',            // var(--transition-medium)
        'slow': '320ms',              // var(--transition-slow)
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      boxShadow: {
        // Shadows harmonisées selon spécifications
        'soft': 'var(--shadow-soft)',       // 0 8px 24px rgba(0,0,0,0.18)
        'medium': 'var(--shadow-medium)',   // 0 12px 32px rgba(0,0,0,0.22)
        'strong': 'var(--shadow-strong)',   // 0 16px 40px rgba(0,0,0,0.26)
        'emerald': 'var(--shadow-emerald)', // Ombre émeraude
        'focus': 'var(--focus-shadow)',     // Focus accessible
        // Legacy compatibility
        'matrix-sm': 'var(--shadow-soft)',
        'matrix-md': 'var(--shadow-medium)',
        'matrix-lg': 'var(--shadow-strong)',
        'matrix-ring': 'var(--focus-shadow)',
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
      backgroundImage: {
        // Dégradés harmonisés selon spécifications
        'card-gradient': 'linear-gradient(180deg, var(--gradient-card-start) 0%, var(--gradient-card-end) 100%)',
        'card-glass': 'var(--surface-glass)',
        'brand-gradient': 'linear-gradient(135deg, var(--brand-emerald), var(--color-secondary-500))',
      },
    },
  },
};

export default config;
