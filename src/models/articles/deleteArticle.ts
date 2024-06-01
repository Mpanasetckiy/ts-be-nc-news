import db from "../../db/connection";

export const deleteArticle = async (id: string) => {
  const { rowCount } = await db.query(
    `DELETE FROM articles WHERE article_id = $1`,
    [id]
  );
  if (!rowCount) {
    return Promise.reject({ status: 404, message: "No data found" });
  }
  return rowCount;
};
