import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import ProTip from "./ProTip";
import Home from "./Components/Home";
import Search from "./Components/Search";
import Filter from "./Components/Filter";
import DataSummary from "./Components/DataSummary";
import Graph from "./Components/Graph";
import { Switch, Route, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/DataSummary" component={DataSummary} />
        <Route path="/Search" component={Search} />
        <Route path="/Filter" component={Filter} />
        <Route path="/graph" component={Graph} />
      </Switch>
    </BrowserRouter>
  );
}
