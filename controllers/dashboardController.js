const usersModel = require("../models/usersModel");
const testModel = require("../models/userTestModel");
const userContentModel = require("../models/userContentModel");
const userTestModel = require("../models/userTestModel");


const { getUserId } = require("../utils/jwtUtils");
const { isAuthorized } = require("../utils/authUtils");

exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Gestor");

  if (auth === false) {
    return res.redirect("/");
  }

  // Verifica se a query de ordenação foi passada, caso contrário, define como vazio
  const order = req.query.order || "";

  // Verifica se apenas algumas regiões foram selecionadas
  const selectedRegions = req.query.regions
    ? Array.isArray(req.query.regions)
      ? req.query.regions
      : [req.query.regions]
    : [];

  const userId = await getUserId(token);
  const user = await usersModel.getRole(userId);

  const all_Users = await usersModel.getAllPTD(order);

  let ptd_users = all_Users;
  // Filtra por regiões se alguma foi selecionada
  if (selectedRegions.length !== 0) {
    ptd_users = all_Users.filter((user) =>
      selectedRegions.includes(user.region)
    );
  }

  // Process users with Promise.all to properly handle async operations
  await Promise.all(
    ptd_users.map(async (user) => {
      const userGrade = await testModel.getUserTests(user.id);
      user.roundedScore = user.score / userGrade.length || 0;
      return user;
    })
  );

  // Calculate average score after processing all users
  let mediumScore = 0;
  ptd_users.forEach((user) => {
    mediumScore += user.roundedScore;
  });

  const averageScore =
    ptd_users.length > 0 ? Math.round(mediumScore / ptd_users.length) : 0;
  const percentage = Math.min(100, Math.max(0, (averageScore / 100) * 100));

  const dashOffset = 283 - (283 * percentage) / 100;

  return res.render("dashboard", {
    user,
    ptd_users,
    all_Users,
    order,
    averageScore,
    dashOffset,
    percentage,
    selectedRegions,
  });
};
