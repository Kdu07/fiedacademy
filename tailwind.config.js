/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
          mainGreen: "#66B512"
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
