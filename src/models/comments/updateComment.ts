import db from "../../db/connection";

import { Comment } from "../../db/data/types";

import { HttpError } from "../../middleware/error-handling";

export const updateComment = async (
  id: number,
  inc_votes: number
): Promise<Comment> => {
  const { rows: existingRows } = await db.query(
    ` SELECT 
    comments.comment_id 
      FROM 
    comments 
      WHERE 
    comment_id = $1`,
    [id]
  );

  if (!existingRows.length) {
    throw new HttpError(404, "No data found");
  }

  const {
    rows: [updatedComment],
  } = await db.query(
    `UPDATE comments
    SET votes = votes + $1
    WHERE comment_id = $2
    RETURNING 
    comment_id, 
    body, 
    votes, 
    author, 
    article_id, 
    created_at`,
    [inc_votes, id]
  );

  return updatedComment;
};
