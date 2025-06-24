const bookmarksModel = require("../models/bookmarksModel");
const pathsModel = require("../models/pathsModel");
const usersModel = require("../models/usersModel");
const modulesModel = require("../models/modulesModel");

const { isAuthorized } = require("../utils/authUtils");
const { getUserId } = require("../utils/jwtUtils");

module.exports.index = async (req, res) => {
  try {
    const token = req.cookies.token;
    const auth = await isAuthorized(token, "PTD");

    if (auth === false) {
      return res.redirect("/login");
    }

    const userId = await getUserId(token);

    const bookmarks = await bookmarksModel.getAll(userId);
    const paths = await pathsModel.getAll();
    const ranking = await usersModel.getUsersRanking();

    const id = await getUserId(token);
    const user = await usersModel.getById(id);

    // logica para fazer a url do bookmark
    await Promise.all(
      bookmarks.map(async (bookmark) => {
        const url = await modulesModel.getModuleUrl(bookmark.content_id);
        bookmark.url = url;
      })
    );

    res.render("home", { paths, bookmarks, ranking, user });
  } catch (err) {
    const isNetworkError =
      err.code === "ECONNREFUSED" ||
      err.code === "ENOTFOUND" ||
      err.name === "NetworkError" ||
      err.message.includes("network");

    if(isNetworkError) {
      return res.redirect('/help');
    }
    return res.status(500).json(err.message)
  }
};

// Função para deletar bookmark
module.exports.deleteBookmark = async (req, res) => {
  try {
    await bookmarksModel.deleteById(req.params.id);
    res.redirect("/home");
  } catch (err) {
    res.status(500).send("Erro ao deletar bookmark");
  }
};

module.exports.toggleBookmark = async (req, res) => {
  const token = req.cookies.token;
  const url = req.headers.referer || "/";

  if (!token) {
    console.error("Token não encontrado nos cookies");
    return res.redirect("/login");
  }

  const userId = await getUserId(token); // extrai o ID do usuário do token JWT
  const { contentId, add } = req.body; // vem do <input hidden name="contentId">

  try {
    if (add == "true") {
      await bookmarksModel.insert(userId, contentId);
    } else {
      await bookmarksModel.deleteByUserAndContent(userId, contentId);
    }
    res.redirect(url);
  } catch (err) {
    console.error("Erro ao manipular bookmark:", err);
    res.status(500).send("Erro ao manipular favorito");
  }
};
