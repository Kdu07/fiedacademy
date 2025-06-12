// Controlador da rota /
exports.index = (req, res) => {
  const token = req.cookies.token; // Get the token from cookies

  if(token) {
    return res.redirect("/"); // If token exists, redirect to home
  }
  
  const error = req.query.error || null; // Get error message from query parameters
    res.render('login', {
      error: error
    });
  };