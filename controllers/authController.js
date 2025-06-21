const { createUser, loginUser } = require("../models/usersModel");
const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


exports.create = async (req, res) => {
  const { email, password, name, region, role } = req.body;
  console.log(req.body)
  if (!email || !password || !name || !region || !role) {
    return res.redirect(
      "/create-user?error=Todos%20os%20campos%20devem%20ser%20preenchidos"
    );
  }
  const newUser = await createUser(email, password, name, region, role);

  if (!newUser || newUser.length === 0) {
    return res.redirect(
      "/create-user?error=Todos%20os%20campos%20devem%20ser%20preenchidos"
    );
  }

  return res.redirect("/create-user");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.redirect("/login?error=Email%20e%20senha%20são%20obrigatórios");
  }
  const user = await loginUser(email, password);

  if (!user || user.length === 0) {
    return res.redirect("/login?error=Email%20ou%20senha%20inválida");
  }

  const token = JWT.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

  res.cookie("token", token, { httpOnly: true, secure: true }); // Set cookie with user ID
  return res.redirect("/");
};

exports.logout = async (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true });
  return res.redirect("/login");
};
