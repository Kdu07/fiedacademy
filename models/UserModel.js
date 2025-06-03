// Model da tabela paths
const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const res = await db.query(
    "INSERT INTO users (email, password,id_role,score) VALUES ($1, $2, $3, $4) RETURNING *",
    [email, hashedPassword, 1, 0]
  );
  return res.rows[0];
};

exports.logUser = async (email, password) => {
  // Fetch user by email
  const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = res.rows[0];
  if (!user) return null; // User not found

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null; // Password does not match

  return user; // Login successful
};
