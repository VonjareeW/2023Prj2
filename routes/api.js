const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');
const goalController = require('../controllers/goalController');

router.get('/api/events', eventController.getAllEvents);
router.get('/api/events/:id', eventController.getEventById);
router.post('/api/events', eventController.createEvent);
router.put('/api/events/:id', eventController.updateEvent);
router.delete('/api/events/:id', eventController.deleteEvent);

router.get('/api/goals', goalController.getAllGoals);
router.get('/api/goals/:id', goalController.getGoalById);
router.post('/api/goals', goalController.createGoal);
router.put('/api/goals/:id', goalController.updateGoal);
router.delete('/api/goals/:id', goalController.deleteGoal);

module.exports = router;