const usersModel = require("../models/usersModel");
const userContentModel = require("../models/userContentModel");
const userTestModel = require("../models/userTestModel");

const { getUserId } = require("../utils/jwtUtils");


exports.index = async (req, res) => {
  const token = req.cookies.token; // Get the token from cookies
  const userId = await getUserId(token);

  const user = await usersModel.getById(userId);
  const ranking = await usersModel.getUsersRanking();
  const userRank = ranking.findIndex((u) => u.id === userId) + 1; // Find the user's rank
  const progress = await userContentModel.getUserPathsProgress(userId);
  const moduleScores = await userTestModel.getUserModuleScores(userId);

  const lastLogin = new Date(user.last_login).toLocaleDateString("pt-BR");

  console.log(moduleScores)

  progress.sort((a, b) => b.progress_percentage - a.progress_percentage);

  res.render("profile", { user, userRank, progress: progress || [], moduleScores, lastLogin });
};

// EXEMPLO DE DADOS DO CONTROLLER:
/*
[
  [
    {
      id: 27,
      id_role: 4,
      name: 'Cafael Rabral',
      region: 'São José dos Campos',
      email: 'ptd@legal.com',
      password: '$2b$10$hP1TRfK.60ky./QmGD81E.bE.28uu1TxYE4mP799shJ7rk4ScU93q',
      score: 0,
      last_login: null,
      profile_photo_path: null
    }
  ],
  Promise { [ [Object], [Object], [Object] ] },
  [
    {
      path_id: 4,
      path_title: 'Avançado',
      total_contents: '0',
      completed_contents: '0',
      progress_percentage: '0'
    },
    {
      path_id: 2,
      path_title: 'Básico',
      total_contents: '2',
      completed_contents: '1',
      progress_percentage: '50.00'
    },
    {
      path_id: 5,
      path_title: 'Help',
      total_contents: '0',
      completed_contents: '0',
      progress_percentage: '0'
    },
    {
      path_id: 3,
      path_title: 'Intermediário',
      total_contents: '1',
      completed_contents: '0',
      progress_percentage: '0.00'
    },
    {
      path_id: 1,
      path_title: 'Onboarding',
      total_contents: '5',
      completed_contents: '2',
      progress_percentage: '40.00'
    }
  ],
  [
    {
      module_id: 1,
      module_title: 'Plantio',
      test_id: 3,
      user_score: 85
    }
  ]
]
*/
