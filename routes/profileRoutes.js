const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const profileController = require('../controllers/profileController');

// Configurar armazenamento do multer 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    // Save file with unique name
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Rota do perfil
router.get('/profile/:id', profileController.index);

// Rota para atualizar o perfil
router.post('/profile/uploadPicture', upload.single('avatar'), profileController.updatePicture);


module.exports = router;