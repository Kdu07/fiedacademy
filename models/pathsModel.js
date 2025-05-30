// models/path.model.js

const db = require('../config/db');

// Fetch a path and its modules usando pool
async function getPathWithModules(pathId) {
  // Buscar o path
  const pathResult = await db.query(
    'SELECT id, title, description FROM path WHERE id = $1',
    [pathId]
  );
  if (pathResult.rows.length === 0) {
    throw new Error('Path não encontrado');
  }
  const pathData = pathResult.rows[0];

  // Buscar os módulos do path
  const modulesResult = await db.query(
    'SELECT id, title, "order" FROM module WHERE id_path = $1 ORDER BY "order" ASC',
    [pathId]
  );
  const modulesData = modulesResult.rows;

  // Montar o objeto no formato esperado
  const path = {
    name: pathData.title,
    description: pathData.description,
    modules: modulesData.map(module => ({
      name: module.title,
      progress: 0,
      link: `/content/${module.id}`
    }))
  };

  return path;
}

module.exports = { getPathWithModules };
