const express = require('express');
const Workout = require('../models/workoutModel');
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController');

const router = express.Router();

// Get All Workouts

router.get('/', getWorkouts);

// Get a Single Workout

router.get('/:id', getWorkout);

// Post a New Workout

router.post('/', createWorkout);

// Delete a Workout

router.delete('/:id', deleteWorkout);

// Update a Workout

router.patch('/:id', updateWorkout);


module.exports = router;
