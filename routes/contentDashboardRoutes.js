const express = require('express');
const router = express.Router();
require('dotenv').config();

const contentDashboardController = require('../controllers/contentDashboardController');

router.get('/contentDashboard', (req, res) => {
  res.redirect('/contentDashboard/lessons');
})

// Rota de dashboard
router.get('/contentDashboard/lessons', contentDashboardController.indexLessons);
router.get('/contentDashboard/modules', contentDashboardController.indexModules);

// Conteudo
router.get('/content/edit/:id', contentDashboardController.editContent);
router.get('/content/new', contentDashboardController.startContentCreation);

router.post('/content/create', contentDashboardController.createContent);
router.post('/content/update/:id', contentDashboardController.updateContent);
router.post('/content/delete/:id', contentDashboardController.deleteContent);

// Módulo
router.get('/module/edit/:id', contentDashboardController.editModule);
router.get('/module/new', contentDashboardController.startModuleCreation);

router.post('/module/create', contentDashboardController.createModule);
router.post('/module/update/:id', contentDashboardController.updateModule);
router.post('/module/delete/:id', contentDashboardController.deleteModule);

module.exports = router;

