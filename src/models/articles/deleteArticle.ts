import db from "../../db/connection";

import { HttpError } from "../../middleware/error-handling";

export const deleteArticle = async (articleId: number) => {
  const query = `
  DELETE FROM 
    articles 
  WHERE 
    article_id = $1`;

  const { rowCount } = await db.query(query, [articleId]);
  if (!rowCount) {
    throw new HttpError(404, "No data found");
  }
};
