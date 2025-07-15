import { pool } from '../config/db.js';

export const createEvent = async ({ title, datetime, location, capacity }) => {
  const result = await pool.query(
    `INSERT INTO events (title, datetime, location, capacity)
     VALUES ($1, $2, $3, $4) RETURNING id`,
    [title, datetime, location, capacity]
  );
  return result.rows[0];
};

export const getEventById = async (eventId) => {
  const eventResult = await pool.query(
    `SELECT * FROM events WHERE id = $1`,
    [eventId]
  );

  const usersResult = await pool.query(
    `SELECT users.id, users.name, users.email
     FROM registrations
     JOIN users ON users.id = registrations.user_id
     WHERE registrations.event_id = $1`,
    [eventId]
  );

  return {
    ...eventResult.rows[0],
    registrations: usersResult.rows,
  };
};

export const registerUserToEvent = async (userId, eventId) => {
  await pool.query(
    `INSERT INTO registrations (user_id, event_id) VALUES ($1, $2)`,
    [userId, eventId]
  );
};

export const isUserRegistered = async (userId, eventId) => {
  const result = await pool.query(
    `SELECT 1 FROM registrations WHERE user_id = $1 AND event_id = $2`,
    [userId, eventId]
  );
  return result.rowCount > 0;
};

export const getEventStats = async (eventId) => {
  const event = await pool.query(`SELECT capacity FROM events WHERE id = $1`, [eventId]);
  const capacity = event.rows[0]?.capacity;

  const registered = await pool.query(
    `SELECT COUNT(*) FROM registrations WHERE event_id = $1`,
    [eventId]
  );

  const total = parseInt(registered.rows[0].count);
  return {
    totalRegistrations: total,
    remainingCapacity: capacity - total,
    percentageUsed: ((total / capacity) * 100).toFixed(2),
  };
};

export const cancelRegistration = async (userId, eventId) => {
  const result = await pool.query(
    `DELETE FROM registrations WHERE user_id = $1 AND event_id = $2`,
    [userId, eventId]
  );
  return result.rowCount > 0;
};

export const getUpcomingEvents = async () => {
  const result = await pool.query(
    `SELECT * FROM events
     WHERE datetime > NOW()
     ORDER BY datetime ASC, location ASC`
  );
  return result.rows;
};

export const isEventFull = async (eventId) => {
  const result = await pool.query(
    `SELECT COUNT(*) FROM registrations WHERE event_id = $1`,
    [eventId]
  );
  const registered = parseInt(result.rows[0].count);

  const capacityResult = await pool.query(
    `SELECT capacity FROM events WHERE id = $1`,
    [eventId]
  );
  const capacity = capacityResult.rows[0]?.capacity;

  return registered >= capacity;
};

export const isEventPast = async (eventId) => {
  const result = await pool.query(
    `SELECT datetime FROM events WHERE id = $1`,
    [eventId]
  );
  const eventTime = result.rows[0]?.datetime;
  return new Date(eventTime) < new Date();
};
