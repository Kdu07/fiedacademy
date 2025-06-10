// Model da tabela paths
const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.createUser = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await db.query(
      "INSERT INTO users (email, password,id_role,score) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, hashedPassword, 4, 0]
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
