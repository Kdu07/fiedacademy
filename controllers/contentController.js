// Controlador da rota /
exports.index = (req, res) => {
    res.render('content', {
      titulo: 'Conteúdos',
      mensagem: 'Aqui estão os conteúdos do módulo'
    });
  };