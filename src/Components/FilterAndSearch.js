import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems } from "./listItems";
import Title from "./Title";
import Copyright from "./Copyright";
import useStyles from "./UseStyles.js";
import Slider from "@material-ui/core/Slider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

// Passing in a map array to the search bar function, may be useful when extracting jobs from spreadsheet
var industryOptions = ["Doctor", "Software Engineer", "Teacher", "Professor"];
var options = industryOptions.map((opt) => ({ label: opt, value: opt }));

// Hardcoded labels for search bar
// const industryOptions = [
//   { label: 'Software Engineer', value: 'Software Engineer' },
//   { label: 'Doctor', value: 'Doctor'},
// ];

export default function Search() {
  const industryOptions = [
    { label: "Doctor", value: "Doctor" },
    { label: "Teacher", value: "Teacher" },
    { label: "Lawyer", value: "Lawyer" },
    { label: "Software Engineer", value: "Software Engineer" },
  ];

  const genderOptions = [
    { label: "Woman", value: "Woman" },
    { label: "Man", value: "Man" },
    { label: "Non-binary", value: "Non-binary" },
    { label: "Other", value: "Other/NA" },
  ];

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // age range bar values
  function valuetext(value) {
    return `${value}`;
  }
  const [value, setValue] = React.useState([30, 50]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Title>Set Parameters and Search the Dataset</Title>
              {/* React-Select, taken from https://stackoverflow.com/questions/48930622/react-select-show-search-bar-in-dropdown  */}
              <div style={{ width: "300px" }}>
                <Box pt={3}>
                  Industry:
                  <Autocomplete
                    id="industry-dropdown"
                    options={industryOptions}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </Box>
              </div>
              <div style={{ width: "300px" }}>
                <Box pt={3}>
                  Job Title:
                  <Autocomplete
                    id="industry-dropdown"
                    options={options}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </Box>
              </div>
              {/* Age Range is taken from @material-ui https://material-ui.com/components/slider/ */}
              <Box pt={3}>
                Age Range:
                <div className={classes.root} style={{ width: "300px" }}>
                  <Typography id="range-slider" gutterBottom></Typography>
                  <Slider
                    min={18}
                    max={80}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                  />
                </div>
              </Box>

              <div style={{ width: "300px" }}>
                <Box pt={3}>
                  Gender:
                  <Autocomplete
                    id="industry-dropdown"
                    options={genderOptions}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </Box>
              </div>
              <div style={{ width: "300px" }}>
                <Box pt={3}>
                  Country:
                  <Autocomplete
                    id="industry-dropdown"
                    options={options}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </Box>
              </div>
              <div style={{ width: "300px" }}>
                <Box pt={3}>
                  State/Province:
                  <Autocomplete
                    id="industry-dropdown"
                    options={options}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </Box>
              </div>
              <div style={{ width: "300px" }}>
                <Box pt={3}>
                  City:
                  <Autocomplete
                    id="industry-dropdown"
                    options={options}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </Box>
              </div>
            </Grid>
          </Grid>
          <Box pt={5}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
