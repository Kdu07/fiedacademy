const bookmarksModel = require('../models/bookmarksModel')
const pathsModel = require('../models/pathsModel')

module.exports.index = async (req, res) => { 
    const bookmarks = await bookmarksModel.getAll();
    const paths = await pathsModel.getAll();

    res.render('home', { paths, bookmarks });
};
