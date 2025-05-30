const express = require('express');
const app = express();
const path = require('path');

const indexRoutes = require('./routes/index');
const pathsRoutes = require('./routes/paths');

// Configura EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Torna a pasta 'assets' pública
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Usa as rotas principais
app.use('/', indexRoutes);

// Usa as rotas de trilhas dinâmicas
app.use('/paths', pathsRoutes);

// Define a route to render the index.ejs file
app.get('/', (req, res) => {
    res.render('index', { message: 'Hello, World!' });
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
