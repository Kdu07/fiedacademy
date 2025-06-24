const JWT = require("jsonwebtoken");

// Controlador da rota /
exports.index = (req, res) => {
  const token = req.cookies.token; // Get the token from cookies
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    if (!token) {
      // No token, just continue to render the login page
      const error = req.query.error || null;
      return res.render("login", {
        error: error,
      });
    }

    // Only try to verify if we have a token
    const verifyToken = JWT.verify(token, JWT_SECRET);
    if (verifyToken) {
      return res.redirect("/home"); // Token valid, redirect to home
    } else {
      // Token invalid (unlikely to reach here as verify() would throw an error)
      res.clearCookie("token");
    }
  } catch (error) {
    console.error("Token verification failed:", error);

    // Always clear the cookie for any JWT error
    res.clearCookie("token");

    // Specific handling for expired tokens
    if (error.name === "TokenExpiredError") {
      console.log("Token expired");
      return res.render("login", {
        error: "Sua sessão expirou. Por favor, faça login novamente.",
      });
    }

    // Handle JWT malformed and other JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.render("login", {
        error: "Problema com autenticação. Por favor, faça login novamente.",
      });
    }

    // For any other unexpected errors
    return res.render("login", {
      error: "Erro de autenticação. Por favor, tente novamente.",
    });
  }

  // This code should never be reached due to the return statements above
  // But keeping it as a fallback just in case
  const error = req.query.error || null;
  res.render("login", {
    error: error,
  });
};
