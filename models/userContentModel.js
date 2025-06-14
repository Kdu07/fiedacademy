const db = require("../config/db");

exports.getUserPathsProgress = async (userId) => {
  const sql =
    "SELECT p.id AS path_id, p.title AS path_title, " +
    "COUNT(c.id) AS total_contents, " +
    "COUNT(DISTINCT ucp.content_id) AS completed_contents, " +
    "CASE WHEN COUNT(c.id) = 0 THEN 0 ELSE ROUND(COUNT(DISTINCT ucp.content_id) * 100.0 / COUNT(c.id), 2) END AS progress_percentage " +
    "FROM paths p " +
    "LEFT JOIN modules m ON m.id_path = p.id " +
    "LEFT JOIN contents c ON c.module_id = m.id " +
    "LEFT JOIN user_content_progress ucp ON ucp.content_id = c.id AND ucp.user_id = $1 " +
    "GROUP BY p.id, p.title " +
    "ORDER BY p.title;";

  const res = await db.query(sql, [userId]);
  return res.rows.map((row) => ({
    ...row,
    progress_percentage: Number(row.progress_percentage),
  }));
};
