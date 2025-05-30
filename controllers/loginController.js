// Controlador da rota /
exports.index = (req, res) => {
    res.render('login', {
      titulo: 'Login',
      mensagem: 'Acesse sua conta'
    });
  };