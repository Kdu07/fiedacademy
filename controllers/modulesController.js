const modulesModel = require("../models/modulesModel");
const moduleModel = require("../models/modulesModel");

// Controlador da rota /
exports.index = async (req, res) => {
  const module = await moduleModel.findModule(req.params.id); // Busca o módulo pelo ID fornecido na rota
  const moduleContent = await moduleModel.findModuleContentByOrder(req.params.id_order, req.params.id); // Busca o conteúdo do módulo pela ordem da página e ID do módulo

  const modulePages = await moduleModel.findAllModuleContent(req.params.id); // Busca todas as páginas de conteúdo do módulo, ordenadas por número da página
  
  
  if (!module || !moduleContent) {
    return;
  }

  const pathId = req.params.id_path

  res.render("content", {
    moduleContent,
    module,
    modulePages,
    pathId
  });
};
