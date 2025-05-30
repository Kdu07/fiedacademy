const bookmarksModel = require('../models/bookmarksModel')
const pathsModel = require('../models/pathsModel')

module.exports.index = async (req, res) => { 
    const bookmarks = await bookmarksModel.getAll();
    const paths = await pathsModel.getAll();

    console.log(paths);
    res.render('home', { paths, bookmarks });
};
