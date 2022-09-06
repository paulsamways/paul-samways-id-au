/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../Site/PaulSamways/**/*.{cshtml,html}",
    "../Scripts/src/**/*.{ts,js}"
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
