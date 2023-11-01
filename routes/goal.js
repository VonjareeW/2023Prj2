const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

router.get('/api/goals', goalController.getAllGoals);
router.post('/api/goals', goalController.createGoal);
router.put('/api/goals/:id', goalController.updateGoal);
router.delete('/api/goals/:id', goalController.deleteGoal);

module.exports = router;