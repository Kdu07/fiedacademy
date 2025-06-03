// Model da tabela paths
const db = require('../config/db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM paths');
  return res.rows;
};

exports.getById = async (id) => {
  const res = await db.query('SELECT * FROM paths WHERE id = $1', [id]);
  return res.rows[0];
};

// Busca uma trilha e seus módulos
exports.getPathWithModules = async (pathId) => {
  // Busca a trilha
  const pathResult = await db.query('SELECT id, title, description FROM paths WHERE id = $1', [pathId]);
  if (pathResult.rows.length === 0) throw new Error('Trilha não encontrada');

  const pathData = pathResult.rows[0];

  // Busca os módulos da trilha
  const moduleResult = await db.query('SELECT id, title, "order" FROM modules WHERE id_path = $1 ORDER BY "order" ASC', [pathId]);
  const moduleData = moduleResult.rows;

  // Monta o objeto no formato esperado pela view
const path = {
  id: pathData.id,
  title: pathData.title,
  description: pathData.description,
  modules: moduleData.map(m => ({
    id: m.id,
    title: m.title,
    order: m.order,
    progresso: m.progresso // ou 0, se não tiver progresso real
  }))
};

  return path;
};

// Teste isolado
if (require.main === module) {
  (async () => {
    try {
      const result = await exports.getPathWithModules(1); // troque o id conforme necessário
      console.log(result);
    } catch (err) {
      console.error('Erro:', err.message);
    } finally {
      // Encerra a conexão com o banco ao terminar o teste
      db.connect().then(client => client.release());
      // Ou, se você quiser encerrar o pool inteiro:
      // db.end && db.end();
    }
  })();
}