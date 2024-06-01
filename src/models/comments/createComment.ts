import db from "../../db/connection";

import { Comment } from "../../db/data/types";

export const createComment = async (
  id: string,
  reqBody: { username: string; body: string }
): Promise<Comment> => {
  const { username, body } = reqBody;

  if (typeof body !== "string") {
    return Promise.reject({ status: 400, message: "Bad request" });
  }

  const { rows } = await db.query(
    `INSERT INTO comments
     (author, body, article_id)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [username, body, id]
  );
  return rows[0];
};
