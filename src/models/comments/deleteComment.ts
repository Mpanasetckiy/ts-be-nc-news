import db from "../../db/connection";

export const deleteComment = async (comment_id: number) => {
  const { rowCount } = await db.query(
    `DELETE FROM comments
      WHERE comment_id = $1`,
    [comment_id]
  );
  if (!rowCount) {
    return Promise.reject({ status: 404, message: "No data found" });
  }
};
