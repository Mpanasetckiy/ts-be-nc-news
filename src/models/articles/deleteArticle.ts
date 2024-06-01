import db from "../../db/connection";

export const deleteArticle = async (id: number) => {
  const query = `
  DELETE FROM 
    articles 
  WHERE 
    article_id = $1`;

  const { rowCount } = await db.query(query, [id]);
  if (!rowCount) {
    return Promise.reject({ status: 404, message: "No data found" });
  }
};
