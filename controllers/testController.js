const { isAuthorized } = require("../utils/authUtils");
const { getUserId } = require("../utils/jwtUtils");

const usersModel = require("../models/usersModel");
const testModel = require("../models/userTestModel");
const { parse } = require("dotenv");

exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "PTD");

  if (auth === false) {
    return res.redirect("/home");
  }
  const id = await getUserId(token);
  const testId = req.params.id;
  const test = await testModel.getTestByModuleId(testId);

  const doneTest = await testModel.userDoneTest(id, test.id);

  if (doneTest) {
    // Se for admin n redireciona se já fez o teste
    const userIsAdmin = await isAuthorized(token, "Admin");
    if (!userIsAdmin) {
      return res.redirect("/home");
    }
  }

  const user = await usersModel.getById(id);

  let totalPoints = 0;

  test.questions = JSON.parse(test.questions);
  test.questions.forEach((question) => {
    totalPoints += parseInt(question.points || 0);
    delete question.correctAnswer;
  });

  res.render("test", { user, test, totalPoints });
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
  const doneTest = await testModel.userDoneTest(userId, testId);
  if (doneTest) {
    return res.redirect("/home");
  }

  const test = await testModel.getTestById(testId);

  if(test.questions === null || test.questions === undefined || test.questions === "[]") {
    return res.status(400).send("Teste não encontrado ou sem perguntas.");
  }

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
      question.answeredCorrectly = true;
      question.userAnswer = userAnswer;
      earnedPoints += questionPoints;
    } else {
      question.answeredCorrectly = false;
      question.userAnswer = userAnswer;
    }
  });

  await testModel.finishTest(userId, test.id, earnedPoints);

  await usersModel.addScore(userId, earnedPoints);

  return res.render("testSubmitted", {
    user,
    earnedPoints,
    testTitle: test.title,
    questions: test.questions,
  });
};

exports.createTest = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.status(403).send("Acesso negado");
  }

  const userId = await getUserId(token);
  const user = await usersModel.getRole(userId);
};

exports.editTest = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.status(403).send("Acesso negado");
  }
  const testModuleId = req.params.id;

  const test = await testModel.getTestByModuleId(testModuleId);

  const userId = await getUserId(token);
  const user = await usersModel.getRole(userId);

  test.questions = JSON.parse(test.questions);

  return res.render("editTest", { user, test });
};

exports.updateTest = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.status(403).send("Acesso negado");
  }

  const testId = req.params.id;
  const { title, estimated_time, questions, description } = req.body;

  await testModel.editTest(testId, title, estimated_time, questions, description);

  return res.redirect('/contentDashboard/tests');
};
