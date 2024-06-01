import db from "../../db/connection";

import { Topic } from "../../db/data/types";
import { HttpError } from "../../middleware/error-handling";

export const getTopics = async (): Promise<Topic[]> => {
  const { rows: topics } = await db.query(
    "SELECT slug, description FROM topics;"
  );

  if (!topics.length) {
    throw new HttpError(404, "No data found");
  }

  return topics;
};
