// Model da tabela paths
const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.createUser = async (email, password, name, region, role) => {
  try {
    // Determina o cargo baseado no usuário
    if (role === "Admin") {
      role = 6;
    } else if (role === "Gestor") {
      role = 5;
    } else {
      role = 4;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await db.query(
      "INSERT INTO users (email, password, name, region, id_role, score) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [email, hashedPassword, name, region, role, 0]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    return; // Rethrow the error for handling in the controller
  }
};

exports.loginUser = async (email, password) => {
  try {
    // Fetch user by email
    const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = res.rows[0];
    if (!user) return; // User not found

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return; // Password does not match

    const lastLoginUpdate = await db.query(
      "UPDATE users SET last_login = $1 WHERE id = $2",
      [new Date(), user.id]
    );

    return user; // Login successful
  } catch (error) {
    console.error("Error creating user:", error);
    return; // Rethrow the error for handling in the controller
  }
};

exports.getAllPTD = async (order) => {
  try {
    let query;

    // Switch para definir a query SQL baseada na ordenação
    switch (order) {
      case "name_asc":
        query =
          "SELECT id, name, region, email, profile_photo_path, score, last_login FROM users ORDER BY name ASC";
        break;
      case "name_desc":
        query =
          "SELECT id, name, region, email, profile_photo_path, score, last_login FROM users ORDER BY name DESC";
        break;
      case "score_high":
        query =
          "SELECT id, name, region, email, profile_photo_path, score, last_login FROM users ORDER BY score DESC";
        break;
      case "score_low":
        query =
          "SELECT id, name, region, email, profile_photo_path, score, last_login FROM users ORDER BY score ASC";
        break;
      case "recent_login":
        query =
          "SELECT id, name, region, email, profile_photo_path, score, last_login FROM users ORDER BY last_login DESC NULLS LAST";
        break;
      case "region":
        query =
          "SELECT id, name, region, email, profile_photo_path, score, last_login FROM users ORDER BY region ASC";
        break;
      default:
        query =
          "SELECT id, name, region, email, profile_photo_path, score, last_login FROM users ORDER BY score DESC";
    }

    const res = await db.query(query);
    return res.rows;
  } catch (error) {
    console.error("Error getting users:", error);
    return;
  }
};

exports.getAll = async () => {
  try {
    const res = await db.query("SELECT * FROM users");
    return res.rows;
  } catch (error) {
    console.error("Error getting users:", error);
    return; // Rethrow the error for handling in the controller
  }
};

exports.getById = async (userId) => {
  try {
    const res = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
    return res.rows[0];
  } catch (error) {
    console.error("Error getting users:", error);
    return; // Rethrow the error for handling in the controller
  }
};

exports.getRole = async (userId) => {
  try {
    const res = await db.query("SELECT id, id_role FROM users WHERE id = $1", [
      userId,
    ]);
    return res.rows[0];
  } catch (error) {
    console.error("Error getting users:", error);
    return; // Rethrow the error for handling in the controller
  }
};

exports.getByEmail = async (email) => {
  try {
    const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return res.rows[0];
  } catch (error) {
    console.error("Error getting users:", error);
    return; // Rethrow the error for handling in the controller
  }
};

exports.getUsersRanking = async () => {
  // Ordena os usuários pelo score, do maior para o menor
  const users = await this.getAll();
  const sortedUsers = users.slice().sort((a, b) => b.score - a.score);

  // Mapeia para adicionar a posição no ranking
  return sortedUsers.map((user, index) => ({
    rank: index + 1,
    id: user.id,
    name: user.name,
    score: user.score,
  }));
};

exports.updateProfilePhoto = async (photoUrl, userId) => {
  await db.query("UPDATE users SET profile_photo_path = $1 WHERE id = $2", [
    photoUrl,
    userId,
  ]);
};
