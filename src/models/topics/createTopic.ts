import db from "../../db/connection";

import { Topic } from "../../db/data/types";

export const createTopic = async (newTopicBody: Topic): Promise<Topic> => {
  const { slug, description = "" } = newTopicBody;

  const query = `
  INSERT INTO topics
    (slug, description)
  VALUES ($1, $2)
  RETURNING 
    slug, 
    description`;

  const {
    rows: [topic],
  } = await db.query(query, [slug, description]);

  return topic;
};
