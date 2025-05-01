
<img src="../assets/assets_wad/logointeli.png">


# WAD - Web Application Document - Módulo 2 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final_**

## Nome do Grupo

#### Nomes dos integrantes do grupo
- <a href="https://www.linkedin.com/in/antoniodicillo/">Antonio Di Cillo</a>
- <a href="https://github.com/CaduQuaglia">Carlos Quaglia</a>
- <a href="https://www.linkedin.com/in/emanuelly-cantarelli-2a0480305/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">Emanuelly Dias</a> 
- <a href="https://www.linkedin.com/in/joao-agmont-b82228359/">Joao Agmont</a> 
- <a href="https://www.linkedin.com/in/luiz-hinuy-0995252b1/">Luiz Hinuy</a>
- <a href="https://www.linkedin.com/in/maria-arielly/">Maria Arielly</a> 
- <a href="https://www.linkedin.com/in/-rafael-cabral/">Rafael Cabral</a>



## Sumário

[1. Introdução](#c1)

[2. Visão Geral da Aplicação Web](#c2)

[3. Projeto Técnico da Aplicação Web](#c3)

[4. Desenvolvimento da Aplicação Web](#c4)

[5. Testes da Aplicação Web](#c5)

[6. Estudo de Mercado e Plano de Marketing](#c6)

[7. Conclusões e trabalhos futuros](#c7)

[8. Referências](c#8)

[Anexos](#c9)

<br>


# <a name="c1"></a>1. Introdução (sprints 1 a 5)

&nbsp;&nbsp;&nbsp;&nbsp; A divisão agrícola da Bayer AG <sup>[1](c#10)</sup>, consolida-se como líder global em soluções integradas para o agronegócio, com foco em sementes geneticamente modificadas, defensivos agrícolas e tecnologias digitais. Seu portfólio inclui o Climate FieldView <sup>[2](c#11)</sup>,  plataforma digital que ajuda a priorizar o monitoramento, identificar problemas de forma rápida e tomar medidas para proteger sua produtividade por meio de imagens de satélite de fácil utilização e de alta qualidade. <br>

&nbsp;&nbsp;&nbsp;&nbsp; A empresa investe fortemente em pesquisa e desenvolvimento, posicionando-se na vanguarda da agricultura 4.0. No entanto, existem problemáticas que comprometem sua eficácia, o primeiro problema que a equipe de PTDs enfrenta é o turnover acima de 30% ao ano. O **Turnover**, é a alta rotatividade de funcionários, acarreta em diversos impactos negativos, como aumento de custos com recrutamento e seleção, além da perda de conhecimento e experiência acumulada. A segunda problemática é a falta de treinamento estruturado que possa guiar o processo de desenvolvimento de habilidades e conhecimentos, dos novos contratados. Gerando resultados ineficazes, falta de progresso, contratempos no desempenho e segurança. <br>

&nbsp;&nbsp;&nbsp;&nbsp; Para solucionar esse desafio, foi desenvolvida uma plataforma web de capacitação técnica, que oferece trilhas de conhecimento em diferentes formatos aos PTDs antes de sua atuação em campo, acompanhando o progresso individual dos colaboradores, além de incorporar elementos de gamificação para engajamento.  Os principais aspectos de criação de valor da solução estão na melhoria da experiência do produtor rural, na redução de custos operacionais com suporte, na padronização do atendimento e na possibilidade de monitorar e aprimorar continuamente a qualificação dos PTDs, alinhando o produto às expectativas e necessidades reais do parceiro de negócios. A solução proposta pelo nosso projeto visa não apenas corrigir gaps de conhecimento, como criar um ciclo virtuoso de engajamento, certificação e acompanhamento contínuo, alinhando a operação de campo às ambições de inovação da Bayer. <br>

# <a name="c2"></a>2. Visão Geral da Aplicação Web (sprint 1)

## 2.1. Escopo do Projeto (sprints 1 e 4)

### 2.1.1. Modelo de 5 Forças de Porter (sprint 1)
As forças de Porter analisam o nível de competitividade e atratividade de um setor por meio de cinco fatores: ameaça de novos entrantes, poder de barganha de fornecedores, poder de barganha de clientes, ameaça de produtos substitutos e rivalidade entre concorrentes. Desse modo a posição da Bayer no setor se dá da seguinte maneira:  <br>

<img src="../assets/assets_wad/5forcasDePorter.png">

#### Ameaça de novos entrantes: Média a baixa. <br>
O setor exige grandes investimentos em P&D, infraestrutura e cumprimento de regulações rigorosas, o que cria barreiras significativas. A Bayer ainda possui forte credibilidade entre os produtores, dificultando a entrada de novas marcas. Baseado em dados da revista Exame <sup>[3](#c3)</sup>, startups AgTech estão conseguindo espaço com soluções tecnológicas específicas, como agricultura de precisão e monitoramento por IA. <br>

#### Poder de barganha dos fornecedores: Baixo.<br>
A Bayer, sendo uma multinacional de grande porte, possui escala global que lhe confere vantagem nas negociações com fornecedores. Além disso, sua estratégia de diversificação de fornecedores em vários países e seu investimento em verticalização (produção própria de insumos) reduz sua dependência externa. <br>

#### Poder de barganha dos clientes: Médio. <br>
Produtores rurais e grandes cooperativas têm algum poder de negociação, principalmente em mercados onde a concorrência é intensa. Ainda assim, muitos clientes tradicionais mostram resistência inicial a novas tecnologias, como mostra a matéria da Distrito <sup>[4](#c13)</sup>. A Bayer busca mitigar isso oferecendo pacotes integrados e tecnologias patenteadas, dificultando a substituição por concorrentes. <br>

#### Ameaça de produtos substitutos: Média. <br>
Pequenos produtores e mercados de nicho estão buscando alternativas sustentáveis, como biopesticidas e métodos orgânicos de cultivo evidenciado por Compre Rural <sup>[5](#c14)</sup>. Embora essas opções estejam crescendo, os produtos da Bayer ainda oferecem maior escala, eficácia e previsibilidade, fatores decisivos para grandes produtores.<br>

#### Rivalidade entre concorrentes: Alta. <br>
A disputa no setor é intensa, envolvendo grandes empresas como Syngenta, Corteva e BASF. A competição se baseia principalmente em inovação tecnológica, desenvolvimento de patentes e capacidade de oferecer soluções digitais avançadas, fator esse evidenciado na Imagen Agropecuaria <sup>[6](#c15)</sup>. Estratégias como fusões e aquisições são comuns para fortalecer posições de mercado e expandir a base tecnológica.<br>

### 2.1.2. Análise SWOT da Instituição Parceira (sprint 1)

Ferramenta que analisa forças, fraquezas, oportunidades, ameaças.

A Bayer se destaca pela forte inovação tecnológica, marca global consolidada e capacidade financeira, o que a posiciona entre os líderes do agronegócio mundial. Seu portfólio integrado reforça a competitividade frente a rivais como Syngenta, Corteva e BASF. No entanto, enfrenta desafios de altos custos e maior pressão regulatória, que podem ser explorados por concorrentes. O crescimento da agricultura digital e da demanda por sustentabilidade abre oportunidades para reforçar sua liderança. A empresa busca equilibrar produtividade e responsabilidade ambiental para se diferenciar num mercado cada vez mais competitivo e sensível às questões sociais. <br>

<img src="../assets/assets_wad/MatrizSWOT.png">

### 2.1.3. Solução (sprints 1 a 5)



   1. A empresa Bayer oferece uma plataforma digital, Climate FieldView, que monitora a saúde dos campos e coleta informações de produções agrícolas. Atualmente há uma equipe de atendimento aos produtores, PTDs (Promotores Técnicos Digitais).  Entretanto estes profissionais apresentam lacunas no conhecimento necessário para auxiliar os agricultores, ocasionando a alta rotatividade de promotores e a sobrecarga na equipe de suporte.


2. TAPI


3.  A nossa solução é uma aplicação web com trilhas de capacitação, além  de ajudar e treinar os PTDs, nosso objetivo é ajudá-los a conciliar todos os empecilhos criados pelos agricultores. A aplicação web conta com trilhas de aprendizado que são atualizadas e personalizadas pelo gestor, além de fácil resposta a qualquer dúvida durante o atendimento no campo.       

4. Nossa solução poderá ser utilizada tanto no formato mobile, quanto em um navegador web, além da plataforma poder ser acessada offline, garantindo acesso mesmo em locais com pouca conectividade, como áreas rurais. 

5. Espera-se que os PTDs atuem com maior autonomia e eficiência, reduzindo o número de chamados ao suporte e aumentando a satisfação dos produtores. Com isso eles poderiam otimizar seu tempo e tarefas e focar o trabalho em objetivos mais redundantes.  


6. Avaliaremos nosso sucesso a partir de feedback dos próprios PTDs, e também a partir de feedbacks dos agricultores. Além é claro de testar os promotores com um teste para ver se o conhecimento foi realmente adquirido no processo. Outro fator seria a redução de requisições para o time de suporte, que atualmente está saturado de tantos chamados.	


### 2.1.4. Value Proposition Canvas (sprint 1): 
O canva de proposta de valor é uma ferramenta para organizar os pontos principais de necessidades e expectativas do cliente e relacioná-los com a solução entregue, garantindo que todos os pontos foram atendidos.

<img src="../assets/assets_wad/PropostaDeValor.png">

### Perfil do cliente
### Tarefas do cliente
#### Atendimento aos produtores: 
PTDs comparecem presencialmente nas fazendas para solucionar problemas sobre o sistema fieldview
#### Utilizar site de ajuda rápida: 
Para responder dúvidas específicas os promotores utilizam o site já existente de ajuda rápida
#### Ligar para o suporte para atender dúvidas técnicas: 
Caso as informações que precisa não se encontrem no site de ajuda rápida o promotor recorre ao suporte técnico
### Ganhos
#### (1) Nivelamento de conhecimento dos profissionais: 
Ferramenta para direcionar os conteúdos organizadamente
#### (2) Possibilidade de buscar respostas rapidamente: 
O PTD necessita de uma solução onde consiga pesquisar os conteúdos usando palavras chave
#### (3) Facilidade no uso da plataforma: 
O promotor deve acessar a página que deseja de forma intuitiva e com poucos cliques
#### (4) Acesso a informações sem conexão à internet: 
No cotidiano o PTD se move para lugares onde a conexão à internet é lenta ou inexistente, portanto necessita de opções offline
### Dores
#### (1) Informações sobre o fieldview distribuídas por vários locais: 
Atualmente os guias e conhecimento sobre o fieldview estão distribuídos em pelo menos três plataformas diferentes e de forma desorganizada além de ser frequentemente passados por chat entre os PTDs
#### (2) Onboarding não entrega o nível adequado de conhecimento: 
O onboarding é possui apenas uma semana, o que é curto demais para que o novo profissional aprenda suficientemente sobre o sistema 
#### (3) Falta de direcionamento e validação sobre os conhecimentos que devem ser adquiridos: 
Não existe planejamento sobre o que deve ser aprendido em relação ao fieldview nem sistema para conferir o nível conhecimento dos PTDs
#### (4) Dificuldade de adquirir conhecimento sobre novidades: 
O fieldview é um sistema que constantemente recebe atualizações que incluem novas ferramentas e funcionalidades, porém não há forma eficiente para distribuir essas informações aos PTDs

### Proposta de valor
### Produtos e serviços
#### Aplicação web para facilitar onboarding e aprendizagem sobre o sistema fieldview: 
A solução digital consiste em um site onde o PTD acessa com seu login e pode seguir uma trilha de conhecimento
#### Acesso às informações por pesquisa de palavras-chave:
Com a barra de pesquisa o PDT pode com agilidade utilizar palavras-chave para encontrar conteúdos sobre o assunto desejado
#### Possibilidade de consulta offline: 
A solução contém partes baixáveis de forma que o promotor pode acessá-las mesmo sem conexão com a internet
### Criadores de ganhos
#### (1) Conteúdos organizados em módulos de conhecimento: 
O conteúdo é entregue seguindo um planejamento e categorização
#### (2) Barra de pesquisa: 
Ferramenta para pesquisa de conteúdo por digitação de palavra-chave
#### (3) Design para poucos cliques:
O design do site é feito de forma que o usuário consegue acessar o que deseja com o mínimo número de cliques
#### (4) Possibilidade de downloads de alguns conteúdos:
Alguns conteúdos da plataforma são disponíveis para baixar no dispositivo, para que o acesso sem conexão a internet ocorra
### Aliviam as dores
#### (1) Unificação de todas as informações:
A solução conta com todos os conteúdos e informações necessárias para a utilização do sistema Fieldview em um só lugar
#### (2) Módulo de estudos para onboarding e nivelamento:
Para direcionar o PTD, existem módulos de conhecimento que são entregues de forma planejada a fim de realizar o onboarding de um novo promotor e assim nivelar o conhecimento dos profissionais em campo
#### (3) Trilha de aprendizagem e avaliações de domínio:
Os módulos de conteúdo são categorizados e disponíveis de forma plenejada assim como personalizada de acordo com os resultados das avaliações
#### (4) Gestor da plataforma pode adicionar conteúdos:
Os funcionários com acesso especial para gerenciar a plataforma conseguem adicionar e remover conteúdos a qualquer momento

### 2.1.5. Matriz de Riscos do Projeto (sprint 1)

&nbsp;&nbsp;&nbsp;&nbsp; A matriz de riscos é uma ferramenta visual e analítica fundamental para a gestão de projetos, permitindo a identificação, análise e avaliação dos riscos que podem impactar objetivos organizacionais e projetos. A matriz de riscos consiste em uma representação gráfica que cruza dois eixos principais: a probabilidade de ocorrência de um risco e o impacto que esse risco pode causar. Essa abordagem possibilita classificar os riscos em diferentes níveis de criticidade, facilitando a priorização das ações de mitigação e o direcionamento eficiente de recursos para os riscos mais relevantes <sup>[2](#c11)</sup>. Dessa forma, a matriz de riscos foi utilizada em nosso projeto para identificar potenciais situações adversas que podem vir a afetar o andamento do trabalho, como também ações que estão sendo utilizadas para diminuir essa probabilidade de ocorrência. <br>

<div align = "center">

<sup>Figura 1: Matriz de Riscos do projeto.</sup><br>

<img src="../assets/assets_wad/matrizDeRiscos.png"><br>

<sub>Fonte: Material produzido pelos autores (2025). </sub><br>

<sup>Quadro 1: Riscos e planos de ação.</sup><br>

| \# | **Ameaça** | **Plano de Ação** |
|----|------------|-------------------|
| 1 | A construção de uma única plataforma Web pode não abranger todas as necessidades do projeto | Definir um escopo claro com o parceiro (Bayer) e considerar arquitetura modular para expansões futuras |
| 2 | Dificuldade em compreender todas as funcionalidades do FieldView | Realizar imersão guiada com especialistas da Bayer e consultar documentação oficial |
| 3 | Falta de foco e engajamento da equipe nos horários de trabalho | Implementar rotinas ágeis com dailies curtas, metas claras e check-ins semanais |
| 4 | Não conseguir contemplar todas as dores dos PTDs na solução inicial | Conduzir entrevistas com PTDs e priorizar as principais dores em MVPs iterativos |
| 5 | Limitações nas ferramentas digitais disponíveis para a construção web | Avaliar previamente os recursos disponíveis e negociar o uso de frameworks externos com o parceiro |
| 6 | Dificuldade em criar uma solução realmente útil para o PTD | Co-desenvolver a solução com feedback contínuo dos PTDs e validar protótipos com usuários reais |
| 7 | Complexidade técnica do problema dificultar o avanço da solução | Dividir o desafio em tarefas menores, com estudo dirigido e apoio de mentores/tutores técnicos |
| 8 | Instabilidade de conexão com internet durante o desenvolvimento | Garantir planos alternativos como locais com Wi-Fi estável, dados móveis extras ou trabalho offline sempre que possível |

<sub>Fonte: Material produzido pelos autores (2025). </sub><br>
</div>

&nbsp;&nbsp;&nbsp;&nbsp; Além disso, também foi feito o levantamento de potenciais oportunidades a serem conquistadas através da construção do projeto.<br>

<div align = "center">

<sup>Quadro 2: Oportunidades.</sup><br>
| \# | **Oportunidade** | **Plano de Ação** |
|----|------------------|-------------------|
| 1 | Desenvolver habilidades em outros eixos do conhecimento | Identificar e distribuir funções multidisciplinares entre os membros (gestão de produto, UX/UI, comunicação, dados) para estimular o aprendizado prático e colaborativo |
| 2 | Expandir nosso entendimento sobre conhecimentos agrários com o FieldView | Agendar sessões com especialistas da Bayer, explorar simulações da plataforma e documentar aprendizados em um repositório compartilhado |
| 3 | Desenvolver e aprofundar habilidades em tecnologias de construção Web | Dividir a equipe em squads com foco técnico, definir sprints para estudo prático de ferramentas web (frameworks, backend, autenticação) e aplicar diretamente na plataforma

<sub>
Fonte: Material produzido pelos autores (2025)
</sub>

</div>

## 2.2. Personas (sprint 1)

<div align = "center">

<sup>Figura 2: Persona "Mariana Lima" (PTD).</sup><br>

<img src="../assets/assets_wad/Mariana Lima Persona.png"><br>

<sub>Fonte: Material produzido pelos autores (2025). </sub><br>

<sup>Figura 2: Persona "Jorge Almeida" (Coordenador).</sup><br>

<img src="../assets/assets_wad/Jorge Persona.png"><br>

<sub>Fonte: Material produzido pelos autores (2025). </sub><br>

## 2.3. User Stories (sprints 1 a 5)

Identificação | US01 (Prioritária)
--- | ---
Persona | Mariana Lima (PTD) 
User Story | “Como PTD, quero buscar rapidamente conteúdos técnicos (vídeos, manuais, infográficos), para resolver dúvidas no campo sem depender do suporte.”
Critério de aceite 1 | CR1: Mariana pode buscar por palavras-chave (ex: “sensor”, “drive”) e obter resultados relevantes em até 2 cliques.
Critério de aceite 2 | CR2: Os conteúdos são apresentados em formatos curtos (até 10 minutos) e com linguagem acessível.
Critério de aceite 3 | CR3: Mariana pode favoritar conteúdos para acesso posterior. (outra US) | 
Critérios INVEST | **Independente**: Não depende de outras funcionalidades como quizzes ou ranking. <br> **Negociável**: Os formatos de conteúdo e filtros podem ser ajustados conforme feedback.<br> **Valorosa**: Reduz o tempo de resolução de dúvidas e evita erros em campo.<br> **Estimável**: Esforço claro (busca, favoritos, sugestão).  <br> **Small**: Foco apenas em busca e exibição de conteúdo. <br> **Testável:** Simulação de buscas e acesso offline.


Identificação| US02 (Prioritária)
--- | ---
Persona |Mariana Lima (PTD)
User Story | “Como PTD, quero receber recomendações de trilhas de aprendizagem baseadas nas minhas deficiências técnicas, para evoluir de forma direcionada.” 
Critério de aceite 1| CR1: Conteúdos são recomendados de acordo com lacunas identificadas no onboarding e desempenho em atividades anteriores na plataforma.
Critério de aceite 2 |CR2: O progresso e o desempenho em cada trilha são exibidos em porcentagem.
Critério de aceite 3 | CR3: Mariana recebe feedback imediato ao completar os módulos.
Critérios INVEST |  **Independente:** Não depende de gamificação ou certificação. <br> **Negociável:** Critérios do diagnóstico podem ser ajustados. <br> **Valorosa:** Foco no aprendizado eficiente. <br> **Estimável:** Diagnóstico e lógica de recomendação são claros.<br> **Small:** Apenas trilhas e feedback. <br> **Testável:** Teste com perfis simulados. 


Identificação |US03 (Prioritária)
--- | --- 
Persona | Mariana Lima (PTD)
User Story | “Como PTD, quero receber um certificado ao concluir uma trilha e ser aprovada em uma avaliação, para comprovar minha capacitação.” 
Critério de aceite 1 | CR1: Certificado é gerado automaticamente após 80% de acerto em um quiz.
Critério de aceite 2 | CR2: Certificado inclui nome, trilha, data e habilidades validadas.
Critério de aceite 3 | CR3: Mariana pode baixar e compartilhar o certificado.
Critérios INVEST | **Independente:** Não depende de ranking ou notificações.<br> **Negociável:** Critérios de aprovação podem variar. <br> **Valorosa:** Comprova capacitação e valoriza o PTD. <br> **Estimável:** Quiz, emissão e histórico são claros. <br> **Small:** Foco em uma trilha por vez. <br> **Testável:** Simulação de aprovação/reprovação.


Identificação|US04 
--- | ---
Persona | Mariana Lima (PTD)
User Story | “Como PTD, quero avaliar e comentar os conteúdos consumidos, para contribuir com a melhoria da plataforma.” 
Critério de aceite 1 | CR1: Mariana pode dar nota e comentar após cada conteúdo.
Critério de aceite 2 | CR2: Feedback é enviado automaticamente aos gestores.
Critério de aceite 3 | CR3: Mariana pode visualizar o histórico de avaliações feitas.
Critério de aceite 4 | CR4: Mariana pode reportar conteúdos desatualizados.


US05 (Prioritária) | Identificação
--- | ---
Persona| Mariana Lima (PTD)
User Story | “Como PTD, quero baixar módulos e vídeos para acessar offline, para não ficar sem suporte em áreas sem internet.” 
Critério de aceite 1 | CR1: Mariana pode selecionar e baixar conteúdos.
Critério de aceite 2 | CR2: Conteúdo baixado é acessível sem conexão.
Critério de aceite 3 | CR3: O sistema indica conteúdos disponíveis offline.
Critério de aceite 4| CR4: Mariana pode remover conteúdos baixados.
Critérios INVEST| <br> **Independente:** Não depende de notificações ou ranking. | <br> **Negociável:** Pode ser implementado para tipos de conteúdo específicos. | <br> **Valorosa:** Garante acesso à capacitação no campo.| <br> **Estimável:** Download, cache e notificação são claros.| <br> **Small:** Foco em download e acesso offline.| <br> **Testável:** Simulação de acesso offline.



Identificação| US06 (Prioritária)
--- | ---
Persona | Jorge Almeida (Coordenador)
User Story | “Como gestor, quero visualizar o progresso de cada PTD nas trilhas de capacitação, para identificar quem precisa de reciclagem.” 
Critério de aceite 1 | CR1: Jorge acessa relatórios individuais e coletivos de progresso.
Critério de aceite 2 | CR2: O sistema envia alertas sobre PTDs com baixo desempenho.
Critério de aceite 3 | CR3: Jorge pode visualizar o histórico de capacitação de cada PTD.
Critério de aceite 4 | CR4: Histórico de trilhas atribuídas fica registrado.
Critérios INVEST |  **Independente:** Não depende de gamificação ou notificações. <br> **Negociável:** Filtros e formatos de exportação podem ser ajustados. <br> **Valorosa:** Permite gestão proativa. <br> **Estimável:** Relatórios, filtros e exportação são claros. <br> **Small:** Relatórios apenas de progresso. <br> **Testável:** Geração e exportação de relatórios simulados.


Identificação | US07
--- | ---
Persona | Jorge Almeida (Coordenador)
User Story | “Como gestor, quero atribuir trilhas de conhecimento a PTDs específicos, para personalizar a capacitação conforme a necessidade.” 
Critério de aceite 1 | CR1: Jorge seleciona trilhas e designa para PTDs.
Critério de aceite 2 | CR2:  PTDs recebem notificação da trilha atribuída.
Critério de aceite 3 | CR3: Histórico de trilhas atribuídas fica registrado.
Critério de aceite 4 | CR4: Jorge pode remover ou alterar trilhas atribuídas.



Identificação | US08
--- | ---
Persona | Jorge Almeida (Coordenador)
User Story | “Como gestor, quero visualizar feedbacks e avaliações dos PTDs sobre os conteúdos, para aprimorar o material de capacitação.” 
Critério de aceite 1 | CR1: Jorge acessa painel com avaliações e comentários dos PTDs.
Critério de aceite 2 | CR2: Pode filtrar feedbacks por conteúdo, data ou nota.
Critério de aceite 3 | CR3: O sistema sugere conteúdos com mais reclamações para revisão.
Critério de aceite 4 | CR4: Jorge pode marcar feedbacks como resolvidos.
Critério de aceite 5 | CR5: Histórico de melhorias realizadas fica disponível.



Identificação | US09
--- | ---
Persona | Jorge Almeida (Coordenador)
User Story | “Como gestor, quero receber alertas automáticos sobre PTDs com baixo desempenho em quizzes, para agir rapidamente.” 
Critério de aceite 1 | CR1: Jorge recebe notificação por e-mail/app quando um PTD falha 3 vezes.
Critério de aceite 2 | CR2: O sistema sugere módulos de reforço.
Critério de aceite 3 | CR3: O histórico de alertas fica disponível.
Critério de aceite 4 | CR4: Jorge pode enviar mensagens de orientação ao PTD.
Critério de aceite 5 | CR5: Alertas podem ser configurados conforme critério.



Identificação | US10
--- | ---
Persona | Jorge Almeida (Coordenador)
User Story | “Como gestor, quero exportar relatórios de progresso e desempenho dos PTDs em formatos PDF e Excel, para compartilhar em reuniões.” 
Critério de aceite 1 | CR1: Jorge pode selecionar período e tipo de relatório.
Critério de aceite 2 | CR2: Relatórios são gerados em PDF ou Excel.
Critério de aceite 3 | CR3: Dados exportados incluem filtros aplicados.
Critério de aceite 4 | CR4: Relatórios podem ser enviados por e-mail.
Critério de aceite 5 | CR5: Histórico de relatórios exportados fica disponível.



# <a name="c3"></a>3. Projeto da Aplicação Web (sprints 1 a 4)

## 3.1. Arquitetura (sprints 3 e 4)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário*

## 3.2. Wireframes (sprint 2)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização)*

## 3.3. Guia de estilos (sprint 3)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução*

### 3.3.1 Cores

*Apresente aqui a paleta de cores, com seus códigos de aplicação e suas respectivas funções*

### 3.3.2 Tipografia

*Apresente aqui a tipografia da solução, com famílias de fontes e suas respectivas funções*

### 3.3.3 Iconografia e imagens 

*(esta subseção é opcional, caso não existam ícones e imagens, apague esta subseção)*

*posicione aqui imagens e textos contendo exemplos padronizados de ícones e imagens, com seus respectivos atributos de aplicação, utilizadas na solução*

## 3.4 Protótipo de alta fidelidade (sprint 3)

*posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização)*

## 3.5. Modelagem do banco de dados (sprints 2 e 4)

### 3.5.1. Modelo relacional (sprints 2 e 4)

*posicione aqui os diagramas de modelos relacionais do seu banco de dados, apresentando todos os esquemas de tabelas e suas relações. Utilize texto para complementar suas explicações, se necessário* 

### 3.5.2. Consultas SQL e lógica proposicional (sprint 2)

*posicione aqui uma lista de consultas SQL compostas, realizadas pelo back-end da aplicação web, com sua respectiva lógica proposicional, descrita conforme template abaixo. Lembre-se que para usar LaTeX em markdown, basta você colocar as expressões entre $ ou $$*

*Template de SQL + lógica proposicional*
#1 | ---
--- | ---
**Expressão SQL** | SELECT * FROM suppliers WHERE (state = 'California' AND supplier_id <> 900) OR (supplier_id = 100); 
**Proposições lógicas** | $A$: O estado é 'California' (state = 'California') <br> $B$: O ID do fornecedor não é 900 (supplier_id ≠ 900) <br> $C$: O ID do fornecedor é 100 (supplier_id = 100)
**Expressão lógica proposicional** | $(A \land B) \lor C$
**Tabela Verdade** | <table> <thead> <tr> <th>$A$</th> <th>$B$</th> <th>$C$</th> <th>$(A \land B)$</th> <th>$(A \land B) \lor C$</th> </tr> </thead> <tbody> <tr> <td>F</td> <td>F</td> <td>F</td> <td>F</td> <td>F</td> </tr> <tr> <td>F</td> <td>F</td> <td>V</td> <td>F</td> <td>V</td> </tr> <tr> <td>F</td> <td>V</td> <td>F</td> <td>F</td> <td>F</td> </tr> <tr> <td>F</td> <td>V</td> <td>V</td> <td>F</td> <td>V</td> </tr> <tr> <td>V</td> <td>F</td> <td>F</td> <td>F</td> <td>F</td> </tr> <tr> <td>V</td> <td>F</td> <td>V</td> <td>F</td> <td>V</td> </tr> <tr> <td>V</td> <td>V</td> <td>F</td> <td>V</td> <td>V</td> </tr> <tr> <td>V</td> <td>V</td> <td>V</td> <td>V</td> <td>V</td> </tr> </tbody> </table>

*Dica: edite a tabela verdade fora do markdown, para ter melhor controle*

## 3.6. WebAPI e endpoints (sprints 3 e 4)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.* 

*Cada endpoint deve conter endereço, método (GET, POST, PUT, PATCH, DELETE), header, body e formatos de response*

# <a name="c4"></a>4. Desenvolvimento da Aplicação Web

## 4.1. Primeira versão da aplicação web (sprint 3)

*Descreva e ilustre aqui o desenvolvimento da sua primeira versão do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar. Indique as eventuais dificuldades e próximos passos.*

## 4.2. Segunda versão da aplicação web (sprint 4)

*Descreva e ilustre aqui o desenvolvimento da sua segunda versão do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar. Indique as eventuais dificuldades e próximos passos.*

## 4.3. Versão final da aplicação web (sprint 5)

*Descreva e ilustre aqui o desenvolvimento da última versão do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar. Indique as eventuais dificuldades e próximos passos.*

# <a name="c5"></a>5. Testes

## 5.1. Relatório de testes de integração de endpoints automatizados (sprint 4)

*Liste e descreva os testes unitários dos endpoints criados, automatizados e planejados para sua solução. Posicione aqui também o relatório de cobertura de testes Jest se houver (através de link ou transcrito para estrutura markdown)*

## 5.2. Testes de usabilidade (sprint 5)

*Posicione aqui as tabelas com enunciados de tarefas, etapas e resultados de testes de usabilidade. Ou utilize um link para seu relatório de testes (mantenha o link sempre público para visualização)*

# <a name="c6"></a>6. Estudo de Mercado e Plano de Marketing (sprint 4)

## 6.1 Resumo Executivo

*Preencher com até 300 palavras, sem necessidade de fonte*

*Apresente de forma clara e objetiva os principais destaques do projeto: oportunidades de mercado, diferenciais competitivos da aplicação web e os objetivos estratégicos pretendidos.*

## 6.2 Análise de Mercado

*a) Visão Geral do Setor (até 250 palavras)*
*Contextualize o setor no qual a aplicação está inserida, considerando aspectos econômicos, tecnológicos e regulatórios. Utilize fontes confiáveis.*

*b) Tamanho e Crescimento do Mercado (até 250 palavras)*
*Apresente dados quantitativos sobre o tamanho atual e projeções de crescimento do mercado. Utilize fontes confiáveis.*

*c) Tendências de Mercado (até 300 palavras)*
*Identifique e analise tendências relevantes (tecnológicas, comportamentais e mercadológicas) que influenciam o setor. Utilize fontes confiáveis.*

## 6.3 Análise da Concorrência

*a) Principais Concorrentes (até 250 palavras)*
*Liste os concorrentes diretos e indiretos, destacando suas principais características e posicionamento no mercado.*

*b) Vantagens Competitivas da Aplicação Web (até 250 palavras)*
*Descreva os diferenciais da sua aplicação em relação aos concorrentes, sem necessidade de citação de fontes.*


## 6.4 Público-Alvo

*a) Segmentação de Mercado (até 250 palavras)*
Descreva os principais segmentos de mercado a serem atendidos pela aplicação. Utilize bases de dados e fontes confiáveis.*

*b) Perfil do Público-Alvo (até 250 palavras)*
*Caracterize o público-alvo com dados demográficos, psicográficos e comportamentais, incluindo necessidades específicas. Utilize fontes obrigatórias.*


## 6.5 Posicionamento

*a) Proposta de Valor Única (até 250 palavras)*
*Defina de maneira clara o que torna a sua aplicação única e valiosa para o mercado.*

*b) Estratégia de Diferenciação (até 250 palavras)*
*Explique como sua aplicação se destacará da concorrência, evidenciando a lógica por trás do posicionamento.*

## 6.6 Estratégia de Marketing 

*a) Produto/Serviço (até 200 palavras)*
*Descreva as funcionalidades, benefícios e diferenciais da aplicação*

*6.2 Preço (até 200 palavras)*
*Explique o modelo de precificação adotado e justifique com base nas análises anteriores.*

*6.3 Praça (Distribuição) (até 200 palavras)*
*Apresente os canais digitais utilizados para distribuir e entregar a aplicação ao público.*

*6.4 Promoção (até 200 palavras)*
*Descreva as estratégias digitais planejadas, como SEO, redes sociais, marketing de conteúdo e campanhas pagas.*

# <a name="c7"></a>7. Conclusões e trabalhos futuros (sprint 5)

*Escreva de que formas a solução da aplicação web atingiu os objetivos descritos na seção 2 deste documento. Indique pontos fortes e pontos a melhorar de maneira geral.*

*Relacione os pontos de melhorias evidenciados nos testes com planos de ações para serem implementadas. O grupo não precisa implementá-las, pode deixar registrado aqui o plano para ações futuras*

*Relacione também quaisquer outras ideias que o grupo tenha para melhorias futuras*

# <a name="c8"></a>8. Referências (sprints 1 a 5)

<a name="c10">[1]</a> CLIMATE FIELDVIEW. Plataforma de Agricultura Digital. Disponível em: https://climatefieldview.com.br/. Acesso: 20/04/2025.​

<a name="c11">[2]</a> CLIMATE FIELDVIEW. Plataforma de agricultura digital. Disponível em: https://climatefieldview.com.br/. Acesso: 20/04/2025.

<a name="c12">[3]</a> LUCK, Heloisa. Liderança em gestão escolar. 4. ed. Petrópolis: Vozes, 2010. Acesso: 24/02/2025. <br>

<a name="c13">[4]</a> PAES, Ashley. Agtechs: entenda o panorama das startups latino-americanas do agronegócio. Distrito, 19 dez. 2023. Disponível em: https://distrito.me/blog/panorama-agtech-brasil/​. Acesso em: 22/04/2025.​

<a name="c14">[5]</a> GUSMÃO, Ana. Agronegócio se rende à tecnologia e aposta em soluções criadas por startups. CompreRural, 2 out. 2023. Disponível em: https://www.comprerural.com/agronegocio-se-rende-a-tecnologia-e-aposta-em-solucoes-criadas-por-startups​. Acesso: 22/04/2025.

<a name="c15">[6]</a> PEREA, Ernesto. 4 transnacionales concentran 50% del mercado global de plaguicidas. Imagen Agropecuaria, 11 jun. 2024. Disponível em: https://imagenagropecuaria.com/2024/4-transnacionales-concentran-50-del-mercado-global-de-plaguicidas/​. Acesso em: 22/04/2025.


<a name="c16">[7]</a> ANDRADE, Lívia. A alavanca para o agro nacional. Revista Exame, 10 nov. 2023. Disponível em: https://exame.com/revista-exame/a-alavanca-para-o-agro-nacional/​. Acesso: 22/04/2025.

<a name="c13">[X]</a> MARSHALL, A. Industry and Trade. 3ª edição, Londres, 1920.

INTELI. Adalove. Disponível em: https://adalove.inteli.edu.br/feed. Acesso em: 15/04/2025. <br>

# <a name="c9"></a>Anexos

*Inclua aqui quaisquer complementos para seu projeto, como diagramas, imagens, tabelas etc. Organize em sub-tópicos utilizando headings menores (use ## ou ### para isso)*
