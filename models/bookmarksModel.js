const pool = require('../config/db');

module.exports.getAll = async () => {
    const result = await pool.query(`
        SELECT 
            bookmarks.id,
            contents.title AS contents_title,
            path.title AS path_title,
            bookmarks.saved_at
        FROM bookmarks
        JOIN contents ON bookmarks.id_content = contents.id
        JOIN module ON content.module_id = module.id
        JOIN path ON module.id_path = path.id
        ORDER BY bookmarks.saved_at DESC
    `);
    return result.rows;
};