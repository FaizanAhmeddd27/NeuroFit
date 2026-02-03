/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF4FF',
          100: '#D1E7FF',
          200: '#B3D9FF',
          300: '#84C5FF',
          400: '#5AAFFF',
          500: '#4A90E2',
          600: '#357ABD',
          700: '#2563EB',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        accent: {
          green: '#10B981',
          orange: '#F59E0B',
          red: '#EF4444',
          purple: '#8B5CF6',
          teal: '#14B8A6',
          pink: '#EC4899',
          indigo: '#6366F1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'custom-sm': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'custom': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'custom-md': '0 6px 12px rgba(0, 0, 0, 0.08)',
        'custom-lg': '0 10px 20px rgba(0, 0, 0, 0.1)',
        'custom-xl': '0 20px 40px rgba(0, 0, 0, 0.12)',
        'custom-2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}