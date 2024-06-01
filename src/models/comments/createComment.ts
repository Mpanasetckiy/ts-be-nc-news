import db from "../../db/connection";

import { Comment } from "../../db/data/types";

import { ValidationError } from "../../middleware/error-handling";

export const createComment = async (
  articleId: number,
  reqBody: { username: string; body: string }
): Promise<Comment> => {
  const { username, body } = reqBody;

  if (typeof body !== "string") {
    throw new ValidationError("Bad request");
  }

  const query = `
  INSERT INTO 
    comments
    (author, body, article_id)
  VALUES ($1, $2, $3)
  RETURNING 
  comment_id, 
  body, 
  votes, 
  author, 
  article_id, 
  created_at`;

  const {
    rows: [newComment],
  } = await db.query(query, [username, body, articleId]);

  return newComment;
};
