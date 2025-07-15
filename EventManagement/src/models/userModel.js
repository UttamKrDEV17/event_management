import { pool } from '../config/db.js';

export const createUser = async ({ name, email }) => {
  const result = await pool.query(
    `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
    [name, email]
  );
  return result.rows[0];
};

export const getUserById = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [userId]
  );
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};
