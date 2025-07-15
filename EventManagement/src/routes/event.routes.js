import express from 'express';
import {
  createEvent,
  getEventDetails,
  registerUser,
  cancelRegistration,
  getUpcomingEvents,
  getEventStats
} from '../controllers/event.controller.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/:id', getEventDetails);
router.post('/:id/register', registerUser);
router.delete('/:id/cancel/:userId', cancelRegistration);
router.get('/upcoming/list', getUpcomingEvents);
router.get('/:id/stats', getEventStats);

export default router;
