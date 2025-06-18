const { getUserId } = require("../utils/jwtUtils");
const usersModel = require("../models/usersModel");

// Controlador da rota /
exports.index = async (req, res) => {
  const token = req.cookies.token;
  const id = await getUserId(token);

  let user = await usersModel.getById(id);
  if(!user) {
    user = {
      id: null,
      name: "Visitante",
      email: ""
    }
  }
  res.render('aboutus', {user}); 
};
