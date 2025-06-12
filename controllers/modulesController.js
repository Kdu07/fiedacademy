const modulesModel = require("../models/modulesModel");
const usersModel = require("../models/usersModel");
const { isAuthorized } = require("../utils/authUtils");
const { getUserId } = require("../utils/jwtUtils");

// Controlador da rota /
exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "PTD");

  if (auth === false) {
    return res.redirect("/");
  }

  const module = await modulesModel.findModule(req.params.id); // Busca o módulo pelo ID fornecido na rota
  const moduleContent = await modulesModel.findModuleContentByOrder(
    req.params.id_order,
    req.params.id
  ); // Busca o conteúdo do módulo pela ordem da página e ID do módulo

  const modulePages = await modulesModel.findAllModuleContent(req.params.id); // Busca todas as páginas de conteúdo do módulo, ordenadas por número da página

  if (!module || !moduleContent) {
    return;
  }

  const pathId = req.params.id_path;

  const id = await getUserId(token);
  const user = await usersModel.getById(id);

  
  res.render("module", {
    moduleContent,
    modulesModel,
    module,
    modulePages,
    pathId,
    user
  });
};
