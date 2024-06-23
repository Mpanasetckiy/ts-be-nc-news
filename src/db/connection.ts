const { Sequelize } = require("sequelize");

import dotenv from "dotenv";

const ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: `${__dirname}/../../.env.${ENV}`,
});

if (!process.env.PG_DATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config: any = { dialect: "postgres", logging: false, host: "localhost" };

if (ENV === "production") {
  config.url = process.env.DATABASE_URL;
  config.pool = {
    max: 2,
  };
}

const db = new Sequelize(process.env.PG_DATABASE, "maxbmaapc", "", config);

export default db;
