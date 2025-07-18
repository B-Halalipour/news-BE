const { Pool } = require("pg");
const path = require("path");
const dotenv = require("dotenv");

const ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(__dirname, `../.env.${ENV}`) });

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("No PGDATABASE or DATABASE_URL configured");
} else if (process.env.PGDATABASE) {
  console.log(`Connected to database: ${process.env.PGDATABASE}`);
} else if (process.env.DATABASE_URL) {
  console.log(`Connected to production database via DATABASE_URL`);
}

const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
  config.ssl = {
    rejectUnauthorized: false,
  };
}

const db = new Pool(config);

module.exports = db;
