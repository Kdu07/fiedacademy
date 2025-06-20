const db = require('../config/db');

exports.getAll = async () => {
  try {
    const res = await db.query('SELECT * FROM subjects_help');
    return res.rows;
  } catch (error) {
    console.error('Erro ao buscar artigos de ajuda:', error);
    return [];
  }
};

exports.create = async ({ title, description, icon }) => {
  try {
    const result = await db.query(
      'INSERT INTO help_articles (title, description, icon) VALUES ($1, $2, $3) RETURNING *',
      [title, description, icon]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao criar artigo de ajuda:', error);
    return null;
  }
};

exports.getById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM help_articles WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao buscar artigo por ID:', error);
    return null;
  }
};