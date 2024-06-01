import db from "../../db/connection";

import { Comment } from "../../db/data/types";

export const checkCommentExists = async (id: number) => {
  const { rows } = await db.query(
    `SELECT * FROM comments
    WHERE comment_id = $1`,
    [id]
  );
  if (!rows.length) {
    return Promise.reject({ status: 404, message: "No data found" });
  }
};

export const updateComment = async (
  id: number,
  inc_votes: number
): Promise<Comment> => {
  await checkCommentExists(id);

  const { rows } = await db.query(
    `UPDATE comments
    SET votes = votes + $1
    WHERE comment_id = $2
    RETURNING *`,
    [inc_votes, id]
  );
  return rows[0];
};
