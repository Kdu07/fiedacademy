const bookmarksModel = require("../models/bookmarksModel");
const pathsModel = require("../models/pathsModel");
const usersModel = require('../models/usersModel');

const { getUserId } = require("../utils/jwtUtils");

module.exports.index = async (req, res) => {
  const token = req.cookies.token; // Get the token from cookies

  if (!token) {
    console.error("No token found in cookies");
    return res.redirect("/login"); // Redirect to login if no token is present
  }

  const userId = await getUserId(token);
 

  const bookmarks = await bookmarksModel.getAll();
  const paths = await pathsModel.getAll();
  const ranking = await usersModel.getUsersRanking();

  res.render("home", { paths, bookmarks, ranking });
};

// Função para deletar bookmark
module.exports.deleteBookmark = async (req, res) => {
  try {
    await bookmarksModel.deleteById(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Erro ao deletar bookmark');
  }
};