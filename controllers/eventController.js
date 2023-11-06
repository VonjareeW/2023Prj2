const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create a new event
const createEvent = async (req, res) => {
    try {
        const eventData = req.body;
        // Create a new event using the Event model
        const event = new Event(eventData);
        // Save the event to the database
        event.save()
            .then(savedEvent => {
                res.status(201).json({ message: 'Event created', event: savedEvent });
            })
            .catch(error => {
                res.status(400).json({ message: 'Event creation failed', error: error.message });
            });
    } catch (error) {
        res.status(400).json({ message: 'Event creation failed', error: error.message });
    }
};

// Get events for a user
const getAllEvents = async (req, res) => {
    try {
        const userId = req.user.id;
        // Retrieve events for the user from the database using the Event model
        Event.find({ userId: userId })
            .then(events => {
                res.status(200).json({ events });
            })
            .catch(error => {
                res.status(400).json({ message: 'Failed to retrieve events', error: error.message });
            });
    } catch (error) {
        res.status(400).json({ message: 'Failed to retrieve events', error: error.message });
    }
};

const updateEvent = async (req, res) => {
    try{
        const eventId = req.params.id;
        const eventData = req.body;

        Event.findByIdAndUpdate(eventId, eventData, { new: true })
        .then(updatedEvent => {
            if (!updatedEvent) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.status(200).json({ message: 'Event updated', event: updatedEvent });
        })
        .catch(error => {
            res.status(400).json({ message: 'Event update failed', error: error.message });
        });
    } catch (error) {
        res.status(400).json({ message: 'Event update failed', error: error.message })
    }
};

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        Event.findByIdAndRemove(eventId)
            .then(removedEvent => {
                if (!removedEvent) {
                    return res.status(404).json({ message: 'Event not found' });
                }
                res.status(204).json(); // 204 means No Content (successfully deleted)
            })
            .catch(error => {
                res.status(400).json({ message: 'Event deletion failed', error: error.message });
            });
    } catch (error) {
        res.status(400).json({ message: 'Event deletion failed', error: error.message });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
};