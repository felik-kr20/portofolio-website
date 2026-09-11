import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      colors: {
        bg: {
          primary:   'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          card:      'var(--color-bg-card)',
          elevated:  'var(--color-bg-elevated)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          light:   'var(--color-accent-light)',
          glow:    'var(--color-accent-glow)',
        },
        'text-primary':   'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted':     'var(--color-text-muted)',
        border: {
          DEFAULT: 'var(--color-border)',
          accent:  'var(--color-border-accent)',
        },
      },
    },
  },
  plugins: [],
}

export default config
