/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        'rose-blush': '#F9EEF0',
        'dusty-rose': '#D4748C',
        'deep-plum': '#6B2D4E',
        'warm-ivory': '#FDF8F5',
        'soft-gold': '#C9A96E',
        'charcoal': '#2C2C2C',
        'light-gray': '#F5F5F5',
        'mid-gray': '#9E9E9E',
        'border-gray': '#E8E8E8',
        // Extended shades
        plum: {
          50: '#fdf4f8',
          100: '#fce8f3',
          200: '#f9d0e8',
          300: '#f4a8d2',
          400: '#ec72b3',
          500: '#df4898',
          600: '#c92878',
          700: '#a81c62',
          800: '#8b1a52',
          900: '#6B2D4E',
          950: '#3d0a27',
        },
        rose: {
          blush: '#F9EEF0',
          dusty: '#D4748C',
          light: '#FADADD',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        ui: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'heading-xl': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-lg': ['2rem', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-md': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        'screen-2xl': '1536px',
      },
      boxShadow: {
        'card': '0 2px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.12)',
        'navbar': '0 2px 16px rgba(0,0,0,0.08)',
        'modal': '0 25px 60px rgba(0,0,0,0.15)',
        'soft': '0 1px 8px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.35s ease-out',
        'slide-in-left': 'slideInLeft 0.35s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
      aspectRatio: {
        'product': '3 / 4',
        'banner': '16 / 7',
        'square': '1 / 1',
      },
      backgroundImage: {
        'gradient-rose': 'linear-gradient(135deg, #F9EEF0 0%, #FDF8F5 100%)',
        'gradient-plum': 'linear-gradient(135deg, #6B2D4E 0%, #a81c62 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9A96E 0%, #e8c87e 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
      },
    },
  },
  plugins: [],
} satisfies Config
