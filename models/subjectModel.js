
const db = require('../config/db');

exports.getSubjectWithModules = async (subjectId) => {
  // Busca a trilha
  const pathResult = await db.query('SELECT title, description, id FROM subecjts_help WHERE id = $1', [subjectId]);
  if (pathResult.rows.length === 0) throw new Error('Trilha não encontrada');

  const pathData = pathResult.rows[0]; 
}

