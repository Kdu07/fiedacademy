const { getPathWithModules } = require('../models/pathsModel');

// Controlador da rota /
exports.index = async (req, res) => {
  try {
    const trilha = await getPathWithModules(1);

    console.log('Trilha carregada:', trilha);

    res.render('pages/paths', {
      titulo: 'Trilhas',
      mensagem: 'Escolha a trilha que deseja seguir',
      trilha
    });
  } catch (error) {
    console.error('Erro ao carregar trilhas:', error);
    res.status(500).send('Erro ao carregar trilhas');
  }
};