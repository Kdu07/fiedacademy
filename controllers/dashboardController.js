const usersModel = require("../models/usersModel");
const userContentModel = require("../models/userContentModel");
const userTestModel = require("../models/userTestModel");

const { getUserId } = require("../utils/jwtUtils");
const { isAuthorized } = require("../utils/authUtils");

async function getUserData(id) {
  if (!id) {
    return;
  }

  const user = await usersModel.getById(id);
  const ranking = await usersModel.getUsersRanking();
  const userRank = ranking.findIndex((u) => u.id === id) + 1; // Find the user's rank
  const progress = await userContentModel.getUserPathsProgress(id);
  const moduleScores = await userTestModel.getUserModuleScores(id);

  const lastLogin = new Date(user.last_login).toLocaleDateString("pt-BR");

  progress.sort((a, b) => b.progress_percentage - a.progress_percentage);
  return {
    user,
    userRank,
    progress: progress || [],
    moduleScores,
    lastLogin,
  };
}

exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Gestor");

  if (auth === false) {
    return res.redirect("/");
  }

  const userId = await getUserId(token);
  const userData = await getUserData(userId);

  res.render("dashboard", userData);
};

exports.getUser = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Gestor");

  if (auth === false) {
    return res.redirect("/");
  }

  const { PTD } = req.body;
  const user = await usersModel.getByEmail(PTD);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userData = await getUserData(user.id);
  return res.render("dashboard", userData);
};
