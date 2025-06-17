const usersModel = require("../models/usersModel");
const userContentModel = require("../models/userContentModel");
const userTestModel = require("../models/userTestModel");

const { getUserId } = require("../utils/jwtUtils");
const { isAuthorized } = require("../utils/authUtils");

exports.index = async (req, res) => {
  const token = req.cookies.token;
  const auth = await isAuthorized(token, "PTD");

  if (auth === false) {
    return res.redirect("/");
  }

  const userId = await getUserId(token);
  

  
  const user = await usersModel.getRole(userId);
  
  const profileId = req.params.id
  const userProfile = await usersModel.getById(profileId);
  const ranking = await usersModel.getUsersRanking();
  const userRank = ranking.findIndex((u) => u.id === profileId) + 1; // Find the user's rank
  const progress = await userContentModel.getUserPathsProgress(profileId);
  const moduleScores = await userTestModel.getUserModuleScores(profileId);

  const lastLogin = new Date(userProfile.last_login).toLocaleDateString("pt-BR");
  progress.sort((a, b) => b.progress_percentage - a.progress_percentage);

  res.render("profile", {
    user,
    userProfile,
    userRank,
    progress: progress || [],
    moduleScores,
    lastLogin,
  });
};

exports.updatePicture = async (req, res) => {
  const token = req.cookies.token;
  const userId = await getUserId(token);


  if (!userId) {
    return res.status(401).send("Unauthorized");
  }
    const user = await usersModel.getById(userId);
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Se a foto existe deleta o arquivo
  if (user.profile_photo_path) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    // Extract the path after '/profiles/' from the public URL
    const match = user.profile_photo_path.match(/\/profiles\/(.+)$/);
    if (match && match[1]) {
      const previousFileName = match[1];
      const deleteUrl = `${supabaseUrl}/storage/v1/object/profiles/${previousFileName}`;

      await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${supabaseKey}`,
        },
      });
    }
  }

  // Ler o arquivo localmente
  const fs = require("fs").promises;
  const path = require("path");
  const fileBuffer = await fs.readFile(req.file.path);
  const fileExt = path.extname(req.file.originalname);
  const fileName = `avatars/${userId}_${Date.now()}${fileExt}`;

  // Upload do arquivo para o Supabase
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
  const uploadUrl = `${supabaseUrl}/storage/v1/object/profiles/${fileName}`;

  // Fetch API para enviar o arquivo
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": req.file.mimetype,
      "x-upsert": "true",
    },
    body: fileBuffer,
  });

  await fs.unlink(req.file.path); // Clean up local file

  if (!response.ok) {
    return res.status(500).send("Failed to upload to Supabase.");
  }

  // 3. Construct public URL
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/profiles/${fileName}`;

  // 4. Save URL in DB using your model
  await usersModel.updateProfilePhoto(publicUrl, userId);

  res.redirect("/profile");
};
