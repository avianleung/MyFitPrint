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

  const [split, setSplit] = useState("");
  const [date, setDate] = useState("");

  function createNewWorkout() {
    const body = {
      split,
      date,
    };

    DataService.createNew(body)
      .then((response) => {
        if (response.data) {
          window.location.reload();
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
                label='Split'
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
                value={split}
                onChange={(e) => setSplit(e.target.value)}
              />
              <TextField
                label='Date'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
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
