import "../App.css";
import React, { useState } from "react";
import DataService from "../services/service";
import { makeStyles } from "@material-ui/core/styles";
import { TableCell, TableRow, TextField, IconButton } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

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

function AddExercise(props) {
  const classes = useStyles();

  const [set, setSet] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  function createNewExercise() {
    const body = {
      set,
      reps,
      weight,
    };

    DataService.addExercise(props.id, body)
      .then((response) => {
        if (response.data) {
          const workoutsArray = [...props.workouts];
          workoutsArray[props.i] = response.data;
          props.setWorkouts(workoutsArray);
          props.setCurrentlyAdding(null);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <TableRow>
      <TableCell
        component='th'
        scope='row'
        style={{ paddingLeft: 0, borderBottom: "none", paddingBottom: "32px" }}
      >
        <TextField
          variant="standard"
          autoFocus
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          value={set}
          onChange={(e) => setSet(e.target.value)}
        />
      </TableCell>
      <TableCell
        align='left'
        style={{ paddingLeft: 0, borderBottom: "none", paddingBottom: "32px" }}
      >
        <TextField
          variant="standard"
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      </TableCell>
      <TableCell
        align='left'
        style={{ paddingLeft: 0, borderBottom: "none", paddingBottom: "32px" }}
      >
        <TextField
          variant="standard"
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </TableCell>

      <TableCell
        align='right'
        style={{ paddingRight: 0, borderBottom: "none", paddingBottom: "32px" }}
      >
        <IconButton style={{ padding: 0 }} onClick={() => createNewExercise()}>
          <CheckCircleOutlineOutlinedIcon fontSize='small' />
        </IconButton>
      </TableCell>
      <TableCell
        align='right'
        style={{ paddingRight: 0, borderBottom: "none", paddingBottom: "32px" }}
      >
        <IconButton
          style={{ padding: 0 }}
          onClick={() => props.setCurrentlyAdding(null)}
        >
          <CancelOutlinedIcon fontSize='small' />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default AddExercise;
