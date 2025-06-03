const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.getUserId = async (token) => {
  try {
    const decoded = JWT.verify(token, JWT_SECRET);
    return decoded.id;
  } catch (error) {
    console.error("Error in getUserId:", error);
    return null; // Return null or handle the error as needed
  }
};
