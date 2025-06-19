/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  safelist: [
    '-translate-x-full',
    'translate-x-0',
    'transition-transform',
    'duration-300',
  ],
  theme: {
    extend: {
      colors: {
          mainGreen: "#66B512",
          secondaryGreen: "#4AC14D",
      },
      backgroundImage: {
        'login-bg': "url('/images/login_fundo.png')",
      }
    }
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};
