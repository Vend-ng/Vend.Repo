const IS_PROD = process.env.NODE_ENV === "production";
const ROOT_DIR = IS_PROD ? "build" : "src";

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST || "127.0.0.1",
  username: process.env.DB_USERNAME || "vending",
  password: process.env.DB_PASSWORD || "vending",
  database: process.env.DB_TABLE || "vending",
  port: process.env.DB_PORT || 5432,
  logging: true,
  logger: "advanced-console",
  cache: true,
  // See src/main.ts as to why these are all false
  // Should we automatically synchronize our database?
  synchronize: true,
  // Run migrations automatically,
  migrationsRun: true,
  // Should we automatically drop the entire database on start?
  dropSchema: true,
  entities: [`${ROOT_DIR}/resources/**/index{.js,.ts}`],
  migrations: [`${ROOT_DIR}/migrations/**/*{.js,.ts}`],
  subscribers: [`${ROOT_DIR}/subscribers/**/*{.js.ts}`],
  cli: {
    entitiesDir: `${ROOT_DIR}/entities`,
    migrationsDir: `${ROOT_DIR}/migrations`,
    subscribersDir: `${ROOT_DIR}/subscribers`
  }
};
