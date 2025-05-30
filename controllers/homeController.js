const pool = require('../config/db');

exports.index = async (req, res) => {
  const userId = 1; // Supondo que você salva o id do usuário na sessão

  try {
    // Buscar paths (trilhas) e progresso do usuário
    const pathsResult = await pool.query(`
      SELECT
        p.id,
        p.title,
        p.description,
        COALESCE(
          ROUND(
            100.0 * COUNT(DISTINCT ucp.content_id) / NULLIF(SUM(mc.content_count), 0)
          , 0), 0
        ) AS progresso
      FROM path p
      LEFT JOIN module mod ON mod.id_path = p.id
      LEFT JOIN (
        SELECT module_id, COUNT(*) as content_count
        FROM content
        GROUP BY module_id
      ) mc ON mc.module_id = mod.id
      LEFT JOIN user_content_progress ucp ON ucp.module_id = mod.id AND ucp.user_id = $1
      GROUP BY p.id, p.title, p.description
      ORDER BY p.id
    `, [userId]);

    // Buscar bookmarks do usuário
    const bookmarksResult = await pool.query(`
      SELECT c.id, c.doc_path, c.video_path, c.img_path, c.highlight, m.title as module_title
      FROM bookmarks b
      JOIN content c ON c.id = b.id_content
      JOIN module m ON m.id = c.module_id
      WHERE b.id_user = $1
      ORDER BY b.saved_at DESC
      LIMIT 6
    `, [userId]);

    res.render('pages/home', {
      paths: pathsResult.rows.map(row => ({
        id: row.id,
        nome: row.title,
        progresso: row.progresso
      })),
      bookmarks: bookmarksResult.rows.map(row => ({
        titulo: row.doc_path ? `Artigo: ${row.doc_path}` : row.video_path ? `Vídeo: ${row.video_path}` : 'Conteúdo',
        module: row.module_title
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao carregar a home');
  }
};