const db = require('../config/db');

exports.getAllByModuleId = async (id, type) => {
  try {

    const res = await db.query('SELECT id FROM feedbacks_content_module WHERE id_content = $1 AND value = $2', [id, type]);
    return res.rows;
  } catch (error) {
    console.error('Erro ao buscar feedback: ', error);
    return [];
  }
};


