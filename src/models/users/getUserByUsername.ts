import db from "../../db/connection";

import { User } from "../../db/data/types";

export const getUserByUsername = async (username: string): Promise<User> => {
  const { rows } = await db.query(
    `SELECT username, name, avatar_url FROM users
    WHERE username = $1`,
    [username]
  );
  if (!rows.length) {
    return Promise.reject({ status: 404, message: "No data found" });
  }
  return rows[0];
};
