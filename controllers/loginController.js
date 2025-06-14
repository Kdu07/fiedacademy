// Controlador da rota /
exports.index = (req, res) => {
  const token = req.cookies.token; // Get the token from cookies

  if (token) {
    try {
      // Verify token with your JWT secret
      jwt.verify(token, process.env.JWT_SECRET);
      return res.redirect("/"); // Token valid, redirect to home
    } catch (err) {
      // Token expired or invalid, clear cookie
      res.clearCookie("token");
    }
  }

  const error = req.query.error || null; // Get error message from query parameters
  res.render("login", {
    error: error,
  });
};
