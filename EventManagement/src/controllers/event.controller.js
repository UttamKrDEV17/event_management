import * as EventModel from '../models/eventModel.js';
import * as UserModel from '../models/userModel.js';

export const createEvent = async (req, res) => {
  try {
    const { title, datetime, location, capacity } = req.body;

    if (!title || !datetime || !location || !capacity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (capacity <= 0 || capacity > 1000) {
      return res.status(400).json({ error: 'Capacity must be between 1 and 1000' });
    }

    const event = await EventModel.createEvent({ title, datetime, location, capacity });
    res.status(201).json({ message: 'event created successfully.',id: event.id });
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(409).json({ error: 'An event with this title, date, and location already exists.' });
    }
    res.status(500).json({ error: 'Failed to create event' });

  }
};

export const getEventDetails = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await EventModel.getEventById(eventId);

    if (!event) return res.status(404).json({ error: 'Event not found' });

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event details' });
  }
};

export const registerUser = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { userId } = req.body;

    const user = await UserModel.getUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isPast = await EventModel.isEventPast(eventId);
    if (isPast) return res.status(400).json({ error: 'Cannot register for past events' });

    const isFull = await EventModel.isEventFull(eventId);
    if (isFull) return res.status(400).json({ error: 'Event is full' });

    const alreadyRegistered = await EventModel.isUserRegistered(userId, eventId);
    if (alreadyRegistered) return res.status(400).json({ error: 'User already registered' });

    await EventModel.registerUserToEvent(userId, eventId);
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const cancelRegistration = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.params.userId;

    const registered = await EventModel.isUserRegistered(userId, eventId);
    if (!registered) return res.status(400).json({ error: 'User is not registered for this event' });

    await EventModel.cancelRegistration(userId, eventId);
    res.status(200).json({ message: 'Registration cancelled' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel registration' });
  }
}

export const getUpcomingEvents = async (req, res) => {
  try {
    const events = await EventModel.getUpcomingEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get upcoming events' });
  }
};

// Event Stats
export const getEventStats = async (req, res) => {
  try {
    const eventId = req.params.id;
    const stats = await EventModel.getEventStats(eventId);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get event stats' });
  }
};
