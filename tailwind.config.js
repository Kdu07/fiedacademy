/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  safelist: [
    '-translate-x-full',
    'translate-x-0',
    'transition-transform',
    'duration-300',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ],
  theme: {
    extend: {
      colors: {
          mainGreen: "#66B512",
          secondaryGreen: "#4AC14D",
      },
      backgroundImage: {
        'login-bg': "url('/images/login_fundo.jpg')",
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
