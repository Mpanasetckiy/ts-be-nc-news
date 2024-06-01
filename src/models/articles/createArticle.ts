import db from "../../db/connection";

import { Article } from "../../db/data/types";

export const createArticle = async (article: {
  title: string;
  topic: string;
  author: string;
  body: string;
  article_img_url: string;
}): Promise<Article> => {
  const defaultArticleUrl =
    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700";

  const {
    title,
    topic,
    author,
    body,
    article_img_url = defaultArticleUrl,
  } = article;

  const { rows } = await db.query(
    `INSERT INTO articles
      (title, topic, author, body, article_img_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
    [title, topic, author, body, article_img_url]
  );
  const { article_id } = rows[0];
  // const newArticle = await fetchArticleById(article_id);
  return rows[0];
};
