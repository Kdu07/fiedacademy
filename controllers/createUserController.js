const { isAuthorized } = require("../utils/authUtils");
const { getUserId } = require("../utils/jwtUtils");
const usersModel = require("../models/usersModel");

// Controlador da rota /
exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Gestor");

  if (auth === false) {
    return res.redirect("/");
  }
  const id = await getUserId(token);
  const user = await usersModel.getById(id);

  const error = req.query.error || null; // Get error message from query parameters
  res.render("createUser", {
    error: error,
    user
  });
};
