const pool = require('../config/db');

module.exports.getAll = async () => {
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
        ORDER BY bookmarks.saved_at DESC
    `);
    return result.rows;
};

module.exports.deleteById = async (id) => {
    await pool.query('DELETE FROM bookmarks WHERE id = $1',
     [id])
};

