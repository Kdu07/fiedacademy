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
