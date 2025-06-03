// controllers/trilhaController.js
const pathsModel = require('../models/pathsModel');

exports.index = async (req, res) => {
  /*
  try {
    const pathId = req.params.id; // Supondo rota /trilhas/:id
    const path = await pathsModel.getPathWithModule(pathId);
    res.render('pages/paths', { path });
  } catch (err) {
    res.status(500).send('Erro ao carregar a trilha');
  }
  */

  
  const paths = await pathsModel.getPathWithModules(req.params.id);
  res.render('path', { paths });
};
