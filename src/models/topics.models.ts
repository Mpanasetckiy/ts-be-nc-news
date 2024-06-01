import db from "../db/connection";

import { Topic } from "../db/data/types";

export const fetchTopics = async (): Promise<Topic[]> => {
  const { rows } = await db.query("SELECT * FROM topics;");

  if (!rows.length) {
    return Promise.reject({ status: 404, message: "No data found" });
  }

  return rows;
};

export const insertTopic = async (newTopicBody: Topic): Promise<Topic> => {
  const { slug, description = "" } = newTopicBody;
  const { rows } = await db.query(
    `INSERT INTO topics
  (slug, description)
  VALUES ($1, $2)
  RETURNING *`,
    [slug, description]
  );
  return rows[0];
};
