/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../Site/PaulSamways/**/*.{cshtml,html}"
  ],
  theme: {
    extend: {},
    fontFamily: {
      mono: ['Share Tech Mono', 'monospace'],
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
