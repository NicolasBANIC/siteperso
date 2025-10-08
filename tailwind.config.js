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
        // Premium Design - Couleurs profondes et accents vibrantes
        transparent: 'transparent',
        current: 'currentColor',

        // Brand colors - Premium deep tones
        brand: {
          navy: '#0B1220',    // Deep navy blue for sophisticated backgrounds
          emerald: '#0F3B33', // Deep emerald green for contrast
          teal: '#17C3B2',    // Vibrant teal for primary actions
          cyan: '#22D3EE',    // Electric cyan for highlights and focus
        },

        // Surface tokens for glassmorphism
        surface: {
          glass: 'rgba(255,255,255,0.06)',
          'glass-strong': 'rgba(255,255,255,0.1)',
          'glass-border': 'rgba(255,255,255,0.1)',
          'glass-border-strong': 'rgba(255,255,255,0.15)',
        },

        // Semantic tokens
        background: 'var(--bg-site)',            
        foreground: 'var(--text-primary)',      
        muted: 'var(--surface-glass)',          
        'muted-foreground': 'var(--text-secondary)',
        card: 'var(--surface-card)',            
        border: 'var(--border-subtle)',         

        // Primary (teal) for actions
        primary: {
          DEFAULT: '#17C3B2',
          foreground: '#0B1220',   
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#17C3B2',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63'
        },

        // Emerald for brand elements
        emerald: {
          DEFAULT: '#10B981',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
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

        // Brand tokens harmonisés - Couleur EXACTE du logo BANDEV
        'brand-emerald': '#10B981',              // Couleur exacte extraite du logo
        'bg-site': 'var(--bg-site)',             // Fond global #0D1D2C

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
        'sm': '4px',
        'md': '6px',                   // 6px pour rectangulaire avec coins doux
        'lg': '8px',                   // 8px
        'xl': '12px',                  // 12px
        '2xl': '16px',                 // 16px
        '3xl': '20px',                 // 20px
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
        // Premium gradient backgrounds
        'radial-premium': 'radial-gradient(circle at 30% 30%, #0B1220, #0F3B33)',
        'linear-premium': 'linear-gradient(to right, #0B1220, #0F3B33)',
        'card-gradient': 'linear-gradient(180deg, var(--gradient-card-start) 0%, var(--gradient-card-end) 100%)',
        'card-glass': 'var(--surface-glass)',
        'brand-gradient': 'linear-gradient(135deg, #10B981, #17C3B2)',
        'cta-gradient': 'linear-gradient(135deg, #10B981, #22D3EE)',
      },
    },
  },
};

export default config;
