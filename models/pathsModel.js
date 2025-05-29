// Model da tabela paths
const db = require('../config/db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM path');
  return res.rows;
};

exports.getById = async (id) => {
  const res = await db.query('SELECT * FROM path WHERE id = $1', [id]);
  return res.rows[0];
};