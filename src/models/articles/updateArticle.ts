import db from "../../db/connection";

import { Article } from "../../db/data/types";

export const checkArticleExists = async (id: string) => {
  const { rows } = await db.query(
    `SELECT * FROM articles
      WHERE article_id = $1`,
    [id]
  );
  if (!rows.length) {
    return Promise.reject({ status: 404, message: "No data found" });
  }
};

export const updateArticle = async (
  articleId: string,
  inc_vote: string
): Promise<Article> => {
  // to delete it
  await checkArticleExists(articleId);

  const { rows } = await db.query(
    `UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *;`,
    [inc_vote, articleId]
  );

  return rows[0];
};
