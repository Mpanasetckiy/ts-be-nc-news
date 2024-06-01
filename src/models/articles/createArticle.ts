import db from "../../db/connection";

import { Article } from "../../db/data/types";

export const createArticle = async (articleBody: {
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
  } = articleBody;

  const query = `
  INSERT INTO articles
    (title, topic, author, body, article_img_url)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING 
    articles.author,
    articles.article_id,
    title,
    topic,
    body,
    articles.votes,
    articles.created_at,
    article_img_url`;

  const { rows } = await db.query(query, [
    title,
    topic,
    author,
    body,
    article_img_url,
  ]);

  return rows[0];
};
