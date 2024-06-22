import { Sequelize, DataTypes } from "sequelize";

import db from "../connection";
import { User } from "./user.model";
import { Topic } from "./topic.model";

const Article = db.define("Article", {
  article_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING(5000),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  votes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  article_img_url: {
    type: DataTypes.STRING,
    defaultValue:
      "https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700",
  },
});

Article.belongsTo(User, {
  foreignKey: "author",
  targetKey: "username",
  onDelete: "CASCADE",
});

Article.belongsTo(Topic, {
  foreignKey: "topic",
  targetKey: "slug",
});

export { Article };
