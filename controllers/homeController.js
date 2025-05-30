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
    const paths = await pathsModel.getAll();
    //console.log(bookmarks[0].saved_at); // Exemplo de uso do console.log para verificar os dados
    //console.log(paths[0].title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')); // Exemplo de uso do console.log para verificar os dados


    // Renderize sua view, por exemplo:
    console.log(paths);
    res.render('home', { paths });
};
