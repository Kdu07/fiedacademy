const subjectModel = require('../models/subjectModel');

exports.index = async (req, res) => {
    const id = req.body
    const subject = await  subjectModel.getSubjectHelp(id);
    res.render('subject');
}

