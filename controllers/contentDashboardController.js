const usersModel = require("../models/usersModel");
const contentModel = require("../models/modulesModel");
const pathsModel = require("../models/pathsModel");
const testModel = require("../models/userTestModel");

const { getUserId } = require("../utils/jwtUtils");
const { isAuthorized } = require("../utils/authUtils");

// TESTS
exports.indexTests = async (req, res) => {
  try {
    const token = req.cookies.token;
    const auth = await isAuthorized(token, "Admin");

    if (auth === false) {
      return res.redirect("/");
    }

    const id = await getUserId(token);
    const user = await usersModel.getRole(id);
    const allTests = await testModel.getAllTests();

    const display = "tests";

    return res.render("contentDashboard", {
      user,
      allModules: null,
      allContents: null,
      allTests,
      display,
    });
  } catch (err) {
    const isNetworkError =
      err.code === "ECONNREFUSED" ||
      err.code === "ENOTFOUND" ||
      err.name === "NetworkError" ||
      err.message.includes("network");

    if (isNetworkError) {
      return res.redirect("/help");
    }
    return res.status(500).json(err.message);
  }
};

// MODULES

exports.indexModules = async (req, res) => {
  try {
    const token = req.cookies.token;
    const auth = await isAuthorized(token, "Admin");

    if (auth === false) {
      return res.redirect("/");
    }

    const id = await getUserId(token);
    const user = await usersModel.getRole(id);
    const allModules = await contentModel.getAllModules();

    const display = "modules";

    return res.render("contentDashboard", {
      user,
      allModules,
      allContents: null,
      allTests: null,
      display,
    });
  } catch (err) {
    const isNetworkError =
      err.code === "ECONNREFUSED" ||
      err.code === "ENOTFOUND" ||
      err.name === "NetworkError" ||
      err.message.includes("network");

    if (isNetworkError) {
      return res.redirect("/help");
    }
    return res.status(500).json(err.message);
  }
};

exports.editModule = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.redirect("/");
  }

  const id = await getUserId(token);
  const user = await usersModel.getRole(id);
  const moduleId = req.params.id;

  const paths = await pathsModel.getAll();
  const module = await contentModel.findModuleById(moduleId);

  if (!module) {
    return res.status(404).send("Module not found");
  }

  return res.render("editModule", {
    user,
    paths,
    module,
  });
};

exports.deleteModule = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.redirect("/");
  }

  const id = req.params.id;

  // Delete the content by ID
  await contentModel.deleteModuleById(id);

  return res.redirect("/contentDashboard/modules");
};

exports.startModuleCreation = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.redirect("/");
  }

  const id = await getUserId(token);
  const user = await usersModel.getRole(id);

  const paths = await pathsModel.getAll();

  const module = {
    title: "",
    contentBody: "",
    category: "",
    module_id: "",
    video_path: "",
  };

  if (!paths) {
    return res.status(404).send("Paths not found");
  }

  return res.render("editModule", {
    user,
    paths,
    module,
  });
};

exports.createModule = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.redirect("/");
  }

  const { id_path, title } = req.body;

  let order = await contentModel.getModuleContentOrder(id_path);
  order = order + 1;
  const module = await contentModel.createModule(title, id_path, order);

  const testTitle = "Prova " + title;

  await testModel.createTest(testTitle, module.id);

  const formattedVideoPath = null;
  const contentBody = "";
  const category = null;

  await contentModel.createContent(
    contentBody,
    title,
    category,
    module.id,
    formattedVideoPath,
    1
  );

  return res.redirect("/contentDashboard");
};

exports.updateModule = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.redirect("/");
  }

  const id = req.params.id;
  const { id_path, title } = req.body;

  await contentModel.updateModuleById(id, title, id_path);

  return res.redirect("/contentDashboard/modules");
};

// CONTENT

exports.indexLessons = async (req, res) => {
  try {
    const token = req.cookies.token;
    const auth = await isAuthorized(token, "Admin");

    if (auth === false) {
      return res.redirect("/");
    }

    const id = await getUserId(token);
    const user = await usersModel.getRole(id);
    const allContents = await contentModel.getAllContents();

    const display = "lessons";

    return res.render("contentDashboard", {
      user,
      allModules: null,
      allContents,
      allTests: null,
      display,
    });
  } catch (err) {
    const isNetworkError =
      err.code === "ECONNREFUSED" ||
      err.code === "ENOTFOUND" ||
      err.name === "NetworkError" ||
      err.message.includes("network");

    if (isNetworkError) {
      return res.redirect("/help");
    }
    return res.status(500).json(err.message);
  }
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
    modules,
  });
};

exports.startContentCreation = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.redirect("/");
  }

  const id = await getUserId(token);
  const user = await usersModel.getRole(id);

  const modules = await contentModel.getAllModules();

  const content = {
    title: "",
    contentBody: "",
    category: "",
    module_id: "",
    video_path: "",
  };

  return res.render("editContent", {
    user,
    content,
    modules,
  });
};

exports.createContent = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.redirect("/");
  }

  const { contentBody, title, category, module_id, video_path } = req.body;

  // Convert YouTube URL to shorter format if needed
  const formattedVideoPath = formatYouTubeUrl(video_path);

  let order = await contentModel.getContentOrder(module_id);
  order = order + 1;
  await contentModel.createContent(
    contentBody,
    title,
    category,
    module_id,
    formattedVideoPath,
    order
  );

  return res.redirect("/contentDashboard");
};

exports.deleteContent = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.redirect("/");
  }

  const id = req.params.id;

  // Delete the content by ID
  await contentModel.deleteContentById(id);

  return res.redirect("/contentDashboard");
};

exports.updateContent = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "Admin");

  if (auth === false) {
    return res.redirect("/");
  }

  const id = req.params.id;

  const { contentBody, title, category, module_id, video_path } = req.body;

  // Convert YouTube URL to shorter format if needed
  const formattedVideoPath = formatYouTubeUrl(video_path);

  await contentModel.updateContentById(
    id,
    contentBody,
    title,
    category,
    module_id,
    formattedVideoPath
  );

  return res.redirect("/contentDashboard");
};

// Utility function to convert YouTube URLs to youtu.be format
function formatYouTubeUrl(url) {
  if (!url || typeof url !== "string") {
    return url;
  }

  try {
    // Check if it's already in youtu.be format
    if (url.includes("youtu.be/")) {
      return url;
    }

    // Try to extract video ID from various YouTube URL formats
    let videoId = null;

    // youtube.com/watch?v=VIDEO_ID format
    if (url.includes("youtube.com/watch")) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get("v");

      // If URL has additional parameters (like si=)
      const siParam = urlObj.searchParams.get("si");

      if (videoId) {
        // Create the short URL with the same si parameter if it exists
        return siParam
          ? `https://youtu.be/${videoId}?si=${siParam}`
          : `https://youtu.be/${videoId}`;
      }
    }

    // Return original URL if format isn't recognized
    return url;
  } catch (error) {
    console.error("Error formatting YouTube URL:", error);
    return url; // Return original URL on error
  }
}
