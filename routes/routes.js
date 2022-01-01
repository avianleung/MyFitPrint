module.exports = (app) => {
  const workouts = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create a new Workout
  router.post("/", workouts.create);

  // Retrieve all Workouts
  router.get("/:date", workouts.findByDate);

  // Add an Exercise with Workout id
  router.post("/:id", workouts.addExerciseData);

  // Update a Workout with id
  router.put("/:id", workouts.updateExercise);

  // Delete an Exercise with id
  router.delete("/:id/:exerciseId", workouts.deleteExerciseData);

  // Update an Exercise with id
  router.put("/:id/:exerciseId", workouts.updateExerciseData);

  // Delete a Workout with id
  router.delete("/:id", workouts.delete);

  app.use("/api/workouts", router);
};
