import db from "../../db/connection";

import { Article } from "../../db/data/types";

import { ArticleQuery } from "../../api/controllers/types";
import { ValidationError } from "../../middleware/error-handling";

export const getArticles = async (
  queries: ArticleQuery
): Promise<Article[]> => {
  let { sort_by, order, topic, limit, p } = queries;

  // Validation
  sort_by = sort_by === "null" ? undefined : sort_by;
  order = order === "null" ? undefined : order;
  topic = topic === "null" ? undefined : topic;

  sort_by = sort_by || "created_at";
  order = order || "desc";
  limit = limit || 10;
  p = p || 1;

  const acceptedQueries = ["asc", "desc"];
  const acceptedSortQueries = [
    "author",
    "created_at",
    "title",
    "topic",
    "votes",
    "comment_count",
  ];

  if (
    !acceptedSortQueries.includes(sort_by) ||
    !acceptedQueries.includes(order)
  ) {
    throw new ValidationError("Bad query value!");
  }

  const queryValues = [];

  let sqlStr = `
  SELECT 
    articles.article_id, 
    articles.author, 
    users.avatar_url AS author_avatar_url, 
    title, 
    articles.body, 
    topic, 
    articles.created_at, 
    articles.votes, 
    article_img_url, 
    COUNT(comments) :: INT AS comment_count
  FROM 
    articles
  LEFT JOIN 
    comments 
  ON 
    articles.article_id = comments.article_id
  JOIN 
    users 
  ON
    articles.author = users.username`;

  if (topic) {
    sqlStr += " WHERE topic = $1";
    queryValues.push(topic);
  }

  sqlStr += ` GROUP BY articles.article_id, users.username
       ORDER BY ${sort_by} ${order}`;

  if (!Number.isNaN(limit) && !Number.isNaN(p)) {
    const offset = +limit * +p - 10;
    sqlStr += ` LIMIT ${limit} OFFSET ${offset}`;
  } else {
    throw new ValidationError("Bad query value!");
  }
  const { rows: articles } = await db.query(sqlStr, queryValues);

  return articles;
};
