// Controlador da rota /
exports.index = (req, res) => {
    res.render('pages/content', {
      titulo: 'Conteúdos',
      mensagem: 'Aqui estão os conteúdos do módulo'
  });
};