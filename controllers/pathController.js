// controllers/trilhaController.js
const pathModel = require('../models/pathModel');

exports.index = async (req, res) => {
  try {
    const pathId = req.params.id; // Supondo rota /trilhas/:id
    const path = await pathModel.getPathWithModule(pathId);
    res.render('pages/paths', { path });
  } catch (err) {
    res.status(500).send('Erro ao carregar a trilha');
  }
};
