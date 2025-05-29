const pool = require("../config/db");

exports.index = async (req, res) => {
  const userId = 1; // Supondo que você salva o id do usuário na sessão

  res.render("pages/home", {});
};
