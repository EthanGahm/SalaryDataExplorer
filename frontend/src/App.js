import React from "react";
import Home from "./Components/Home";
import FilterAndSearch from "./Components/FilterAndSearch";
import DataSummary from "./Components/DataSummary";
import Graph from "./Components/Graph";
import AddResponse from "./Components/AddResponse";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import getLocationsFromJSON from "./HelperMethods/ExtractLocationFromJSON";
const link = "http://3.84.121.75:5000/api/salary_data/all_2021";
export default function App() {
  getLocationsFromJSON(link);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/DataSummary" component={DataSummary} />
        <Route path="/FilterAndSearch" component={FilterAndSearch} />
        <Route path="/graph" component={Graph} />
        <Route path="/AddResponse" component={AddResponse} />
      </Switch>
    </BrowserRouter>
  );
}
