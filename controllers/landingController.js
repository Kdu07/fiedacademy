const { getUserId } = require("../utils/jwtUtils");
const usersModel = require("../models/usersModel");

// Controlador da rota /
exports.index = async (req, res) => {
  const token = req.cookies.token;
  let user;
  
  if (token) {
    const id = await getUserId(token);

    user = await usersModel.getRole(id);
    if (!user) {
    user = {
      id: null,
      name: "Visitante",
      email: "",
    };
  }} else {
    user = {
      id: null,
      name: "Visitante",
      email: "",
    };
  }

  
  res.render("landingPage", { user });
};
