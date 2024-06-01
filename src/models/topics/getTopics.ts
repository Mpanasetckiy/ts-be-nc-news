import db from "../../db/connection";

import { Topic } from "../../db/data/types";

export const getTopics = async (): Promise<Topic[]> => {
  const { rows } = await db.query("SELECT * FROM topics;");

  if (!rows.length) {
    return Promise.reject({ status: 404, message: "No data found" });
  }

  return rows;
};
