// Controlador da rota /
exports.index = (req, res) => {
    res.render('pages/login', {
      titulo: 'Login',
      mensagem: 'Acesse sua conta'
    });
  };