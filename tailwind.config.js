/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        // Hiérarchie typographique responsive avec clamp()
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
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.005em',
        wider: '0.01em',
        widest: '0.08em',
      },
      lineHeight: {
        'tight': '1.1',
        'snug': '1.2',
        'normal': '1.4',
        'relaxed': '1.6',
      },
    },
  },
};
