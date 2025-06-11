const { isAuthorized } = require("../utils/authUtils");

// Controlador da rota /
exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Gestor");

  if (auth === false) {
    return res.redirect("/");
  }

  const error = req.query.error || null; // Get error message from query parameters
  res.render("createUser", {
    error: error,
  });
};
