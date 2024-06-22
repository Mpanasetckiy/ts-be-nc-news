import db from "../../db/connection";

import { Article } from "../../db/data/types";
import { HttpError } from "../../middleware/error-handling";

export const getArticleById = async (articleId: number): Promise<Article> => {
  const query = `
  SELECT 
    articles.author, 
    title, 
    articles.body, 
    articles.article_id, 
    users.name, 
    users.avatar_url AS author_avatar_url, 
    topic, 
    articles.created_at, 
    articles.votes, 
    article_img_url, 
    COUNT(comments.comment_id) :: INTEGER AS comment_count
  FROM 
    articles
  LEFT JOIN 
    comments 
  ON 
    articles.article_id = comments.article_id
  JOIN 
    users 
  ON
    articles.author = users.username
  WHERE 
    articles.article_id = $1
  GROUP BY 
    articles.article_id, users.username;`;

  const {
    rows: [article],
  } = await db.query(query, [articleId]);

  if (!article) {
    throw new HttpError(404, "No data found");
  }

  return article;
};
