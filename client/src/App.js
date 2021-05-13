import React from "react";
import Workout from "./components/Workout";
import { Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Workout} />
    </Switch>
  );
}

export default App;
