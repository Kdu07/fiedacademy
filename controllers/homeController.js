const bookmarksModel = require("../models/bookmarksModel");
const pathsModel = require("../models/pathsModel");
const usersModel = require("../models/usersModel");

const { isAuthorized } = require("../utils/authUtils");
const { getUserId } = require("../utils/jwtUtils");

module.exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "PTD");

  if (auth === false) {
    return res.redirect("/login");
  }

  const bookmarks = await bookmarksModel.getAll();
  const paths = await pathsModel.getAll();
  const ranking = await usersModel.getUsersRanking();

  const id = await getUserId(token);
  const user = await usersModel.getById(id);

  res.render("home", { paths, bookmarks, ranking, user });
};

// Função para deletar bookmark
module.exports.deleteBookmark = async (req, res) => {
  try {
    await bookmarksModel.deleteById(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Erro ao deletar bookmark");
  }
};
