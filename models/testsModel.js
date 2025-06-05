const model = require('./usersModel');

async function testRanking() {
  const ranking = await model.getUsersRanking();
  console.log(ranking);
}

testRanking();