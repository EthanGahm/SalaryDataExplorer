import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import TimelineIcon from "@material-ui/icons/Timeline";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import Typography from "@material-ui/core/Typography";
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
  </div>
);

export default mainListItems;
