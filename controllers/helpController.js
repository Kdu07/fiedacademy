// Controlador da rota /
exports.index = (req, res) => {
    res.render('help', {
      titulo: 'Ajuda',
      mensagem: 'Aqui estão os artigos de ajuda',
    });
  };