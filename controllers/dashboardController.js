const usersModel = require("../models/usersModel");
const userContentModel = require("../models/userContentModel");
const userTestModel = require("../models/userTestModel");

const { getUserId } = require("../utils/jwtUtils");


async function getUserData(id) {
  if(!id) {
    return;
  }

  const user = await usersModel.getById(id);
  const ranking = await usersModel.getUsersRanking();
  const userRank = ranking.findIndex((u) => u.id === id) + 1; // Find the user's rank
  const progress = await userContentModel.getUserPathsProgress(id);
  const moduleScores = await userTestModel.getUserModuleScores(id);

  const lastLogin = new Date(user.last_login).toLocaleDateString("pt-BR");

  console.log(moduleScores);

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
  const token = req.cookies.token; // Get the token from cookies
  
  if(!token) {
    return res.redirect("/login"); // If token does not exist, redirect to home
  }

  const userId = await getUserId(token);

  if (!userId) {
    return res.redirect("/login"); // If token is invalid, redirect to login
  }

  const userData = await getUserData(userId);

  res.render("dashboard", userData);
};

exports.getUser = async (req, res) => {
  const token = req.cookies.token; // Get the token from cookies
  const userId = await getUserId(token);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { PTD } = req.body;

  const user = await usersModel.getByEmail(PTD);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }


  const userData = await getUserData(user.id);  
  console.log(userData)

  return res.render("dashboard", userData);
};
