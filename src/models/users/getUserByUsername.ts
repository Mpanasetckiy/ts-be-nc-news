import db from "../../db/connection";

import { User } from "../../db/data/types";

import { HttpError } from "../../middleware/error-handling";

export const getUserByUsername = async (username: string): Promise<User> => {
  const query = `
  SELECT 
    username, 
    name, 
    avatar_url 
  FROM 
    users
  WHERE 
    username = $1`;

  const {
    rows: [user],
  } = await db.query(query, [username]);

  if (!user) {
    throw new HttpError(404, "No data found");
  }
  return user;
};
