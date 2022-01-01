import "../App.css";
import React, { Fragment, useState, useEffect } from "react";
import DataService from "../services/service";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditAttributesOutlinedIcon from '@mui/icons-material/EditAttributesOutlined';

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
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
}));


function Workout(props) {
  useEffect(() => {
    const { date } = props

    DataService.findByDate(date)
      .then((response) => {
        if (response.data) {
          setWorkouts(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props]);

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
    <div className={classes.root} style={{ paddingBottom: "7%" }}>
      <Grid container>
        <Grid item xs={12}>
          <Button
            variant='contained'
            style={{ width: "100%", /* marginTop: "5%", */ marginBottom: "5%" }}
            onClick={() => setAddNew(true)}
          >
            ADD EXERCISE
          </Button>
          <AddWorkout addNew={addNew} setAddNew={setAddNew} date={props.date} setWorkouts={setWorkouts}/>
          <Fragment >
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
                          <b>{workout.exercise}</b>
                        </Typography>
                        <IconButton
                          style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                            paddingRight: 0,
                          }}
                          onClick={() => setCurrentlyEditingWorkout(i)}
                        >
                          <EditAttributesOutlinedIcon sx={{ color: "black" }}  />
                        </IconButton>
                      </div>
                    }
                  />
                )}
                <CardContent style={{ paddingBottom: 0 }}>
                  <Table className={classes.table} size='small'>
                    <TableHead>
                      <TableRow style={{ paddingBottom: 0, paddingTop: 0 }}>
                        {["Set", "Reps", "Weight"].map((title, i2) => (
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
                      {workout?.exerciseData?.map((exerciseData, i3) => (
                        <Fragment>
                          {arrayEquals(currentlyEditing, [i, i3]) ? (
                            <EditExercise
                              setCurrentlyEditing={setCurrentlyEditing}
                              id={workout._id}
                              exerciseId={exerciseData._id}
                              workouts={workouts}
                              setWorkouts={setWorkouts}
                              exerciseData={exerciseData}
                              i={i}
                              i3={i3}
                            />
                          ) : (
                            <TableRow key={exerciseData._id}>
                              <TableCell
                                component='th'
                                scope='row'
                                style={{
                                  width: "25%",
                                  fontWeight: "lighter",
                                  paddingLeft: 0,
                                }}
                              >
                                {exerciseData.set}
                              </TableCell>
                              <TableCell
                                align='left'
                                style={{
                                  width: "25%",
                                  fontWeight: "lighter",
                                  paddingLeft: 0,
                                }}
                              >
                                {exerciseData.reps}
                              </TableCell>
                              <TableCell
                                align='left'
                                style={{
                                  width: "25%",
                                  fontWeight: "lighter",
                                  paddingLeft: 0,
                                }}
                              >
                                {exerciseData.weight}
                              </TableCell>
                              <TableCell />
                              <TableCell
                                align='right'
                                style={{ paddingRight: 0 }}
                              >
                                <IconButton
                                  style={{ padding: 0 }}
                                  onClick={() => setCurrentlyEditing([i, i3])}
                                >
                                  <ArrowLeftOutlinedIcon fontSize='small' />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          )}
                        </Fragment>
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
                              <AddOutlinedIcon
                                fontSize='small'
                                sx={{ color: "black" }}
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
          </Fragment>
        </Grid>
      </Grid>
    </div>
  );
}

export default Workout;
