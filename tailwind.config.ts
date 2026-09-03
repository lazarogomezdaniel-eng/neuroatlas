import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          lowest: '#090e1c',   // Fondo base ultra oscuro
          DEFAULT: '#0e1322',  // Superficie canónica
          low: '#161b2b',      // Fondos de tarjetas
          container: '#1c2236',// Paneles / sidebars
          high: '#252b42',     // Hover / cards destacadas
          bright: '#343949',   // Bordes sutiles y divisores
        },
        primary: {
          DEFAULT: '#22d3ee',  // Electric Cyan biológico
          hover: '#06b6d4',
          glow: 'rgba(34, 211, 238, 0.15)',
        },
        secondary: {
          DEFAULT: '#8b5cf6',  // Vibrant Violet sináptico
          hover: '#7c3aed',
          glow: 'rgba(139, 92, 246, 0.15)',
        },
        evidence: {
          gradeA: '#10b981',   // Emerald Green (Meta-análisis)
          gradeB: '#22d3ee',   // Electric Cyan (RCT)
          gradeC: '#f59e0b',   // Amber Gold (Observacional)
          risk: '#ef4444',     // Crimson Red (Contraindicado/Riesgo)
        },
        text: {
          primary: '#f8fafc',
          secondary: '#94a3b8',
          muted: '#64748b',
          code: '#38bdf8',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 20px -5px rgba(34, 211, 238, 0.25)',
        'violet-glow': '0 0 20px -5px rgba(139, 92, 246, 0.25)',
        'emerald-glow': '0 0 20px -5px rgba(16, 185, 129, 0.25)',
      },
      borderRadius: {
        'biotech': '8px',
        'capsule': '9999px',
      }
    },
  },
  plugins: [],
};

export default config;
