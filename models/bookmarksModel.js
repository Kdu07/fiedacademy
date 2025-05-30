// Model da tabela bookmarks
const db = require('../config/db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM bookmarks'); // Busca todos os bookmarks
  return res.rows;
};