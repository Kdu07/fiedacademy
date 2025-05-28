const ModuleModel = require("../models/ModuleModel");

// Controlador da rota /
exports.index = async (req, res) => {
  const module = await ModuleModel.findModule(req.params.id);
  const moduleContent = await ModuleModel.findModuleContentByOrder(req.params.page_id, req.params.id);
  const modulePages = await ModuleModel.findAllModuleContent(req.params.id);

  if (!module || !moduleContent) {
    return;
  }

  res.render("pages/moduleContent", {
    moduleContent,
    module,
    modulePages
  });
};
