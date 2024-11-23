/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // see https://github.com/tailwindlabs/tailwindcss-typography/blob/main/src/styles.js
      typography: {
        DEFAULT: {
          css: [
            {
              'code::before': { content: '' },
              'code::after': { content: '' },
              'blockquote p:first-of-type::before': { content: '' },
              'blockquote p:last-of-type::after': { content: '' },
              img: { width: 'unset' }
            }
          ]
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
