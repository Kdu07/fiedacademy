// controllers/trilhaController.js
const TrilhaModel = require('../models/trilha.model');

exports.show = async (req, res) => {
  try {
    const idTrilha = req.params.id; // Supondo rota /trilhas/:id
    const trilha = await TrilhaModel.getTrilhaComModulos(idTrilha);
    res.render('pages/paths', { trilha });
  } catch (err) {
    res.status(500).send('Erro ao carregar a trilha');
  }
};
