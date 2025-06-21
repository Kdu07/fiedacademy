const db = require("../config/db");
const { get } = require("../routes/helpRoutes");
const { getAll } = require("./usersModel");

// Exporta um objeto com métodos para acessar dados de módulos e conteúdos no banco de dados
module.exports = {
  // Busca um módulo pelo seu ID
  async findModule(moduleId) {
    const result = await db.query(`
       SELECT 
          c.*,
          m.title AS module_title
         FROM 
          contents c
         LEFT JOIN 
          modules m ON c.module_id = m.id
         WHERE c.id = $1`, [moduleId]);
    console.log(result.rows);
    return result.rows[0]; // Retorna o primeiro resultado encontrado
  },

  async getModuleUrl(contentId) {
    // Use a JOIN to get both content and path information in a single query
    const result = await db.query(
      `SELECT 
      c.content_order, 
      c.module_id, 
      m.id_path AS path_id
     FROM 
      contents c
     JOIN 
      modules m ON c.module_id = m.id
     WHERE 
      c.id = $1`,
      [contentId]
    );

    // Handle potential error case where content doesn't exist
    if (result.rows.length === 0) {
      return null;
    }

    const { content_order, module_id, path_id } = result.rows[0];
    const url = `/path/${path_id}/module/${module_id}/page/${content_order}`;

    return url;
  },

  // Busca o conteúdo de um módulo por ordem da página e ID do módulo
  async findModuleContentByOrder(content_order, module_id) {
    const result = await db.query(
      "SELECT * FROM contents WHERE content_order = $1 AND module_id = $2",
      [content_order, module_id]
    );
    return result.rows[0]; // Retorna o conteúdo correspondente à página e módulo
  },

  // Busca todas as páginas de conteúdo de um módulo, ordenadas por número da página
  async findAllModuleContent(module) {
    const result = await db.query(
      "SELECT content_order, id FROM contents WHERE module_id = $1 ORDER BY content_order",
      [module]
    );
    return result.rows; // Retorna um array com as páginas do módulo
  },

  async getAllContents() {
    try {
      const result = await db.query(
        `SELECT 
          c.id, 
          c.title, 
          c.category, 
          c.video_path, 
          c.last_update, 
          c.module_id,
          m.title AS module_title
         FROM 
          contents c
         LEFT JOIN 
          modules m ON c.module_id = m.id
         ORDER BY 
          c.id`
      );
      return result.rows; // Retorna todos os módulos disponíveis
    } catch (error) {
      console.error("Error fetching all modules:", error);
      throw new Error("Erro ao buscar módulos");
    }
  },

  async getAllModules() {
    try {
      const result = await db.query(
        "SELECT * FROM modules ORDER BY id"
      );
      return result.rows; // Retorna todos os módulos disponíveis
    } catch (error) {
      console.error("Error fetching all modules:", error);
      throw new Error("Erro ao buscar módulos");
    }
  } 
};
