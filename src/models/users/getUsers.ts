import db from "../../db/connection";

import { User } from "../../db/data/types";

export const getUsers = async (): Promise<User[]> => {
  const { rows: users } = await db.query(
    `SELECT 
      username, 
      name, 
      avatar_url 
    FROM 
      users;`
  );
  return users;
};
