const trilhas = [
    "Onboarding",
    "Básico",
    "Intermediário",
    "Avançado"
];

module.exports.index = (req, res) => {
    res.render('home', { trilhas });
};

module.exports.trilhas = (req, res) => {
    const { slug } = req.params;
    res.render('paths', { slug });
};