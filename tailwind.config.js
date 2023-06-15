/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
// warn - The `purge`/`content` options have changed in Tailwind CSS v3.0.
// warn - Update your configuration file to eliminate this warning.
// warn - https://tailwindcss.com/docs/upgrade-guide#configure-content-sources
//
// warn - The `content` option in your Tailwind CSS configuration is missing or empty.
// warn - Configure your content sources or your generated CSS will be missing styles.
// warn - https://tailwindcss.com/docs/content-configuration
//
// warn - The `darkMode` option in your Tailwind CSS configuration is set to `false`, which now behaves the same as `media`.
// warn - Change `darkMode` to `media` or remove it entirely.
// warn - https://tailwindcss.com/docs/upgrade-guide#remove-dark-mode-configuration
