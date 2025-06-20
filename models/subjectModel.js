const db = require("../config/db");

exports.allArticleBySubject = async (id) => {
  const articleResult = await db.query(
    "SELECT title, id_subject, doc_path, id FROM subject_help WHERE id= $1",
    [articleId]
  );
  if (articleResult.rows.length === 0)
    throw new Error("Artigo não encontrado não encontrado");
  const articleData = articleResult.rows[0];

  const subjectResult = await db.query(
    "SELECT title, description, id FROM articles WHERE id= $1",
    [subjectId]
  );
  if (subjectResult.rows.length === 0)
    throw new Error("Assunto não encontrado");
  const subjectData = subjectResult.rows[0];

  if (articleResult.id_subject === subjectResult.id) {
    const Result = {
      title: articleData.title,
      id_subject: articleData.id_subject,
      doc_path: articleData.doc_path,
      id: articleData.id,
    };
    return Result;
  }
};

exports.article = async (id) => {
  const articleResult = await db.query(
    "SELECT title, id_subject, doc_path, id FROM subject_help WHERE id= $1",
    [articleId]
  );
  if (articleResult.rows.length === 0)
    throw new Error("Artigo não encontrado não encontrado");
  const articleData = articleResult.rows[0];
  return articleData;
};

exports.subject = async (id) => {
  const subjectResult = await db.query(
    "SELECT title, description, id FROM articles WHERE id= $1",
    [subjectId]
  );
  if (subjectResult.rows.length === 0)
    throw new Error("Assunto não encontrado");
  const subjectData = subjectResult.rows[0];
  return subjectData;
};

exports.getArticlesByCategory = async (category) => {
  const result = await db.query(
    "SELECT * FROM contents WHERE category = $1 ORDER BY title DESC",
    [category]
  );
  if (result.rows.length === 0)
    throw new Error("Nenhum artigo encontrado para esta categoria");
  return result.rows;
};

exports.getAllArticles = async () => {
  const result = await db.query(
    "SELECT title, id, category FROM contents ORDER BY category DESC",
  );
  return result.rows;
};

exports.getFirstArticleFromEachCategory = async () => {
  const query = `
    SELECT
    id,
    title,
    category
    FROM (
        SELECT 
            id,
            title,
            category,
            ROW_NUMBER() OVER (
                PARTITION BY category 
                ORDER BY title ASC, id 
            ) AS rn
        FROM contents
    ) ranked
    WHERE rn = 1
    ORDER BY category;
  `;

  const result = await db.query(query);
  return result.rows;
};
