const Help = require("../models/helpModel");
const usersModel = require("../models/usersModel");
const subjectModel = require("../models/subjectModel");
const modulesModel = require("../models/modulesModel");
const feedbacksContentModel = require("../models/feedbacksContentModel");

const { isAuthorized } = require("../utils/authUtils");
const { getUserId } = require("../utils/jwtUtils");
const { all } = require("../routes/helpRoutes");

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
    const allArticles = await subjectModel.getFirstArticleFromEachCategory();

    res.render("help", {
      user,
      allArticles,
    });
  } catch (err) {
    res.status(500).send("Erro ao buscar artigos de ajuda " + err.message);
  }
};

// Cria um novo artigo de ajuda
exports.create = async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    const newArticle = new Help({ title, description, icon });
    await newArticle.save();
    res.redirect("/help");
  } catch (err) {
    res.status(500).send("Erro ao criar artigo de ajuda");
  }
};

// Busca um artigo específico por ID
exports.getArticleById = async (req, res) => {
  const { category, id_content } = req.params;

  try {
    const token = req.cookies.token;
    const auth = await isAuthorized(token, "PTD");

    if (auth === false) {
      return res.redirect("/");
    }

    const userId = await getUserId(token);
    const user = await usersModel.getRole(userId);

    if (!category || !id_content) {
      return res.status(400).send("Categoria ou ID do conteúdo não fornecidos");
    }

    // First try to get the article from the specific ID
    const article = await modulesModel.findModule(id_content);

    if (!article) {
      return res.status(404).send("Artigo não encontrado");
    }

    // Make sure category is set on the article object
    if (!article.category) {
      article.category = category;
    }

    // Get all articles for the sidebar navigation
    const allArticles = await subjectModel.getAllArticles();

    // Logica dos feedbacks positivos e negativos
    const positiveFeedback = await feedbacksContentModel.getAllByModuleId(
      article.id,
      true
    );
    const negativeFeedback = await feedbacksContentModel.getAllByModuleId(
      article.id,
      false
    );

    article.positiveFeedback = 0;
    article.negativeFeedback = 0;

    if (positiveFeedback.length > 0) {
      article.positiveFeedback = positiveFeedback.length;
    }
    if (negativeFeedback.length > 0) {
      article.negativeFeedback = negativeFeedback.length;
    }

    

    res.render("subject", {
      user,
      article,
      allArticles,
      currentArticle: article, // For highlighting the current article in the sidebar
    });
  } catch (err) {
    console.error("Error in getArticleByCategory:", err);
    res.status(500).send("Erro ao buscar artigo: " + err.message);
  }
};
