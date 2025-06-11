const { isAuthorized } = require("../utils/authUtils");

// Controlador da rota /
exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "PTD");

  if (auth === false) {
    return res.redirect("/");
  }
  
  res.render("help", {
    titulo: "Ajuda",
    mensagem: "Aqui estão os artigos de ajuda",
  });
};
