import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
/**
 * This component displays the copyright for the application
 * @returns text displaying the copyright
 */
export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {/* link for the copyright */}
      <Link color="inherit" href="https://devhub.virginia.edu/">
        UVA DevHub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
