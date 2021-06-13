import React from "react";
import Home from "./Components/Home";
import FilterAndSearch from "./Components/FilterAndSearch";
import DataSummary from "./Components/DataSummary";
import Graph from "./Components/Graph";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import getData from "./Components/LocationCoordinates";

export default function App() {
  let data = getData()
  data.then((data)=>{

    console.log(data)
  })
  return (
    
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/DataSummary" component={DataSummary} />
        <Route path="/FilterAndSearch" component={FilterAndSearch} />
        <Route path="/graph" component={Graph} />
        <Route path="/coords" component={getData} />
      </Switch>
    </BrowserRouter>
  );
}
