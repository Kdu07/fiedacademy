const subjectModel = require("../models/subjectModel");
const usersModel = require("../models/usersModel");

const { isAuthorized } = require("../utils/authUtils");
const { getUserId } = require("../utils/jwtUtils");

// Controlador da rota /
exports.index = async (req, res) => {
  try {
    const token = req.cookies.token;
    const auth = await isAuthorized(token, "PTD");

    if (auth === false) {
      return res.redirect("/");
    }

    const query = req.params.query || "";

    const searchArticles = await subjectModel.searchArticle(query);

    const userId = await getUserId(token);
    const user = await usersModel.getRole(userId);


    return res.render("search", {
      articles: searchArticles,
      user, // Assuming user is set in middleware
      query
    });
  } catch (err) {
    console.error("Error no search controller:", err);
    res.status(500).send("Erro ao carregar a página: " + err.message);
  }
};
