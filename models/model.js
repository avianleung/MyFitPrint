const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const exerciseSchema = mongoose.Schema(
  {
    exercise: reqString,
    sets: reqString,
    reps: reqString,
  },
  {
    timestamps: true,
  }
);

const workoutSchema = mongoose.Schema(
  {
    split: reqString,
    date: reqString,
    exercises: [exerciseSchema],
  },
  { timestamps: true }
);

module.exports = (mongoose) => {
  const Workout = mongoose.model("workout", workoutSchema);

  return Workout;
};
