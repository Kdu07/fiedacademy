const bookmarksModel = require("../models/bookmarksModel");
const pathsModel = require("../models/pathsModel");

const { getUserId } = require("../utils/jwtUtils");

module.exports.index = async (req, res) => {
  const token = req.cookies.token; // Get the token from cookies

  if (!token) {
    console.error("No token found in cookies");
    return res.redirect("/login"); // Redirect to login if no token is present
  }

  const userId = await getUserId(token);
  console.log(userId);
 

  const bookmarks = await bookmarksModel.getAll();
  const paths = await pathsModel.getAll();

  res.render("home", { paths, bookmarks });
};
