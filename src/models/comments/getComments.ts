import db from "../../db/connection";

import { Comment } from "../../db/data/types";

import { checkArticleExists } from "../articles/updateArticle";

export const getCommentsByArticleId = async (
  id: string,
  queries: { limit: number; p: number }
): Promise<Comment[]> => {
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
