const express = require('express');
require('dotenv').config();

const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const subjectRoutes = require('./routes/subjectRoutes');
const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const helpRoutes = require('./routes/helpRoutes');
const loginRoutes = require('./routes/loginRoutes');
const pathRoutes = require('./routes/pathRoutes');
const aboutUsRoutes = require('./routes/aboutUs');
const dashboardRoutes = require('./routes/dashboardRoutes');
const moduleRoutes = require('./routes/modulesRoutes');
const profileRoutes = require('./routes/profileRoutes')

// Configura EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// Torna a pasta 'assets' pública
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static('public')); // <-- Define a pasta public como estática

// Usa as rotas principais
app.use('/', homeRoutes);
app.use('/', authRoutes);
app.use('/', helpRoutes);
app.use('/', pathRoutes);
app.use('/', loginRoutes);
app.use('/', modulesRoutes);
/* app.use('/', modulesRoutes); */
app.use('/', aboutUsRoutes);
app.use('/', subjectRoutes);

app.use('/', dashboardRoutes);
app.use('/', moduleRoutes)
app.use('/', profileRoutes);

//Usa as rotas de trilhas dinâmicas
//app.use('/paths', pathsRoutes);

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
