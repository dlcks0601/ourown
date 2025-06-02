/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        DEFAULT: {
          light: '#000000',
          dark: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Pretendard'],
        thin: ['Pretendard-Thin'],
        extralight: ['Pretendard-ExtraLight'],
        light: ['Pretendard-Light'],
        normal: ['Pretendard-Regular'],
        medium: ['Pretendard-Medium'],
        semibold: ['Pretendard-SemiBold'],
        bold: ['Pretendard-Bold'],
        extrabold: ['Pretendard-ExtraBold'],
        black: ['Pretendard-Black'],
        mono: ['SpaceMono'],
        logo: ['ITC Avant Garde Gothic LT Extra Light'],
      },
    },
  },
  plugins: [],
};
