const Help = require('../models/helpModel');
const usersModel = require("../models/usersModel");
 
const { isAuthorized } = require("../utils/authUtils");
const { getUserId } = require("../utils/jwtUtils");

// Renderiza a página de ajuda com todos os artigos
exports.index = async (req, res) => {
const token = req.cookies.token;
  const auth = await isAuthorized(token, "PTD");

  if (auth === false) {
    return res.redirect("/");
  }

const userId = await getUserId(token);
  const user = await usersModel.getRole(userId);

  try {
    const articles = await Help.getAll();
    res.render('help', {
      titulo: 'Ajuda',
      mensagem: 'Aqui estão os artigos de ajuda',
      articles,
      user

    });
  } catch (err) {
    res.status(500).send('Erro ao buscar artigos de ajuda');
  }
};

// Cria um novo artigo de ajuda
exports.create = async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    const newArticle = new Help({ title, description, icon });
    await newArticle.save();
    res.redirect('/help');
  } catch (err) {
    res.status(500).send('Erro ao criar artigo de ajuda');
  }
};

// Busca um artigo específico por ID
exports.getById = async (req, res) => {
  try {
    const article = await Help.findById(req.params.id);
    if (!article) return res.status(404).send('Artigo não encontrado');
    res.render('helpDetail', { article });
  } catch (err) {
    res.status(500).send('Erro ao buscar artigo');
  }
};