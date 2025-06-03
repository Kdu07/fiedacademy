const bookmarksModel = require("../models/bookmarksModel");
const pathsModel = require("../models/pathsModel");

const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.index = async (req, res) => {
  const token = req.cookies.token; // Get the token from cookies

  if(!token) {
    console.error("No token found in cookies");
    return res.redirect("/login", {error: null}); // Redirect to login if no token is present
  }

  JWT.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      res.redirect("/login", {error: null});
    } else {
      console.log("Token verified successfully:", decoded);
    }
  });

  const bookmarks = await bookmarksModel.getAll();
  const paths = await pathsModel.getAll();

  res.render("home", { paths, bookmarks });
};
