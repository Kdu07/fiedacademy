// Define o caminho dos arquivos onde estão os models que a home vai usar
const bookmarksModel = require('../models/bookmarksModel')
const pathsModel = require('../models/pathsModel')

const trilhas = [
    "Onboarding",
    "Básico",
    "Intermediário",
    "Avançado"
];

module.exports.index = async (req, res) => { // Adicionei async, para q a função possa usar await
    // Chama o model getAll dentro do arquivo bookmarksModel
    // Coloca o return dentro da const bookmarks
    // Usa await para esperar a resposta do bd antes de continuar de executar a função
    const bookmarks = await bookmarksModel.getAll();

    // Renderize sua view, por exemplo:
    res.render('home', { trilhas });
};