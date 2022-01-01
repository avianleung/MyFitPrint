import "../App.css";
import React, { useState } from "react";
import DataService from "../services/service";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardHeader,
  Typography,
  TextField,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resize: {
    fontSize: 14,
  },
  resizeHeader: {
    fontSize: 19,
  },
  resizeSubheader: {
    fontSize: 14,
  },
}));

function EditWorkout(props) {
  const classes = useStyles();

  const [exercise, setExercise] = useState(props.workout.exercise);

  function deleteWorkout() {
    DataService.deleteWorkout(props.workout._id)
      .then((response) => {
        if (response.data) {
          const workoutsArray = [...props.workouts];
          workoutsArray.splice(props.i, 1);
          props.setWorkouts(workoutsArray);
          props.setCurrentlyEditingWorkout(null);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function editWorkout() {
    const body = { exercise };
    DataService.editWorkout(props.workout._id, body)
      .then((response) => {
        if (response.data) {
          const workoutsArray = [...props.workouts];
          workoutsArray[props.i] = response.data;
          props.setWorkouts(workoutsArray);
          props.setCurrentlyEditingWorkout(null);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <CardHeader
      title={
        <div className={classes.heading}>
          <TextField
            autoFocus
            InputProps={{
              classes: {
                input: classes.resizeHeader,
              },
            }}
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          />
          <div>
            <IconButton
              style={{ paddingBottom: 0, paddingTop: 0 }}
              onClick={() => editWorkout()}
            >
              <CheckCircleOutlineOutlinedIcon
                style={{ color: "#3f51b5", paddingRight: "16px" }}
              />
            </IconButton>
            <IconButton
              style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 0 }}
              onClick={() => deleteWorkout()}
            >
              <DeleteIcon style={{ color: "#3f51b5" }} />
            </IconButton>
          </div>
        </div>
      }
    />
  );
}

export default EditWorkout;
