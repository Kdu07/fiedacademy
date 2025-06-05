const usersModel = require("../models/usersModel");
const userContentModel = require("../models/userContentModel");


exports.index = async (req, res) => {
    const userId = 27 // req.params.userId;
    
    const users = await usersModel.getAll();
    const ranking = usersModel.getUsersRanking(users);
    const user = await usersModel.getById(userId)
    const progress = await userContentModel.getUserPathsProgress(userId);
    // FALTAM AS NOTAS DOS MODULOS E MÉDIA

    console.log(user)
    console.log("--------------------------------------------")
    console.log(ranking)
    console.log("--------------------------------------------")
    console.log(progress)

    // res.render("dashboard", { user, ranking, progress });
};

this.index();


// users ✅
    // Ficha: byID 
    // Ranking: getAll (comparar score dos users)
// paths ✅
    // Progresso da trilha: 
        // 100%: pathID -> modules (contagem de modules que tem aquele pathID)
        // user%: userID -> user_content_progress - modules - paths (contagem de módulos que o PTD completou)
// user_test_score
    // Nota dos módulos: userID -> tests - user_test_score - modules
    // Média: userID -> tests - user_test_score - modules