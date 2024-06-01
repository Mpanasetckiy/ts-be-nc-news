import db from "../../db/connection";

import { Comment } from "../../db/data/types";

import { HttpError, ValidationError } from "../../middleware/error-handling";

export const getCommentsByArticleId = async (
  articleId: number,
  queries: { limit: number; p: number }
): Promise<Comment[]> => {
  const { limit = 10, p = 1 } = queries;

  const { rows: existingRows } = await db.query(
    `SELECT 
      article_id 
     FROM 
      articles
     WHERE 
      article_id = $1`,
    [articleId]
  );

  if (!existingRows.length) {
    throw new HttpError(404, "No data found");
  }

  let queryStr = `
  SELECT 
    comment_id, 
    comments.body, 
    comments.article_id, 
    comments.author, 
    users.avatar_url AS author_avatar_url, 
    votes, 
    created_at 
  FROM 
    comments
  JOIN 
    users 
  ON 
    comments.author = users.username
  WHERE 
    article_id = $1
  ORDER BY created_at DESC`;

  if (!isNaN(limit) && !isNaN(p)) {
    const offset = +limit * +p - 10;
    queryStr += ` LIMIT ${limit} OFFSET ${offset}`;
  } else {
    throw new ValidationError("Bad query value!");
  }

  const { rows: articles } = await db.query(queryStr, [articleId]);

  return articles;
};
