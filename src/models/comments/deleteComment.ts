import db from "../../db/connection";

import { HttpError } from "../../middleware/error-handling";

export const deleteComment = async (comment_id: number) => {
  const { rowCount } = await db.query(
    `DELETE FROM 
       comments
     WHERE 
       comment_id = $1`,
    [comment_id]
  );
  if (!rowCount) {
    throw new HttpError(404, "No data found");
  }
};
