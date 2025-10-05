/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-fira-code)', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        // Charte Matrix : Anthracite, Blanc, Vert Matrix
        anthracite: 'var(--color-anthracite)',
        white: 'var(--color-white)',
        matrix: 'var(--color-matrix)',
        matrix2: 'var(--color-matrix-2)',
        
        // Palette étendue
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        surfaceHover: 'var(--color-surface-hover)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        borderHover: 'var(--color-border-hover)',
        accent: 'var(--color-accent)',
        accentHover: 'var(--color-accent-hover)',
        accentSecondary: 'var(--color-accent-secondary)',
        accentTertiary: 'var(--color-accent-tertiary)',
        accentMatrix: 'var(--color-accent-matrix)',
        accentMatrixHover: 'var(--color-accent-matrix-hover)',
        ring: 'var(--color-ring)',

        error: 'var(--color-error)',
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
        'section': '100px',
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
        '2xl': 'var(--radius-xl)',
      },
      transitionDuration: {
        'fast': '200ms',
      },
      boxShadow: {
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
