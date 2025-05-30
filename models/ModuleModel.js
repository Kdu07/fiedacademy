const db = require("../config/db");


module.exports = {
    async findModule(moduleId) {
        const result = await db.query("SELECT * FROM module WHERE id = $1", [moduleId]);
        return result.rows[0];
    },

    async findModuleContentByOrder(page, module_id) {
        const result = await db.query("SELECT * FROM content WHERE page = $1 AND module_id = $2", [page, module_id]);
        return result.rows[0];
    },

    async findAllModuleContent(module) {
        const result = await db.query("SELECT page FROM content WHERE module_id = $1 ORDER BY page", [module]);
        return result.rows;
    }
}