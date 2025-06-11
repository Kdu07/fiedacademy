const db = require("../config/db");

// Exporta um objeto com métodos para acessar dados de módulos e conteúdos no banco de dados
module.exports = {
    // Busca um módulo pelo seu ID
    async findModule(moduleId) {
        const result = await db.query("SELECT * FROM modules WHERE id = $1", [moduleId]);
        return result.rows[0]; // Retorna o primeiro resultado encontrado
        
    },

    // Busca o conteúdo de um módulo por ordem da página e ID do módulo
    async findModuleContentByOrder(content_order, module_id) {
        const result = await db.query("SELECT * FROM contents WHERE content_order = $1 AND module_id = $2", [content_order, module_id]);
        return result.rows[0]; // Retorna o conteúdo correspondente à página e módulo
    },

    // Busca todas as páginas de conteúdo de um módulo, ordenadas por número da página
    async findAllModuleContent(module) {
        const result = await db.query("SELECT content_order FROM contents WHERE module_id = $1 ORDER BY content_order", [module]);
        return result.rows; // Retorna um array com as páginas do módulo
    },

}