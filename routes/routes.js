module.exports = (app) => {
  const workouts = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create a new Workout
  router.post("/", workouts.create);

  // Retrieve all Workouts
  router.get("/", workouts.findAll);

  // Add an Exercise with Workout id
  router.post("/:id", workouts.addExercise);

  // Update a Workout with id
  router.put("/:id", workouts.updateWorkout);

  // Delete an Exercise with id
  router.delete("/:id/:exerciseId", workouts.deleteExercise);

  // Update an Exercise with id
  router.put("/:id/:exerciseId", workouts.updateExercise);

  // Delete a Workout with id
  router.delete("/:id", workouts.delete);

  app.use("/api/workouts", router);
};
