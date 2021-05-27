import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export default function WebsiteTitle({ text }) {
  return (
    <Typography component="h1" variant="h6" color="inherit" noWrap>
      {text}
    </Typography>
  );
}
