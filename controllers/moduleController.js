const moduleModel = require("../models/moduleModel");

// Controlador da rota /
exports.index = async (req, res) => {
  const module = await moduleModel.findModule(req.params.id);
  const moduleContent = await moduleModel.findModuleContentByOrder(req.params.page_id, req.params.id);
  const modulePages = await moduleModel.findAllModuleContent(req.params.id);

  if (!module || !moduleContent) {
    return;
  }

  res.render("pages/moduleContent", {
    moduleContent,
    module,
    modulePages
  });
};
