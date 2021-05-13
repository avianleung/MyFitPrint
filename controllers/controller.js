const db = require("../models");
const Workout = db.workouts;

// Create and Save a new Workout
exports.create = (req, res) => {
  // Validate request
  if (!req.body.split) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Workout
  const workout = new Workout({
    split: req.body.split,
    date: req.body.date,
    exercises: req.body.exercises,
  });

  // Save Workout in the database
  workout
    .save(workout)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the workout.",
      });
    });
};

// Retrieve all Workouts from the database.
exports.findAll = (req, res) => {
  const split = req.query.split;
  var condition = split
    ? { split: { $regex: new RegExp(split), $options: "i" } }
    : {};

  Workout.find(condition)
    .sort({ date: -1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving workouts.",
      });
    });
};

// Find a single Workout with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Workout.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Workout with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Workout with id=" + id });
    });
};

exports.updateWorkout = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Workout.findOneAndUpdate({ _id: id }, req.body, {
    useFindAndModify: false,
    returnOriginal: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update workout with id=${id}. Maybe Workout was not found!`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Create an Exercse by the Workout id in the request
exports.addExercise = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Workout.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        exercises: {
          exercise: req.body.exercise,
          sets: req.body.sets,
          reps: req.body.reps,
        },
      },
    },
    { useFindAndModify: false, returnOriginal: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot add exercse with Workout id=${id}. Maybe Workout was not found!`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update a Workout by the id in the request
exports.updateExercise = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  const exerciseId = req.params.exerciseId;

  Workout.findOneAndUpdate(
    { _id: id, "exercises._id": exerciseId },
    {
      $set: {
        "exercises.$.exercise": req.body.exercise,
        "exercises.$.sets": req.body.sets,
        "exercises.$.reps": req.body.reps,
      },
    },
    { useFindAndModify: false, returnOriginal: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update workout with id=${id}. Maybe Workout was not found!`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete an Exercse by the Workout id in the request
exports.deleteExercise = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  const exerciseId = req.params.exerciseId;

  Workout.findOneAndUpdate(
    { _id: id },
    {
      $pull: {
        exercises: {
          _id: exerciseId,
        },
      },
    },
    { useFindAndModify: false, returnOriginal: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delere exercse with Workout id=${id}. Maybe Workout was not found!`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete a Workout with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Workout.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete workout with id=${id}. Maybe workout was not found!`,
        });
      } else {
        res.send({
          message: "Workout was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Workout with id=" + id,
      });
    });
};
