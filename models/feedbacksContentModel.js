const db = require("../config/db");

exports.getAllByModuleId = async (id, type) => {
  try {
    const res = await db.query(
      "SELECT id FROM feedbacks_content_module WHERE id_content = $1 AND value = $2",
      [id, type]
    );
    return res.rows;
  } catch (error) {
    console.error("Erro ao buscar feedback: ", error);
    return [];
  }
};

exports.getUserFeedback = async (userId, contentId) => {
  try {
    const res = await db.query(
      "SELECT value FROM feedbacks_content_module WHERE id_user = $1 AND id_content = $2",
      [userId, contentId]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Erro ao buscar feedback existente: ", error);
    return null;
  }
};

exports.addFeedback = async (userId, contentId, value) => {
  try {
    const existingFeedback = await this.getUserFeedback(userId, contentId);

    // Se o feedback já existe
    if (existingFeedback) {

      if (existingFeedback.value !== value) {
        const res = await db.query(
          "UPDATE feedbacks_content_module SET value = $3 WHERE id_user = $1 AND id_content = $2",
          [userId, contentId, value]
        );
        return { updated: true, feedback: res.rows[0] };
      }
 
      return;
    }

    // Se o feedback não existe, cria um novo	
    const res = await db.query(
      "INSERT INTO feedbacks_content_module (id_user, id_content, value) VALUES ($1, $2, $3)",
      [userId, contentId, value]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Erro ao adicionar feedback: ", error);
    return { error: error.message };
  }
};
