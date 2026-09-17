/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          lowest: '#040814',   // Fondo base inmersivo ultra-profundo
          DEFAULT: '#0a0f1d',  // Superficie base
          low: '#101628',      // Fondos de tarjetas
          container: '#161e36',// Paneles / sidebars
          high: '#1f2949',     // Hover / cards destacadas
          bright: '#2e3a5f',   // Bordes sutiles y divisores
        },
        primary: {
          DEFAULT: '#00f2fe',  // Electric Cyan bioluminiscente
          hover: '#06b6d4',
          glow: 'rgba(0, 242, 254, 0.2)',
        },
        secondary: {
          DEFAULT: '#9d4edd',  // Deep Synaptic Violet
          hover: '#7b2cbf',
          glow: 'rgba(157, 78, 221, 0.2)',
        },
        evidence: {
          gradeA: '#10b981',   // Emerald Green (Meta-análisis)
          gradeB: '#00f2fe',   // Electric Cyan (RCT)
          gradeC: '#f59e0b',   // Amber Gold (Observacional)
          risk: '#f43f5e',     // Rose / Crimson Red (Contraindicado/Riesgo)
        },
        text: {
          primary: '#ffffff',
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
        'cyan-glow': '0 0 25px -5px rgba(0, 242, 254, 0.35)',
        'violet-glow': '0 0 25px -5px rgba(157, 78, 221, 0.35)',
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'ambient': '0 20px 50px -15px rgba(0, 0, 0, 0.7)',
      },
      borderRadius: {
        'biotech': '12px',
        'capsule': '9999px',
      }
    },
  },
  plugins: [],
};
