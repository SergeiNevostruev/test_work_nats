import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
// dotenv.config();

export default new DataSource({
  type: "postgres",
  host: "0.0.0.0",
  port: 5432,
  username: "developer",
  password: "developer",
  database: "storage",
  synchronize: false,
  cache: false,
  entities: ["models/database/entity/**/*.ts"],
  migrations: ["models/database/migrations/**/*.ts"],
});

// export default new DataSource({
//   type: "postgres",
//   host: String(process.env.POSTGRES_HOST) || "0.0.0.0",
//   port: Number(process.env.POSTGRES_PORT) || 5432,
//   username: String(process.env.POSTGRES_USER) || "developer",
//   password: String(process.env.POSTGRES_PASSWORD) || "developer",
//   database: String(process.env.POSTGRES_DB) || "storage",
//   synchronize: false,
//   cache: false,
//   entities: ["models/database/entity/**/*.ts"],
//   migrations: ["models/database/migrations/**/*.ts"],
// });
