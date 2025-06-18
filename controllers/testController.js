const { isAuthorized } = require("../utils/authUtils");
const { getUserId } = require("../utils/jwtUtils");
const usersModel = require("../models/usersModel");

exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "PTD");

  if (auth === false) {
    return res.redirect("/");
  }
  const id = await getUserId(token);
  const user = await usersModel.getById(id);

  res.render("test", {user});
};
