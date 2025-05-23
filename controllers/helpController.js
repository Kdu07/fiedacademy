// Controlador da rota /
exports.index = (req, res) => {
    res.render('pages/help', {
      titulo: 'Ajuda',
      mensagem: 'Aqui estão os artigos de ajuda',
    });
  };