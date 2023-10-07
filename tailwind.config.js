/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: { preflight: false },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./docs/**/*.md", "docusaurus.config.js"],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {},
  },
}