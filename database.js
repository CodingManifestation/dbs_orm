const pg = require("pg");
// eslint-disable-next-line import/no-extraneous-dependencies
const pgCamelCase = require("pg-camelcase");

pgCamelCase.inject(pg);

// Function to validate environment variables
function validateEnv() {
  const requiredEnvVars = [
    "DB_USER",
    "DB_PASSWORD",
    "DB_HOST",
    "DB_DATABASE",
    "DB_CONNECTION_LIMIT",
  ];
  let allValid = false; // Initialize as FALSE

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar] || process.env[envVar].trim() === "") {
      console.error(
        `Missing or empty required environment variable: ${envVar}`
      );
      allValid = false;
    } else {
      console.log(`Environment variable ${envVar}: ${process.env[envVar]}`);
      allValid = true;
    }
  });

  return allValid;
}

// Validate environment variables before using them
if (!validateEnv()) {
  console.error("Environment variable validation failed. Exiting...");
  process.exit(1);
}

const pool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  max: process.env.DB_CONNECTION_LIMIT,
});

// Monkey patch .query(...) method to console log all queries before executing it
// For debugging purpose
const oldQuery = pool.query;
pool.query = function (...args) {
  const [sql, params] = args;
  console.log(`EXECUTING QUERY |`, sql, params);
  return oldQuery.apply(pool, args);
};

module.exports = pool;
