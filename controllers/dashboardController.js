const usersModel = require("../models/usersModel");

const { getUserId } = require("../utils/jwtUtils");
const { isAuthorized } = require("../utils/authUtils");



exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Gestor");

  if (auth === false) {
    return res.redirect("/");
  }

  const userId = await getUserId(token);
  const user = await usersModel.getRole(userId);

  const ptd_users = await usersModel.getAllPTD();

  return res.render("dashboard", {user, ptd_users});
};

