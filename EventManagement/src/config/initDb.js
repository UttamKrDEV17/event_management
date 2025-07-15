// src/config/initDb.js
import { pool } from './db.js';

export const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      UNIQUE (email)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      datetime TIMESTAMP NOT NULL,
      location VARCHAR(255) NOT NULL,
      capacity INTEGER CHECK (capacity > 0 AND capacity <= 1000),
      UNIQUE (title, datetime, location)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS registrations (
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id, event_id)
    );
  `);

  console.log("Database initialized");
};
