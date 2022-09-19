import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import MainScreen from "./screens/MainScreen/MainScreen";
import ProblemScreen from "./screens/ProblemScreen/ProblemScreen";
import Success from "./screens/Success/Success";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/mainscreen" component={MainScreen} />
        <Route path="/problem/:id" component={ProblemScreen} />
        <Route path="/success/:id" component={Success} />
        <Route path="/" component={HomeScreen} />
      </Switch>
    </div>
  );
}

export default App;
