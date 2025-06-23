const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Controlador da rota /
exports.index = (req, res) => {
  const token = req.cookies.token; // Get the token from cookies

  try {
    if (token) {
      const verifyToken = JWT.verify(token, JWT_SECRET);
      if (verifyToken) {
        return res.redirect("/home"); // Token valid, redirect to home
      } else {
        // Token expired or invalid, clear cookie
        res.clearCookie("token");
      }
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    res.clearCookie("token"); // Clear cookie if token verification fails
  }

  const error = req.query.error || null; // Get error message from query parameters
  res.render("login", {
    error: error,
  });
};
