const pathModel = require("../models/pathsModel");
const { isAuthorized } = require("../utils/authUtils");

exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "PTD");

  if (auth === false) {
    return res.redirect("/");
  }
  /*
  try {
    const pathId = req.params.id; // Supondo rota /trilhas/:id
    const path = await pathsModel.getPathWithModule(pathId);
    res.render('pages/paths', { path });
  } catch (err) {
    res.status(500).send('Erro ao carregar a trilha');
  }
  */

  const currentPath = req.params.id;
  const paths = await pathModel.getPathWithModules(currentPath);
  res.render("path", { paths, currentPath });
};
