import { DataTypes } from "sequelize";
import db from "../../db/connection";

export const User = db.define("users", {
  username: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  avatar_url: {
    type: DataTypes.STRING,
    field: "avatar_url",
  },
});
