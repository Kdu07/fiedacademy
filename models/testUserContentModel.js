const progressModel = require('./userContentModel'); // ajuste o caminho

async function testProgress() {
  try {
    const userId = 27;
    const progress = await progressModel.getUserPathsProgress(userId);
    console.log('Progresso do usuário:', progress);
  } catch (error) {
    console.error('Erro ao buscar progresso:', error);
  }
}

testProgress();