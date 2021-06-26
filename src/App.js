import React from "react";
import Home from "./Components/Home";
import FilterAndSearch from "./Components/FilterAndSearch";
import DataSummary from "./Components/DataSummary";
import Graph from "./Components/Graph";
import AddResponse from "./Components/AddResponse";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import getLocationsFromJSON from "./HelperMethods/ExtractLocationFromJSON";
import DataComparisons from "./Components/DataComparisons";
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/DataSummary" component={DataSummary} />
        <Route path="/DataComparisons" component={DataComparisons} />
        <Route path="/FilterAndSearch" component={FilterAndSearch} />
        <Route path="/graph" component={Graph} />
        <Route path="/AddResponse" component={AddResponse} />
      </Switch>
    </BrowserRouter>
  );
}
