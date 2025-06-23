const bookmarksModel = require("../models/bookmarksModel");
const modulesModel = require("../models/modulesModel");
const usersModel = require("../models/usersModel");
const feedbacksContentModel = require("../models/feedbacksContentModel");
const usersContentModel = require("../models/userContentModel");

const { isAuthorized } = require("../utils/authUtils");
const { getUserId } = require("../utils/jwtUtils");

// Controlador da rota /
exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "PTD");

  if (auth === false) {
    return res.redirect("/");
  }
  const pathId = req.params.id_path;
  const moduleId = req.params.id;

  const module = await modulesModel.findModuleById(req.params.id); // Busca o módulo pelo ID fornecido na rota
  const moduleContent = await modulesModel.findModuleContentByOrder(
    req.params.id_order,
    moduleId
  ); // Busca o conteúdo do módulo pela ordem da página e ID do módulo
  const modulePages = await modulesModel.findAllModuleContent(req.params.id); // Busca todas as páginas de conteúdo do módulo, ordenadas por número da página


  if (!module || !moduleContent) {
    return res.redirect("/home");
  }

  const id = await getUserId(token);
  const user = await usersModel.getById(id);

  // Logica para ver se o usuário deu um bookmark nesse módulo
  const bookmarked = await bookmarksModel.getByModuleId(id, moduleContent.id);
  moduleContent.bookmarked = false;
  if (bookmarked) {
    moduleContent.bookmarked = true;
  }

  // Logica dos feedbacks positivos e negativos
  const positiveFeedback = await feedbacksContentModel.getAllByModuleId(
    moduleContent.id,
    true
  );
  const negativeFeedback = await feedbacksContentModel.getAllByModuleId(
    moduleContent.id,
    false
  );

  moduleContent.positiveFeedback = 0;
  moduleContent.negativeFeedback = 0;

  if (positiveFeedback.length > 0) {
    moduleContent.positiveFeedback = positiveFeedback.length;
  }
  if (negativeFeedback.length > 0) {
    moduleContent.negativeFeedback = negativeFeedback.length;
  }

  // Faz com que as páginas do módulo tenham a propriedade 'done' que indica se o usuário já completou aquela página
  await Promise.all(
    modulePages.map(async (page) => {
      const userDoneContent = await usersContentModel.findByContentId(
        user.id,
        page.id
      );
      page.done = false;
      if (userDoneContent) {
        page.done = true;
      }
    })
  );

  // Verifica se o usuário já completou o conteúdo do módulo
  const userDoneContent = await usersContentModel.findByContentId(
    user.id,
    moduleContent.id
  );
  if (!userDoneContent) {
    // Se o usuário não completou, atualiza o progresso
    await usersContentModel.updateProgress(
      user.id,
      moduleContent.id,
      pathId,
      moduleId
    );
  }

  res.render("module", {
    moduleContent,
    modulesModel,
    module,
    modulePages,
    pathId,
    user,
  });
};

exports.updateFeedback = async (req, res) => {
  const { contentId, type, userId } = req.body;
  const url = req.headers.referer || "/";
  const feedback = await feedbacksContentModel.addFeedback(
    userId,
    contentId,
    type
  );

  return res.redirect(url);
};
