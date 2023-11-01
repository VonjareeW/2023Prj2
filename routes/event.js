const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/api/events', eventController.getAllEvents);
router.post('/api/events', eventController.createEvent);
router.put('/api/events/:id', eventController.updateEvent);
router.delete('/api/events/:id', eventController.deleteEvent);

module.exports = router;