const trilhas = [
    "Onboarding",
    "Básico",
    "Intermediário",
    "Avançado"
];

module.exports.index = (req, res) => {
    // Renderize sua view, por exemplo:
    res.render('home', { trilhas });
};