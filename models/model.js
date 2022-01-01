const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const exerciseDataSchema = mongoose.Schema(
  {
    set: reqString,
    reps: reqString,
    weight: reqString,
  },
  {
    timestamps: true,
  }
);

const workoutSchema = mongoose.Schema(
  {
    user: reqString,
    date: reqString,
    exercise: reqString,
    exerciseData: [exerciseDataSchema],
  },
  { timestamps: true }
);

module.exports = (mongoose) => {
  const Workout = mongoose.model("workout", workoutSchema);

  return Workout;
};
