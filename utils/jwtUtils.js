module.exports.getUserId = async (token) => {
    const JWT = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET;
    
    try {
        const decoded = JWT.verify(token, JWT_SECRET);
        return decoded.id; // Return the user ID from the decoded token
    } catch (error) {
        console.error("Error verifying token:", error);
        return null; // Return null if verification fails
    }
}

