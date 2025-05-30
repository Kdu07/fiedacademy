const bookmarksModel = require('../models/BookmarksModel')
const pathsModel = require('../models/PathsModel')

module.exports.index = async (req, res) => { 
    const bookmarks = await bookmarksModel.getAll();
    const paths = await pathsModel.getAll();

    res.render('home', { paths, bookmarks });
};
