const subjectModel = require("../models/subjectModel");
const usersModel = require("../models/usersModel");
const feedbacksContentModel = require("../models/feedbacksContentModel");
const { isAuthorized } = require("../utils/authUtils");
const { getUserId } = require("../utils/jwtUtils");

// Display subject page with articles
exports.index = async (req, res) => {
  try {
    const token = req.cookies.token;
    const auth = await isAuthorized(token, "PTD");

    if (auth === false) {
      return res.redirect("/");
    }

    const userId = await getUserId(token);
    const user = await usersModel.getRole(userId);

    // Get all articles for the sidebar
    const allArticles = await subjectModel.getAllArticles();

    // If no article ID is specified, show the first one
    // For demonstration, we're showing a default article
    const article = {
      id: 1,
      title: "O que é o FieldView™?",
      category: "Primeiros Passos",
      positiveFeedback: 12,
      negativeFeedback: 2,
    };

    res.render("subject", {
      user,
      article,
      allArticles,
    });
  } catch (err) {
    console.error("Error in subject controller:", err);
    res.status(500).send("Erro ao carregar a página: " + err.message);
  }
};

