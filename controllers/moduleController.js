// Controlador da rota /
exports.index = (req, res) => {
    res.render('pages/moduleContent', {
      titulo: 'Módulo',
    });
  };