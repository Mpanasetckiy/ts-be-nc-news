import { Sequelize, DataTypes } from "sequelize";
import db from "../connection";
import { Article } from "./article.model";
import { User } from "./user.model";

const Comment = db.define("Comment", {
  comment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  body: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  article_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  votes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

Comment.belongsTo(Article, { foreignKey: "article_id", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "author", targetKey: "username" });

export { Comment };
