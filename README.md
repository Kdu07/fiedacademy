# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="/assets/assets_wad/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# FiedAcademy

## Grupo 05

## :student: Integrantes: 
- <a href="https://www.linkedin.com/in/antoniodicillo/">Antonio Di Cillo</a>
- <a href="https://github.com/CaduQuaglia">Carlos Quaglia</a>
- <a href="https://www.linkedin.com/in/emanuelly-cantarelli-2a0480305/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">Emanuelly Dias</a> 
- <a href="https://www.linkedin.com/in/joao-agmont-b82228359/">Joao Agmont</a> 
- <a href="https://www.linkedin.com/in/luiz-hinuy-0995252b1/">Luiz Hinuy</a>
- <a href="https://www.linkedin.com/in/maria-arielly/">Maria Arielly</a> 
- <a href="https://www.linkedin.com/in/-rafael-cabral/">Rafael Cabral</a>

## :teacher: Professores:
### Orientador(a) 
- <a href="https://www.linkedin.com/in/marcelo-gon%C3%A7alves-phd-a550652/">Marcelo Luiz do Amaral Gonçalves</a>
### Instrutores
- <a href="https://www.linkedin.com/in/cristiano-benites-ph-d-687647a8/">Cristiano Benites</a>
- <a href="https://www.linkedin.com/in/filipe-gon%C3%A7alves-08a55015b/">Filipe Gonçalves</a> 
- <a href="https://www.linkedin.com/in/francisco-escobar/">Francisco Escobar</a> 
- <a href="https://www.linkedin.com/in/geraldo-magela-severino-vasconcelos-22b1b220/">Geraldo Vasconcelos</a>
- <a href="https://www.linkedin.com/in/pedroteberga/">Pedro Teberga</a>

## 📝 Descrição

O projeto tem como propósito desenvolver uma plataforma web de capacitação técnica voltada aos PTDs (Promotores Técnicos Digitais) da divisão agrícola da Bayer AG — empresa referência global em inovação no agronegócio e pioneira em soluções digitais como o Climate FieldView.

Apesar dos avanços tecnológicos da empresa e dos investimentos constantes em pesquisa e desenvolvimento, desafios internos como o alto turnover (acima de 30% ao ano) e a ausência de um treinamento estruturado ainda comprometem a eficiência e a padronização da atuação desses profissionais no campo.

Foi a partir dessa lacuna que surgiu a ideia do projeto: oferecer uma solução digital que prepara os novos colaboradores antes mesmo de entrarem em campo, promovendo uma jornada de aprendizado clara, engajadora e eficaz. A plataforma oferece trilhas de conhecimento em diversos formatos, monitoramento individual de progresso e recursos de gamificação que aumentam a motivação e a retenção do conteúdo.

Mais do que um ambiente de treinamento, o projeto busca transformar o processo de onboarding técnico em uma experiência interativa, inteligente e alinhada às reais demandas da operação de campo. Assim, FieldAcademy tem o objetivo de garantir que os PTDs se sintam preparados, confiantes e capacitados para o atendimento ao campo.

## 📝 Link de demonstração

https://www.youtube.com/watch?v=ktX-I1_U-2s

## 📁 Estrutura de pastas
O projeto segue o padrão arquitetural **MVC (Model-View-Controller)**, que organiza o código em três camadas principais:

- **Model**: Define a estrutura dos dados e realiza a comunicação com o banco.
- **View**: Responsável pelas páginas que o usuário vê.
- **Controller**: Processa as requisições, interage com os Models e retorna as Views.

Para isso, a estrutura de pastas foi organizada da seguinte forma:<br>
`2025-1B-T15-IN02-G05/` <br>
├── `assets/`        # Arquivos estáticos do projeto, como imagens, ícones e fontes. <br>
├── `certificates/`     # Certificados digitais, geralmente usados para HTTPS ou autenticação.<br>
├── `config/`           # Arquivos de configuração, como conexão com banco de dados e variáveis de ambiente. <br>
├── `controllers/`      # Lógica de controle das requisições, onde ficam as funções que processam as rotas.<br>
├── `data/`            # Dados estáticos, arquivos de seed ou arquivos de importação/exportação de dados. <br>
├── `documents/`        # Pasta onde está localizado o WAD <br>
├── `models/`           # Definição dos modelos de dados, representando as tabelas do banco e suas regras. <br>
├── `public/ `          # Pasta pública acessível pelo navegador, normalmente para arquivos estáticos (css, js, imagens). <br>
├── `routes/`           # Definição das rotas do sistema, conectando URLs aos controllers. <br>
├── `scripts/`          # Scripts utilitários ou de automação, como scripts de build, deploy ou manutenção. <br>
├── `utils/`            # Funções utilitárias e helpers reutilizáveis em várias partes do projeto. <br>
├── `views/`            # Templates de visualização (ex: arquivos EJS, Pug, Handlebars) usados para renderizar páginas HTML. <br>
├── `.gitignore`        # Arquivo que define quais arquivos/pastas devem ser ignorados pelo Git. <br>
├── `jest.config.js`    # Configuração do framework de testes Jest. <br>
├── `package-lock.json` # Arquivo de controle de versões exatas das dependências instaladas. <br>
├── `package.json`      # Arquivo principal de configuração do Node.js, lista dependências e scripts do projeto. <br>
├── `readme.md`         # Documentação principal do projeto, instruções de uso e informações gerais. <br>
├──` app.js`            # Arquivo principal que inicializa e configura o servidor da aplicação. <br>
└── `rest.http`         # Arquivo opcional para testar endpoints HTTP diretamente (usado por extensões do VS Code) <br>

## 💻 Configuração para desenvolvimento e execução do código

Aqui encontram-se todas as instruções necessárias para a instalação de todos os programas, bibliotecas e ferramentas imprescindíveis para a configuração do ambiente de desenvolvimento.

1. **Instalações necessárias:**<br>
- [Node.js (versão recomendada: 16.15.1 LTS)](https://nodejs.org/pt-br/)
- [Visual Studio Code (VSCode)](https://code.visualstudio.com/)
- [Git](https://git-scm.com/) – para clonar o repositório

2. Clone este repositório:
   ```bash
   git clone https://github.com/Inteli-College/2025-1B-T15-IN02-G05

2. Instale as dependências:
   ```bash
    npm install
    npm init -y
    npm install express ejs

3. Inicie o servidor:
    ```bash
    node server.js
4. Acesse em seu navegador:
    ```bash
    http://localhost:3000

## 🗃 Histórico de lançamentos

* 0.5.0 - XX/XX/2025
    * 
* 0.4.0 - 14/06/2025 - Entrega da segunda versão da plataforma web e testes jest. 
    * 
* 0.3.0 - 30/05/2025 - Prototipação de alta fidelidade (MockUp) e Arquiteru de Software (MVC).
    * 
* 0.2.0 - 15/05/2025 - Prototipação de baixa fidelidade e construção do banco de dados.
    * 
* 0.1.0 - 30/04/2025 - Idealização inicial da plataforma, a partir do entendimento do negócio e do problema.*
    
## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Intelihub/Template_M2/"><a href="https://github.com/Inteli-College/2025-1B-T15-IN02-G05">FieldAcademy</a> © 2025 by <a href="https://github.com/Inteli-College/2025-1B-T15-IN02-G05">INTELI, Antonio Filisetti Yoshinaga Di Cillo, Carlos Eduardo Serrano Quaglia, Emanuelly Cantarelli Dias, João de Caprio Agmont, Luiz Felipe Paravatti Maciel Hinuy,  Maria Arielly Lima de Oliveira, Rafael Cabral da Silva.</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International</a>.
