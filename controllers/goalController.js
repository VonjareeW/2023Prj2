const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// Create a new goal
const createGoal = async (req, res) => {
    try {
        const goalData = req.body;
        const goal = new Goal(goalData);
        // Save the goal to the database
        goal.save()
            .then(savedGoal => {
                res.status(201).json({ message: 'Goal created', event: savedGoal });
            })
            .catch(error => {
                res.status(400).json({ message: 'Goal creation failed', error: error.message });
            });
        } catch (error) {
            res.status(400).json({ message: 'Goal creation failed', error: error.message });
        }
};

// Get all goals
const getAllGoals = async (req, res) => {
    try {
        const userId = req.user.id;
        // Retrieve events for the user from the database using the Goal model
        Goal.find({ userId: userId })
            .then(goals => {
                res.status(200).json({ goals });
            })
            .catch(error => {
                res.status(400).json({ message: 'Failed to retrieve goals', error: error.message });
            });
        } catch (error) {
            res.status(400).json({ message: 'Failed to retrieve goals', error: error.message });
        }   
};

// Update a goal by ID
const updateGoal = async (req, res) => {
    try{
        const goalId = req.params.id;
        const goalData = req.body;

        Goal.findByIdAndUpdate(goalId, goalData, { new: true })
        .then(updatedGoal => {
            if (!updatedGoal) {
                return res.status(404).json({ message: 'Goal not found' });
            }
            res.status(200).json({ message: 'Goal updated', event: updatedGoal });
        })
        .catch(error => {
            res.status(400).json({ message: 'Goal update failed', error: error.message });
        });
    } catch (error) {
        res.status(400).json({ message: 'Goal update failed', error: error.message })
    }
};

// Delete a goal by ID
const deleteGoal = async (req, res) => {
    try {
        const goalId = req.params.id;
        Goal.findByIdAndRemove(goalId)
            .then(removedGoal => {
                if (!removedGoal) {
                    return res.status(404).json({ message: 'Goal not found' });
                }
                res.status(204).json(); // 204 means No Content (successfully deleted)
            })
            .catch(error => {
                res.status(400).json({ message: 'Goal deletion failed', error: error.message });
            });
    } catch (error) {
        res.status(400).json({ message: 'Goal deletion failed', error: error.message });
    }
};

module.exports = {
    createGoal,
    getAllGoals,
    updateGoal,
    deleteGoal,
};
