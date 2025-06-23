const Help = require("../models/helpModel");
const usersModel = require("../models/usersModel");
const subjectModel = require("../models/subjectModel");
const feedbacksContentModel = require("../models/feedbacksContentModel");

const { isAuthorized } = require("../utils/authUtils");
const { getUserId } = require("../utils/jwtUtils");
const { json } = require("body-parser");

async function generateArticleCache(article, type) {
  try {
    // Caminho para o arquivo JSON
    const fs = require("fs");
    const path = require("path");

    let jsonPath;
    if (article.length > 1) {
      jsonPath = path.join(
        __dirname,
        `../public/data/${type}_allArticles.json`
      );
    } else {
      jsonPath = path.join(
        __dirname,
        `../public/data/${article.id}_article.json`
      );
    }

    // Criar diretório se não existir
    const dir = path.dirname(jsonPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Salvar artigos em formato JSON
    fs.writeFileSync(jsonPath, JSON.stringify(article));

    return {
      success: true,
      message: "Cache de artigos gerado com sucesso",
      count: article.length,
    };
  } catch (error) {
    console.error("Erro ao gerar cache de artigos:", error);
    return {
      success: false,
      message: "Erro ao gerar cache de artigos",
      error: error.message,
    };
  }
}

async function getCachedArticle(id, type) {
  // Tentar carregar do arquivo JSON na pasta public
  try {
    const fs = require("fs");
    const path = require("path");
    let jsonPath;
    if (type === "help") {
      jsonPath = path.join(__dirname, "../public/data/help_allArticles.json");
    } else if (type === "subject") {
      jsonPath = path.join(__dirname, `../public/data/${id}_article.json`);
    } else if (type === "subject_all") {
      jsonPath = path.join(
        __dirname,  
        "../public/data/subject_allArticles.json"
      );
    }

    // Verificar se o arquivo existe
    if (fs.existsSync(jsonPath)) {
      // Ler o arquivo e converter para objeto JavaScript
      const rawData = fs.readFileSync(jsonPath, "utf8");
      console.log("Artigos carregados do cache local:", JSON.parse(rawData).length);
      return JSON.parse(rawData);
    } else {
      console.log("Arquivo de cache não encontrado:", jsonPath);
      return [];
    }
  } catch (cacheError) {
    console.error("Erro ao carregar cache de artigos:", cacheError);
    return [];
  }
}

exports.index = async (req, res) => {
  const token = req.cookies.token;
  let user = null;
  let allArticles = [];

  try {
    const auth = await isAuthorized(token, "PTD");

    if (auth === false) {
      return res.redirect("/");
    }

    const userId = await getUserId(token);
    user = await usersModel.getRole(userId);

    // Tente buscar os artigos
    allArticles = await subjectModel.getFirstArticleFromEachCategory();

    const cacheArticles = await generateArticleCache(allArticles, "help");
    console.log(cacheArticles.message);

    // Renderize a página com os dados obtidos
    return res.render("help", {
      user,
      allArticles,
      error: null,
    });
  } catch (err) {
    console.error("Erro na página de ajuda:", err);

    const isNetworkError =
      err.code === "ECONNREFUSED" ||
      err.name === "NetworkError" ||
      err.message.includes("network");


    // Dados de fallback para cenário offline
    if (!allArticles || allArticles.length === 0) {
      allArticles = await getCachedArticle(0, "help");
      console.log(allArticles)
    }

    // Renderize a página com uma mensagem de erro apropriada
    return res.render("help", {
      user: user || {},
      allArticles,
      error: {
        message: isNetworkError
          ? "Você parece estar offline. Alguns conteúdos podem não estar disponíveis."
          : "Ocorreu um erro ao carregar os artigos de ajuda.",
        isOffline: isNetworkError,
      },
    });
  }
};

// Busca um artigo específico por ID com suporte a modo offline
exports.getArticleById = async (req, res) => {
  const { category, id_content } = req.params;
  let user = null;
  let article = null;
  let allArticles = [];

  try {
    const token = req.cookies.token;
    const auth = await isAuthorized(token, "PTD");

    if (auth === false) {
      return res.redirect("/");
    }

    const userId = await getUserId(token);
    user = await usersModel.getRole(userId);

    if (!category || !id_content) {
      return res.status(400).send("Categoria ou ID do conteúdo não fornecidos");
    }

    const modulesModel = require("../models/modulesModel");

    // Buscar o artigo específico pelo ID
    article = await modulesModel.findModule(id_content);

    if (!article) {
      return res.status(404).send("Artigo não encontrado");
    }

    // Garantir que a categoria esteja definida no objeto do artigo
    if (!article.category) {
      article.category = category;
    }

    // Buscar todos os artigos para a navegação lateral
    allArticles = await subjectModel.getAllArticles();

    // Lógica dos feedbacks positivos e negativos
    const positiveFeedback = await feedbacksContentModel.getAllByModuleId(
      article.id,
      true
    );
    const negativeFeedback = await feedbacksContentModel.getAllByModuleId(
      article.id,
      false
    );

    article.positiveFeedback = positiveFeedback?.length || 0;
    article.negativeFeedback = negativeFeedback?.length || 0;

    article.last_update = article.last_update.toLocaleDateString('pt-BR') 

    const cacheArticles = await generateArticleCache(article, "subject");
    console.log(cacheArticles.message);
    const allCachedArticles = await generateArticleCache(
      allArticles,
      "subject"
    );
    console.log(allCachedArticles.message);

    return res.render("subject", {
      user,
      article,
      allArticles,
      currentArticle: article,
      error: null,
    });
  } catch (err) {
    console.error("Erro ao buscar artigo:", err);

    // Verificar se é um erro de rede (possível cenário offline)
    const isNetworkError =
      err.code === "ECONNREFUSED" ||
      err.name === "NetworkError" ||
      err.message.includes("network");


    // Dados de fallback para cenário offline
    if (!article) {
      article = await getCachedArticle(id_content, "subject");
      console.log(article)
    }
    if(!allArticles || allArticles.length === 0) {
      allArticles = await getCachedArticle(0, "subject_all");
    }

    // Tentar renderizar a página com os dados que conseguimos obter
    return res.render("subject", {
      user: user || {},
      article: article || {
        title: "Conteúdo indisponível",
        content: "Este conteúdo não está disponível no modo offline.",
        category: category || "não-categorizado",
        id: id_content,
      },
      allArticles: allArticles || [],
      currentArticle: article,
      error: {
        message: isNetworkError
          ? "Você está offline. Este conteúdo pode estar incompleto ou desatualizado."
          : "Ocorreu um erro ao carregar o artigo solicitado.",
        isOffline: isNetworkError,
      },
    });
  }
};
