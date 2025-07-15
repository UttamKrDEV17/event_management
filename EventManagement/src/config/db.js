import {Pool} from "pg";
import fs from "fs";
import path from "path";

const pool = new Pool({
    user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: {
    ca: fs.readFileSync(path.resolve("../EventManagement/src/config/ca.pem")).toString(),
    rejectUnauthorized: 'true'
  }
})

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => {
    console.error('PostgreSQL connection error:', err.message);
    process.exit(-1);
  });


pool.on('error', (err) => {
  console.error('Error connecting to PostgreSQL:', err);
  // It's a good practice to terminate the process or attempt to gracefully shut down if the DB connection is critical.
  process.exit(-1);
});

export const query = (text,params) => pool.query(text,params);
export {pool}