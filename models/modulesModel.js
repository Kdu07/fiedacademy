const db = require("../config/db");

// Exporta um objeto com métodos para acessar dados de módulos e conteúdos no banco de dados
module.exports = {
  // Busca um módulo pelo seu ID
  async findModule(moduleId) {
    const result = await db.query(
      `
       SELECT 
          c.*,
          m.title AS module_title
         FROM 
          contents c
         LEFT JOIN 
          modules m ON c.module_id = m.id
         WHERE c.id = $1`,
      [moduleId]
    );
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

  async findModuleById(module_id) {
    const result = await db.query("SELECT * FROM modules WHERE id = $1", [
      module_id,
    ]);
    return result.rows[0]; // Retorna o conteúdo correspondente à página e módulo
  },

  async updateModuleById(module_id, title, id_path) {
    const result = await db.query(
      "UPDATE modules SET title = $2, id_path = $3 WHERE id = $1",
      [module_id, title, id_path]
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

  async createModule(title,id_path, order) {
    try {
      const result = await db.query(
        `INSERT INTO modules (id_path, title, module_order) 
        VALUES ($1, $2, $3)`,
        [id_path, title, order]
      );
      return result.rows[0]; // Retorna o módulo criado
    } catch (error) {
      console.error("Error creating module:", error);
      throw new Error("Erro ao criar módulo");
    }
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
          c.last_update DESC`
      );
      return result.rows; // Retorna todos os módulos disponíveis
    } catch (error) {
      console.error("Error fetching all modules:", error);
      throw new Error("Erro ao buscar módulos");
    }
  },

  async getAllModules() {
    try {
      const result = await db.query(`
        SELECT 
          m.*,
          p.title AS path_title
         FROM 
          modules m
         LEFT JOIN 
          paths p ON m.id_path = p.id
         ORDER BY
          m.id
        `);
      return result.rows; // Retorna todos os módulos disponíveis
    } catch (error) {
      console.error("Error fetching all modules:", error);
      throw new Error("Erro ao buscar módulos");
    }
  },

  async createContent(body, title, category, module_id, video_path, order) {
    try {
      const result = await db.query(
        `INSERT INTO contents (body, title, category, module_id, video_path, last_update, content_order) 
         VALUES ($1, $2, $3, $4, $5, NOW(), $6)`,
        [body, title, category, module_id, video_path, order]
      );
      return result.rows[0]; // Retorna o conteúdo criado
    } catch (error) {
      console.error("Error creating content:", error);
      throw new Error("Erro ao criar conteúdo");
    }
  },

  async updateContentById(id, body, title, category, module_id, video_path) {
    try {
      const result = await db.query(
        `UPDATE contents 
         SET body = $1, title = $2, category = $3, module_id = $4, video_path = $5, last_update = NOW() 
         WHERE id = $6 
         RETURNING *`,
        [body, title, category, module_id, video_path, id]
      );
      return result.rows[0]; // Retorna o conteúdo atualizado
    } catch (error) {
      console.error("Error updating content:", error);
      throw new Error("Erro ao atualizar conteúdo");
    }
  },

  async deleteContentById(id) {
    try {
      const result = await db.query("DELETE FROM contents WHERE id = $1", [id]);
      return;
    } catch (error) {
      console.error("Error deleting content:", error);
      throw new Error("Erro ao deletar conteúdo");
    }
  },

  async deleteModuleById(id) {
    try {
      const result = await db.query("DELETE FROM modules WHERE id = $1", [id]);
      return;
    } catch (error) {
      console.error("Error deleting content:", error);
      throw new Error("Erro ao deletar conteúdo");
    }
  },

  async getContentOrder(moduleId) {
    try {
      const result = await db.query(
        "SELECT MAX(content_order) AS max_order FROM contents WHERE module_id = $1",
        [moduleId]
      );
      return result.rows[0].max_order || 0; // Retorna o maior número de ordem ou 0 se não houver conteúdos
    } catch (error) {
      console.error("Error fetching content order:", error);
      throw new Error("Erro ao buscar ordem de conteúdo");
    }
  },

   async getModuleContentOrder(id_path) {
    try {
      const result = await db.query(
        "SELECT MAX(module_order) AS max_order FROM modules WHERE id_path = $1",
        [id_path]
      );
      return result.rows[0].max_order || 0; // Retorna o maior número de ordem ou 0 se não houver conteúdos
    } catch (error) {
      console.error("Error fetching content order:", error);
      throw new Error("Erro ao buscar ordem de conteúdo");
    }
  },
};
