const express = require('express');
const app = express();
const path = require('path');

// Configura EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Torna a pasta 'assets' pública
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Rota da home
app.get('/', (req, res) => {
  res.render('home');
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
