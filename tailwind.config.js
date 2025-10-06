/** @type {import('tailwindcss').Config} */
export default {
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
        // Système de couleurs harmonisé émeraude → turquoise selon spécifications
        emerald: '#10B981',
        turquoise: '#06B6D4', 
        teal: '#14B8A6',
        'blue-accent': '#3B82F6',
        'neutral-dark': '#0F172A',
        'neutral-light': '#F1F5F9',
        
        // Compatibilité legacy
        emeraldDeep: '#10B981', 
        matrixDark: '#0F172A',
        ink: '#0F172A',
        paper: '#FFFFFF',
        
        // Charte Matrix modernisée
        anthracite: '#0F172A',
        white: '#FFFFFF',
        matrix: '#10B981',
        matrix2: '#06B6D4',
        
        // Palette principale harmonisée
        background: '#F1F5F9',
        surface: '#FFFFFF',
        surfaceHover: '#F8FAFC',
        foreground: '#0F172A',
        muted: '#64748B',
        border: 'rgba(16, 185, 129, 0.15)',
        borderHover: 'rgba(16, 185, 129, 0.3)',
        
        // Accents émeraude → turquoise
        accent: '#10B981',
        accentHover: '#06B6D4',
        accentSecondary: '#14B8A6',
        accentTertiary: '#3B82F6',
        accentMatrix: '#10B981',
        accentMatrixHover: '#06B6D4',
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
}
