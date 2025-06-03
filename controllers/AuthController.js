const { createUser } = require("../models/UserModel");

exports.create = async (req, res) => {
console.log(req.body)
  const { email, password } = req.body;
  if(!email || !password) {
    res.redirect('/login');
  }
  const newUser = await createUser(email,password)

  console.log(newUser)

  if(!newUser || newUser.length === 0) {
    return res.redirect('/login');
  }
  res.cookie('user', user.id, {httpOnly: true, secure: true}); // Set cookie with user ID
  res.redirect("/");
};

exports.login = async (req, res) => {
   const { email, password } = req.body;
  if(!email || !password) {
    res.redirect('/login');
  }
  const user = await logUser(email,password)

  console.log(user)

  if(!user) {
    return res.redirect('/login');
  }
  res.cookie('user', user.id, {httpOnly: true, secure: true}); // Set cookie with user ID
  res.redirect("/");
};
