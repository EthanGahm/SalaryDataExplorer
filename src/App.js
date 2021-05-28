import React from "react";
import Home from "./Components/Home";
import FilterAndSearch from "./Components/FilterAndSearch";
import DataSummary from "./Components/DataSummary";
import { Switch, Route, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/DataSummary" component={DataSummary} />
        <Route path="/FilterAndSearch" component={FilterAndSearch} />
      </Switch>
    </BrowserRouter>
  );
}
