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
        background: '#0A192F',
        surface: '#10253E',
        foreground: '#F5F7FA',
        muted: '#A0AEC0',
        accent: '#0D99FF',
        accentSecondary: '#10B981',
        accentTertiary: '#9333EA',
        error: '#E53E3E',
        // Compatibilité avec les variables CSS existantes
        'accent-secondary': 'var(--color-accent-secondary, #10B981)',
        'accent-matrix': 'var(--color-accent-matrix, #00FFBC)',
        border: 'var(--color-border)',
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
        'md': '6px',
        'lg': '12px',
        'xl': '1.5rem',
        '2xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'elevation': '0 4px 20px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
    },
  },
};
