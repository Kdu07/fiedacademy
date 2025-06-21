const usersModel = require("../models/usersModel");
const contentModel = require("../models/modulesModel");

const { getUserId } = require("../utils/jwtUtils");
const { isAuthorized } = require("../utils/authUtils");

exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.redirect("/");
  }

  const id = await getUserId(token);
  const user = await usersModel.getRole(id);
  const allContents = await contentModel.getAllContents();

  return res.render("contentDashboard", {
    user,
    allContents,
  });
};

exports.editContent = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.redirect("/");
  }

  const id = await getUserId(token);
  const user = await usersModel.getRole(id);
  const contentId = req.params.id;

  // Fetch the content to be edited
  const content = await contentModel.findModule(contentId);
  const modules = await contentModel.getAllModules();

  if (!content) {
    return res.status(404).send("Content not found");
  }

  return res.render("editContent", {
    user,
    content,
    modules
  });
};

exports.updateContent = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.redirect("/");
  }


  const id = req.params.id;
  const { body, title, category, module_id, video_path } = req.body;

  await contentModel.updateContentById(id, body, title, category, module_id, video_path)
  
  return res.redirect("/contentDashboard");
};