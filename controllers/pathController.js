const pathModel = require('../models/pathsModel');

exports.index = async (req, res) => {
    try {
        const { id } = req.params;
        const path = await pathModel.getPathWithModules(id);

        if (!path) {
            return res.redirect('/');
        }

        res.render('path', { path });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};
