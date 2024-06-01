import db from "../../db/connection";

import { Article } from "../../db/data/types";
import { HttpError } from "../../middleware/error-handling";

export const updateArticle = async (
  articleId: number,
  inc_vote: string
): Promise<Article> => {
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

  const {
    rows: [updatedArticle],
  } = await db.query(
    `UPDATE articles
     SET votes = votes + $1
     WHERE article_id = $2
     RETURNING *;`,
    [inc_vote, articleId]
  );

  return updatedArticle;
};
