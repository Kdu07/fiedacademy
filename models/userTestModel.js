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

exports.getTestById = async (id) => {
  const res = await db.query('SELECT * FROM tests WHERE id = $1', [id]);
  return res.rows[0];
}

exports.getTestByModuleId = async (testId) => {
  const sql = `
    SELECT 
      t.*,
      m.title AS module_name
    FROM tests t
    JOIN modules m ON t.id_module = m.id
    WHERE t.id_module = $1
  `;
  const res = await db.query(sql, [testId]);
  return res.rows[0];
}

exports.userDoneTest = async (userId, testId) => {
    const res = await db.query('SELECT * FROM user_test_score WHERE id_user = $1 AND id_test = $2', [userId, testId]);
    if(res.rows.length > 0) {
        return true; // User has already taken the test
    }
    return false; // User has not taken the test
}

exports.finishTest = async (userId, testId, score) => {
    const sql = `INSERT INTO user_test_score (id_user, id_test, score) VALUES ($1, $2, $3);`;
    await db.query(sql, [userId, testId, score]);
    return;
}