/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom colors for Bangla news site
      colors: {
        // Bangladesh flag inspired colors
        'bangladesh-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a', // Primary green
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        'bangladesh-red': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Custom colors for different news categories
        'news-politics': '#3b82f6',
        'news-sports': '#f59e0b',
        'news-tech': '#8b5cf6',
        'news-world': '#06b6d4',
        'news-business': '#10b981',
      },
      // Custom fonts for Bangla text
      fontFamily: {
        'bangla': ['SolaimanLipi', 'Kalpurush', 'Arial', 'sans-serif'],
        'english': ['Inter', 'Arial', 'sans-serif'],
      },
      // Custom spacing for better Bangla text layout
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      // Custom shadows for cards
      boxShadow: {
        'news-card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'news-card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      // Custom breakpoints for better responsive design
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      // Custom line heights for Bangla text
      lineHeight: {
        'bangla': '1.75',
        'bangla-tight': '1.5',
      },
      // Custom max widths
      maxWidth: {
        'prose-bangla': '75ch',
      },
    },
  },
  plugins: [
    // Add custom utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Bangla text utilities
        '.text-bangla': {
          fontFamily: theme('fontFamily.bangla'),
          lineHeight: theme('lineHeight.bangla'),
          textAlign: 'left',
        },
        '.text-english': {
          fontFamily: theme('fontFamily.english'),
        },
        // News category badges
        '.badge-politics': {
          backgroundColor: theme('colors.news-politics'),
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: '500',
        },
        '.badge-sports': {
          backgroundColor: theme('colors.news-sports'),
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: '500',
        },
        '.badge-tech': {
          backgroundColor: theme('colors.news-tech'),
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: '500',
        },
        '.badge-world': {
          backgroundColor: theme('colors.news-world'),
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: '500',
        },
        '.badge-business': {
          backgroundColor: theme('colors.news-business'),
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: '500',
        },
        // News card utilities
        '.news-card': {
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: theme('boxShadow.news-card'),
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
        },
        '.news-card:hover': {
          boxShadow: theme('boxShadow.news-card-hover'),
          transform: 'translateY(-2px)',
        },
        // Loading skeleton utilities
        '.skeleton': {
          backgroundColor: '#f3f4f6',
          backgroundImage: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
          backgroundSize: '200% 100%',
          animation: 'skeleton-loading 1.5s infinite',
        },
        // Responsive grid utilities for news layout
        '.news-grid': {
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(1, 1fr)',
          '@media (min-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media (min-width: 1024px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
        },
      }
      
      addUtilities(newUtilities)
    },
  ],
  // Dark mode configuration
  darkMode: 'class',
}
