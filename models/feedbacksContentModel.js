const db = require('../config/db');

exports.getAllPositiveByModuleId = async (id) => {
  try {
    const type = true; // True = positivo
    const res = await db.query('SELECT * FROM feedbacks_content_module WHERE id = $1 AND value = 2$', [id, type]);
    return res.rows;
  } catch (error) {
    console.error('Erro ao buscar feedback: ', error);
    return [];
  }
};

exports.getAllNegativeByModuleId = async (id) => {
  try {
    const type = true; // false = negativo
    const res = await db.query('SELECT * FROM feedbacks_content_module WHERE id = $1 AND value = 2$', [id, type]);
    return res.rows;
  } catch (error) {
    console.error('Erro ao buscar feedback: ', error);
    return [];
  }
};
