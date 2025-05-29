// Model da tabela paths
const db = require('../config/db');

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM path');
  console.log(res.rows)
  return res.rows;
};

exports.getById = async (id) => {
  const res = await db.query('SELECT * FROM path WHERE id = $1', [id]);
  console.log(res.rows[0])
  return res.rows[0];
};