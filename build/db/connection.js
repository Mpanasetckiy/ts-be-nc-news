"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
    path: `${__dirname}/../../.env.${ENV}`,
});
const config = {};
if (ENV === "production") {
    config.connectionString = process.env.DATABASE_URL;
    config.max = 2;
}
if (!process.env.PG_DATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
}
const db = new pg_1.Pool(config);
exports.default = db;
