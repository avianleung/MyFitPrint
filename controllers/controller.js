const db = require("../models");
const Workout = db.workouts;

// Create and Save a new Workout
exports.create = (req, res) => {
  // Validate request
  if (!req.body.date) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Workout
  const workout = new Workout({
    user: "placeholderUser",
    date: req.body.date,
    exercise: req.body.exercise,
    exerciseData: req.body.exerciseData,
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
exports.findByDate = (req, res) => {
  const date = req.params.date;

  Workout.find({date: date})
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

exports.updateExercise = (req, res) => {
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
exports.addExerciseData = (req, res) => {
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
        exerciseData: {
          set: req.body.set,
          reps: req.body.reps,
          weight: req.body.weight,
        },
      },
    },
    { useFindAndModify: false, returnOriginal: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot add exerciseData with Workout id=${id}. Maybe Workout was not found!`,
        });
      } else res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update a Workout by the id in the request
exports.updateExerciseData = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  const exerciseId = req.params.exerciseId;

  Workout.findOneAndUpdate(
    { _id: id, "exerciseData._id": exerciseId },
    {
      $set: {
        "exerciseData.$.set": req.body.set,
        "exerciseData.$.reps": req.body.reps,
        "exerciseData.$.weight": req.body.weight,
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
exports.deleteExerciseData = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  const exerciseDataId = req.params.exerciseId;

  Workout.findOneAndUpdate(
    { _id: id },
    {
      $pull: {
        exerciseData: {
          _id: exerciseDataId,
        },
      },
    },
    {  multi: true, useFindAndModify: false, returnOriginal: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete exercse with Workout id=${id}. Maybe Workout was not found!`,
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
