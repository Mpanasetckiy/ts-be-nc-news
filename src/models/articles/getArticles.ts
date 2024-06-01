import db from "../../db/connection";

import { Article } from "../../db/data/types";

import { ArticleQuery } from "../../api/controllers/types";

export const getArticles = async (
  queries: ArticleQuery
): Promise<Article[]> => {
  const {
    sort_by = "created_at",
    order = "desc",
    topic,
    limit = 10,
    p = 1,
  } = queries;

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
    return Promise.reject({ status: 400, message: "Bad query value!" });
  }

  const queryValues = [];

  let sqlStr = `SELECT articles.article_id, articles.author, users.avatar_url AS author_avatar_url, title, articles.body, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments) :: INT AS comment_count
      FROM articles
      LEFT JOIN comments ON 
      articles.article_id = comments.article_id
      JOIN users ON
      articles.author = users.username`;

  if (topic) {
    sqlStr += " WHERE topic = $1";
    queryValues.push(topic);
  }

  sqlStr += ` GROUP BY articles.article_id, users.username
       ORDER BY ${sort_by} ${order}`;

  if (!isNaN(limit) && !isNaN(p)) {
    const offset = +limit * +p - 10;
    sqlStr += ` LIMIT ${limit} OFFSET ${offset}`;
  } else {
    return Promise.reject({ status: 400, message: "Bad query value!" });
  }
  const { rows } = await db.query(sqlStr, queryValues);
  return rows;
};
