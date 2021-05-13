import "../App.css";
import React, { useState, useEffect } from "react";
import DataService from "../services/service";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Container from "@material-ui/core/Container";
import Navbar from "./components/Navbar";

import AddExercise from "./AddExercise";
import EditExercise from "./EditExercise";
import AddWorkout from "./AddWorkout";
import EditWorkout from "./EditWorkout";

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
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
    },
  },
}));

function Workout() {
  useEffect(() => {
    DataService.findAll()
      .then((response) => {
        if (response.data) {
          setWorkouts(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [workouts, setWorkouts] = useState([]);

  const [currentlyEditingWorkout, setCurrentlyEditingWorkout] = useState(null);
  const [currentlyEditing, setCurrentlyEditing] = useState([null, null]);
  const [currentlyAdding, setCurrentlyAdding] = useState(null);
  const [addNew, setAddNew] = useState(false);

  function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }

  function deleteExercise(workoutId, exerciseId, index) {
    DataService.deleteExercise(workoutId, exerciseId)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          const workoutsArray = [...workouts];
          workoutsArray[index] = response.data;
          setWorkouts(workoutsArray);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const classes = useStyles();
  return (
    <div className='App' style={{ height: "100vh" }}>
      <Navbar />
      <Container maxWidth='sm'>
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={12}>
              <Button
                variant='outlined'
                color='primary'
                style={{ width: "100%", marginTop: "5%", marginBottom: "5%" }}
                onClick={() => setAddNew(true)}
              >
                NEW
              </Button>
              <AddWorkout addNew={addNew} setAddNew={setAddNew} />
              {workouts.map((workout, i) => (
                <React.Fragment key={workout._id}>
                  <Card
                    className={classes.paper}
                    style={{ borderColor: "#3F4D67" }}
                  >
                    {currentlyEditingWorkout === i ? (
                      <EditWorkout
                        i={i}
                        workouts={workouts}
                        setWorkouts={setWorkouts}
                        workout={workout}
                        setCurrentlyEditingWorkout={setCurrentlyEditingWorkout}
                      />
                    ) : (
                      <CardHeader
                        title={
                          <div className={classes.heading}>
                            <Typography
                              style={{ display: "inline-block" }}
                              variant='h6'
                            >
                              <b>{workout.split}</b>
                            </Typography>
                            <IconButton
                              style={{
                                paddingBottom: 0,
                                paddingTop: 0,
                                paddingRight: 0,
                              }}
                              onClick={() => setCurrentlyEditingWorkout(i)}
                            >
                              <RemoveCircleOutlineIcon color='secondary' />
                            </IconButton>
                          </div>
                        }
                        subheader={
                          <div className={classes.heading}>
                            <Typography
                              style={{ display: "inline-block" }}
                              variant='subtitle1'
                            >
                              {workout.date}
                            </Typography>
                          </div>
                        }
                      />
                    )}
                    <CardContent style={{ paddingBottom: 0 }}>
                      <Table className={classes.table} size='small'>
                        <TableHead>
                          <TableRow style={{ paddingBottom: 0, paddingTop: 0 }}>
                            {["Exercise", "Sets", "Reps"].map((title, i2) => (
                              <TableCell
                                key={i2}
                                align={i2 > 0 ? "left" : "inherit"}
                                style={{ paddingLeft: 0 }}
                              >
                                {title}
                              </TableCell>
                            ))}
                            <TableCell />
                            <TableCell />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {workout.exercises.map((exercise, i3) => (
                            <TableRow key={exercise._id}>
                              {arrayEquals(currentlyEditing, [i, i3]) ? (
                                <EditExercise
                                  setCurrentlyEditing={setCurrentlyEditing}
                                  id={workout._id}
                                  exerciseId={exercise._id}
                                  workouts={workouts}
                                  setWorkouts={setWorkouts}
                                  exercise={exercise}
                                  i={i}
                                  i3={i3}
                                />
                              ) : (
                                <React.Fragment>
                                  <TableCell
                                    component='th'
                                    scope='row'
                                    style={{
                                      width: "25%",
                                      fontWeight: "lighter",
                                      paddingLeft: 0,
                                    }}
                                  >
                                    {exercise.exercise}
                                  </TableCell>
                                  <TableCell
                                    align='left'
                                    style={{
                                      width: "25%",
                                      fontWeight: "lighter",
                                      paddingLeft: 0,
                                    }}
                                  >
                                    {exercise.sets}
                                  </TableCell>
                                  <TableCell
                                    align='left'
                                    style={{
                                      width: "25%",
                                      fontWeight: "lighter",
                                      paddingLeft: 0,
                                    }}
                                  >
                                    {exercise.reps}
                                  </TableCell>
                                  <TableCell
                                    align='right'
                                    style={{ paddingRight: 0 }}
                                  >
                                    <IconButton
                                      style={{ padding: 0 }}
                                      onClick={() =>
                                        setCurrentlyEditing([i, i3])
                                      }
                                    >
                                      <EditOutlinedIcon fontSize='small' />
                                    </IconButton>
                                  </TableCell>
                                  <TableCell
                                    align='right'
                                    style={{ paddingRight: 0 }}
                                  >
                                    <IconButton
                                      style={{ padding: 0 }}
                                      onClick={() =>
                                        deleteExercise(
                                          workout._id,
                                          exercise._id,
                                          i
                                        )
                                      }
                                    >
                                      <DeleteOutlineOutlinedIcon fontSize='small' />
                                    </IconButton>
                                  </TableCell>
                                </React.Fragment>
                              )}
                            </TableRow>
                          ))}
                          {currentlyAdding === i ? (
                            <AddExercise
                              setCurrentlyAdding={setCurrentlyAdding}
                              id={workout._id}
                              workouts={workouts}
                              setWorkouts={setWorkouts}
                              i={i}
                            />
                          ) : (
                            <TableRow>
                              <TableCell id='cell-border-none' />
                              <TableCell id='cell-border-none' />
                              <TableCell id='cell-border-none' />
                              <TableCell id='cell-border-none' />
                              <TableCell
                                id='cell-border-none'
                                align='right'
                                style={{ paddingRight: 0 }}
                              >
                                <IconButton
                                  style={{ padding: 0 }}
                                  onClick={() => setCurrentlyAdding(i)}
                                >
                                  <AddCircleOutlineOutlinedIcon
                                    color='primary'
                                    fontSize='small'
                                  />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  <br />
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default Workout;
