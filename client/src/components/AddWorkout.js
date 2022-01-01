import "../App.css";
import React, { useState } from "react";
import DataService from "../services/service";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, TextField, IconButton } from "@material-ui/core";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

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

function AddWorkout(props) {
  const classes = useStyles();

  const [exercise, setExercise] = useState("");

  function createNewWorkout() {
    const body = {
      date: props.date,
      exercise,
    };

    DataService.createNew(body)
      .then((response) => {
        if (response.data) {
          DataService.findByDate(props.date)
            .then((response) => {
              if (response.data) {
                props.setWorkouts(response.data);
                props.setAddNew(false)
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      {props.addNew && (
        <Card className={classes.paper} style={{ marginBottom: "5%" }}>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TextField
                label='Exercise'
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
              />
              <IconButton
                style={{ padding: 0 }}
                onClick={() => props.setAddNew(false)}
              >
                <CancelOutlinedIcon
                  fontSize='small'
                  style={{ color: "#3f51b5" }}
                />
              </IconButton>
              <IconButton
                style={{ padding: 0 }}
                onClick={() => createNewWorkout()}
              >
                <CheckCircleOutlineOutlinedIcon
                  fontSize='small'
                  style={{ color: "#3f51b5" }}
                />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AddWorkout;
