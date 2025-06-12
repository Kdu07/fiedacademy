const usersModel = require("../models/usersModel");
const { getUserId } = require("./jwtUtils");

module.exports.isAuthorized = async (token, routeType) => {
    if (!token) {
    return false;
  }

  const userId = await getUserId(token);

  if (!userId) {
    return false;
  }

  if (routeType === "Gestor") {
    const userModel = await usersModel.getById(userId);
    if (userModel.id_role === 4) {
      return false;
    } else {
      return true;
    }
  } else if (routeType === "Admin") {
    const userModel = await usersModel.getById(userId);
    if (userModel.id_role === 6) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};
