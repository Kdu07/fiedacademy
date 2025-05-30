// const trilhas = [
//     "Onboarding",
//     "Básico",
//     "Intermediário",
//     "Avançado"
// ];

const trilha = {
  id: 1,
  title: "Onboarding",
  modules: [
    {
      id: 1,
      title: "O que é FieldView",
      order: 1,
      progresso: 30 // dado simulado a partir da tabela `user_content_progress`
    },
    {
      id: 2,
      title: "Como instalar FieldView",
      order: 2,
      progresso: 10
    },
    {
      id: 3,
      title: "Boas práticas",
      order: 3,
      progresso: 0
    }
  ]
};

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
// Controlador da rota /
exports.index = (req, res) => {
    res.render('paths', {
      titulo: 'Trilhas',
      mensagem: 'Escolha a trilha que deseja seguir',
      trilha
    });
  };

  
