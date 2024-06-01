import db from "../../db/connection";

import { Article } from "../../db/data/types";

export const getArticleById = async (id: string): Promise<Article> => {
  const { rows } = await db.query(
    `SELECT articles.author, title, articles.body, articles.article_id, users.name, users.avatar_url AS author_avatar_url, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments) :: INTEGER  AS comment_count
      FROM articles
      LEFT JOIN comments ON 
      articles.article_id = comments.article_id
      JOIN users ON
      articles.author = users.username
      WHERE articles.article_id = $1
      GROUP BY articles.article_id, users.username;`,
    [id]
  );
  if (!rows.length) {
    return Promise.reject({ status: 404, message: "No data found" });
  }
  return rows[0];
};
