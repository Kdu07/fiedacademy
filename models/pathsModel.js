// Model da tabela paths
const db = require("../config/db");

exports.getAll = async () => {
  const res = await db.query("SELECT * FROM paths");
  return res.rows;
};

exports.getById = async (id) => {
  const res = await db.query("SELECT * FROM paths WHERE id = $1", [id]);
  return res.rows[0];
};

// Busca uma trilha e seus módulos
exports.getPathWithModules = async (pathId, userId) => {
  // Busca a trilha
  const pathResult = await db.query(
    "SELECT id, title, description FROM paths WHERE id = $1",
    [pathId]
  );
  if (pathResult.rows.length === 0) throw new Error("Trilha não encontrada");

  const pathData = pathResult.rows[0];

  // Busca os módulos da trilha
  const sqlModule = `SELECT id, title, module_order 
    FROM modules
    WHERE id_path = $1 
    ORDER BY module_order ASC
  `;
  const moduleResult = await db.query(sqlModule, [pathId]);
  const moduleData = moduleResult.rows;

  // Get content counts for each module
  const contentCountSql = `
    SELECT module_id, COUNT(*) as total_contents
    FROM contents
    WHERE module_id IN (SELECT id FROM modules WHERE id_path = $1)
    GROUP BY module_id
  `;
  const contentCountResult = await db.query(contentCountSql, [pathId]);
  
  // Map of module_id to total content count
  const contentCountMap = {};
  contentCountResult.rows.forEach(row => {
    contentCountMap[row.module_id] = parseInt(row.total_contents);
  });

  // Get user's completed contents
  const progressSql = `
    SELECT content_id, module_id
    FROM user_content_progress
    WHERE user_id = $1 AND path_id = $2
  `;
  const progressResult = await db.query(progressSql, [userId, pathId]);

  // Count completed contents per module
  const moduleProgress = {};
  progressResult.rows.forEach(row => {
    if (row.module_id) {
      if (!moduleProgress[row.module_id]) {
        moduleProgress[row.module_id] = 0;
      }
      moduleProgress[row.module_id]++;
    }
  });

  // Monta o objeto no formato esperado pela view
  const path = {
    id: pathData.id,
    title: pathData.title,
    description: pathData.description,
    modules: moduleData.map((m) => {
      const totalContents = contentCountMap[m.id] || 0;
      const completedContents = moduleProgress[m.id] || 0;
      const progressPercentage = totalContents > 0 
        ? Math.round((completedContents / totalContents) * 100)
        : 0;
        
      return {
        id: m.id,
        title: m.title,
        order: m.order,
        completed: completedContents === totalContents && totalContents > 0, // true only if all contents are completed
        progress: progressPercentage,
        completedContents: completedContents,
        totalContents: totalContents
      };
    }),
  };

  return path;
};
