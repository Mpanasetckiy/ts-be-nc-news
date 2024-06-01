import db from "../../db/connection";

import { Topic } from "../../db/data/types";

export const createTopic = async (newTopicBody: Topic): Promise<Topic> => {
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
