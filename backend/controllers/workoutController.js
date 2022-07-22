const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET All Workouts

const getWorkouts = async(req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
}

// Get a Single Workout

const getWorkout = async(req, res) => {
  console.log(req.params);
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(200).json(workout);
}

// Create New Workout

const createWorkout = async(req, res) => {
  const {title, reps, load} = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  // add doc to db
  try {
    const workout = await Workout.create({title, reps, load});
    res.status(200).json(workout);
  } catch(err) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a Workout

const deleteWorkout = async(req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const workout = await Workout.findOneAndDelete({_id: id});

  if (!workout) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(200).json(workout);
}

// Update a Workout

const updateWorkout = async(req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  }, {new: true});

  if (!workout) {
    return res.status(404).json({ error: 'Not found'});
  }
  res.status(200).json(workout);
}


module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}
