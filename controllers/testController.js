const { isAuthorized } = require("../utils/authUtils");
const { getUserId } = require("../utils/jwtUtils");

const usersModel = require("../models/usersModel");
const testModel = require("../models/userTestModel");

exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "PTD");

  if (auth === false) {
    return res.redirect("/");
  }
  const id = await getUserId(token);
  const testId = req.params.id;
  const test = await testModel.getTestByModuleId(testId);

  const doneTest = await testModel.userDoneTest(id, test.id);

  if (doneTest) {
    // Se for admin n redireciona se já fez o teste
    const userIsAdmin = await isAuthorized(token, "Admin");
    if (!userIsAdmin) {
      return res.redirect("/");
    }
  }

  const user = await usersModel.getById(id);

  test.questions = JSON.parse(test.questions);
  test.questions.forEach((question) => {
    delete question.correctAnswer;
  });

  res.render("test", { user, test });
};

exports.createTest = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.status(403).send("Acesso negado");
  }
};

exports.handleSubmit = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "PTD");

  if (auth === false) {
    return res.status(403).send("Acesso negado");
  }
  const userId = await getUserId(token);
  const user = await usersModel.getRole(userId);

  const testId = req.params.id;
  const doneTest = await testModel.userDoneTest(userId,testId);
  if (doneTest) {
   return res.redirect("/");
  }

  const test = await testModel.getTestById(testId);

  test.questions = JSON.parse(test.questions);

  const answers = req.body;

  let earnedPoints = 0;

  test.questions.forEach((question, index) => {
    const questionNumber = index + 1;
    const answerId = `q${questionNumber}`;
    const questionPoints = parseInt(question.points || 0);

    let userAnswer = answers[answerId];
    if (userAnswer === "true" || userAnswer === "false") {
      userAnswer = userAnswer === "true";
    }

    if (userAnswer !== undefined && userAnswer == question.correctAnswer) {
      earnedPoints += questionPoints;
    }
  });

  testModel.finishTest(userId, test.id, earnedPoints);

  console.log(user)

  return res.render("testSubmitted", {
    user,
    earnedPoints,
    testTitle: test.title,
  });
};
