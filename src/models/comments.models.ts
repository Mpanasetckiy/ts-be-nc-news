import db from "../db/connection";

import { Comment } from "../db/data/types";
import { checkArticleExists } from "./articles.models";

export const fetchCommentsByArticleId = async (
  id: string,
  queries: { limit: number; p: number }
) => {
  const { limit = 10, p = 1 } = queries;
  await checkArticleExists(id);

  let sqlStr = `SELECT comment_id, comments.body, comments.article_id, comments.author, users.avatar_url AS author_avatar_url, votes, created_at FROM comments
    JOIN users ON comments.author = users.username
    WHERE article_id = $1
    ORDER BY created_at DESC`;

  if (!isNaN(limit) && !isNaN(p)) {
    const offset = +limit * +p - 10;
    sqlStr += ` LIMIT ${limit} OFFSET ${offset}`;
  } else {
    return Promise.reject({ status: 400, message: "Bad query value!" });
  }

  const { rows } = await db.query(sqlStr, [id]);

  return rows;
};

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

export const deleteComment = async (comment_id: number) => {
  const { rowCount } = await db.query(
    `DELETE FROM comments
    WHERE comment_id = $1`,
    [comment_id]
  );
  if (!rowCount) {
    return Promise.reject({ status: 404, message: "No data found" });
  }
};

export const patchComment = async (
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
