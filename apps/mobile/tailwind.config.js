// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('./css/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './packages/shared-ui/**/*.{js,jsx,ts,tsx}',
    './packages/shared-utils/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}', // This includes all files in the app directory
    './components/**/*.{js,jsx,ts,tsx}', // This includes all files in the components directory
    './hooks/**/*.{js,jsx,ts,tsx}', // This includes all files in the hooks directory (if used)
    './src/**/*.{js,jsx,ts,tsx}' // This includes all files in the src directory (if applicable)
  ],
  theme: {
    colors // Your custom theme colors from css/theme-colors.js
  },
  plugins: [
    require('tailwindcss'),
    require('nativewind/postcss') // NativeWind plugin for Tailwind compatibility
  ]
}
