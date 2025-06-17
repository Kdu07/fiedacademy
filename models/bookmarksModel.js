const pool = require('../config/db');

module.exports.getAll = async (userId) => {
    const result = await pool.query(`
        SELECT 
            bookmarks.id,
            contents.title AS contents_title,
            paths.title AS path_title,
            bookmarks.saved_at
        FROM bookmarks
        JOIN contents ON bookmarks.id_content = contents.id
        JOIN modules ON contents.module_id = modules.id
        JOIN paths ON modules.id_path = paths.id
        WHERE bookmarks.id_user = $1
        ORDER BY bookmarks.saved_at DESC
    `, [userId]);
    return result.rows;
};

module.exports.deleteById = async (id) => {
    await pool.query('DELETE FROM bookmarks WHERE id = $1',
     [id])
};

module.exports.insert = async (userId, contentId) => {
  await pool.query(`
    INSERT INTO bookmarks (id_user, id_content, saved_at)
    SELECT $1, $2, NOW()
    WHERE NOT EXISTS (
      SELECT 1 FROM bookmarks WHERE id_user = $1 AND id_content = $2
    )
  `, [userId, contentId]);
};

module.exports.getByModuleId = async (userId, contentId) => {
  const res = await pool.query("SELECT * FROM bookmarks WHERE id_user = $1 AND id_content = $2", [userId,contentId]);
  return res.rows[0];
}