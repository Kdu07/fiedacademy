const db = require('../config/db');

exports.getUserModuleScores = async (userId) => {
    const sql = `
      SELECT 
      m.id AS module_id,
      m.title AS module_title,
      t.id AS test_id,
      uts.score AS user_score
      FROM modules m
      INNER JOIN tests t ON t.id_module = m.id
      INNER JOIN user_test_score uts ON uts.id_test = t.id AND uts.id_user = $1
      ORDER BY m.title;
    `;

    const result = await db.query(sql, [userId]);
    return result.rows;
}