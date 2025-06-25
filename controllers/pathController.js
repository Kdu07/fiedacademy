const pathModel = require("../models/pathsModel");
const usersModel = require("../models/usersModel");
const { isAuthorized } = require("../utils/authUtils");
const { getUserId } = require("../utils/jwtUtils");

exports.index = async (req, res) => {
  try {
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
    const id = await getUserId(token);
    const currentPath = req.params.id;
    const paths = await pathModel.getPathWithModules(currentPath, id);
    const user = await usersModel.getById(id);

    res.render("path", { paths, currentPath, user });
  } catch (err) {
    const isNetworkError =
      err.code === "ECONNREFUSED" ||
      err.code === "ENOTFOUND" ||
      err.name === "NetworkError" ||
      err.message.includes("network");

    if (isNetworkError) {
      return res.redirect("/help");
    }
    return res.status(500).json(err.message);
  }
};
