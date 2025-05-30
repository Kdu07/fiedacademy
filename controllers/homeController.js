const bookmarksModel = require('../models/bookmarksModel')
const pathsModel = require('../models/pathsModel')

// Busca todas as trilhas e bookmarks do banco de dados e renderiza a página inicial
module.exports.index = async (req, res) => { 
    const bookmarks = await bookmarksModel.getAll();
    const paths = await pathsModel.getAll();

    res.render('home', { paths, bookmarks });
};
