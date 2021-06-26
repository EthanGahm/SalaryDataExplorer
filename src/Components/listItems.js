import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import TimelineIcon from "@material-ui/icons/Timeline";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import Typography from "@material-ui/core/Typography";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Link to="/" style={{ textDecoration: "none", color: "#558aac" }}>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link
      to="/DataSummary"
      style={{ textDecoration: "none", color: "#558aac" }}
    >
      <ListItem button>
        <ListItemIcon>
          <TimelineIcon />
        </ListItemIcon>
        <ListItemText primary="Data Summary" />
      </ListItem>
    </Link>
    <Link
      to="/DataComparisons"
      style={{ textDecoration: "none", color: "#558aac" }}
    >
      <ListItem button>
        <ListItemIcon>
          <CompareArrowsIcon />
        </ListItemIcon>
        <ListItemText primary="Comparing Datasets" />
      </ListItem>
    </Link>
    <Link
      to="/FilterAndSearch"
      style={{ textDecoration: "none", color: "#558aac" }}
    >
      <ListItem button>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Filter and Search" />
      </ListItem>
    </Link>
    <Link
      to="/AddResponse"
      style={{ textDecoration: "none", color: "#558aac" }}
    >
      <ListItem button>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add a Response" />
      </ListItem>
    </Link>
  </div>
);

export default mainListItems;
