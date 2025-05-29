// Controlador da rota /
exports.index = (req, res) => {
    res.render('pages/paths', {
      titulo: 'Trilhas',
      mensagem: 'Escolha a trilha que deseja seguir'
    });
  };

  
