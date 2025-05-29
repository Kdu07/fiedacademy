// const trilhas = [
//     "Onboarding",
//     "Básico",
//     "Intermediário",
//     "Avançado"
// ];

module.exports.index = (req, res) => {
    res.render('home', { trilhas });
};

// module.exports.trilhas = (req, res) => {
//     const { slug } = req.params;
//     res.render('paths', { slug });
// };

module.exports.trilha = (req, res) => {
    const { slug } = req.params;

    // Exemplo de módulos para cada trilha
    const trilhas = {
        onboarding: {
            nome: "Onboarding",
            modulos: ["Bem-vindo", "Visão Geral", "Primeiros Passos"]
        },
        basico: {
            nome: "Básico",
            modulos: ["Conceitos Básicos", "Navegação", "Dicas Iniciais"]
        },
        intermediario: {
            nome: "Intermediário",
            modulos: ["Funcionalidades Intermediárias", "Customização"]
        },
        avancado: {
            nome: "Avançado",
            modulos: ["Automação", "Relatórios Avançados", "Integrações"]
        }
    };

    // Busca a trilha pelo slug
    const trilha = trilhas[slug];
    if (!trilha) {
        return res.status(404).send('Trilha não encontrada');
    }

    // Renderiza a view passando os módulos da trilha
    res.render('paths', { trilha });
}; 