import "../App.css";
import React, { useState } from "react";
import DataService from "../services/service";
import { makeStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, TextField, IconButton } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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

function EditExercise(props) {
  const classes = useStyles();

  const [set, setSet] = useState(props.exerciseData.set);
  const [reps, setReps] = useState(props.exerciseData.reps);
  const [weight, setWeight] = useState(props.exerciseData.weight);

  function editExercise() {
    const body = {
      set,
      reps,
      weight,
    };

    DataService.editExercise(props.id, props.exerciseId, body)
      .then((response) => {
        if (response.data) {
          const workoutsArray = [...props.workouts];
          workoutsArray[props.i] = response.data;
          props.setWorkouts(workoutsArray);
          props.setCurrentlyEditing([null, null]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function deleteExercise(workoutId, exerciseId, index) {
    DataService.deleteExercise(workoutId, exerciseId)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          const workoutsArray = [...props.workouts];
          workoutsArray[index] = response.data;
          props.setWorkouts(workoutsArray);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <TableRow key={props.exerciseId}>
      <TableCell component='th' scope='row' style={{ paddingLeft: 0 }}>
        <TextField
          autoFocus
          variant="standard"
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          name='set'
          value={set}
          onChange={(e) => setSet(e.target.value)}
        />
      </TableCell>
      <TableCell align='left' style={{ paddingLeft: 0 }}>
        <TextField
          variant="standard"
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          name='sets'
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      </TableCell>
      <TableCell align='left' style={{ paddingLeft: 0 }}>
        <TextField
          variant="standard"
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          name='weight'
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </TableCell>
      <TableCell align='right' style={{ paddingRight: 0 }}>
        <IconButton
          style={{ padding: 0 }}
          onClick={() => editExercise()}
        >
          <CheckCircleOutlineOutlinedIcon fontSize='small' color="primary" />
        </IconButton>
      </TableCell>
      <TableCell align='right' style={{ paddingRight: 0 }}>
        <IconButton
          style={{ padding: 0 }}
          onClick={() =>
            deleteExercise(props.id, props.exerciseId, props.i)
          }
        >
          <DeleteOutlineOutlinedIcon fontSize='small' sx={{ color: "red" }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default EditExercise;
