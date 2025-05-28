const db = require("../config/db.js");

module.exports = {
    
    async getUserPaths(userId) {
        const result = await db.query('SELECT * FROM user_paths WHERE user_id = $1', [userId]);
        return result.rows[0];
    },

    async getUserPathById(userId, pathId) {
        const result = await db.query('SELECT * FROM user_paths WHERE user_id = $1 AND id = $2', [userId, pathId]);
        return result.rows[0];
    },


}
