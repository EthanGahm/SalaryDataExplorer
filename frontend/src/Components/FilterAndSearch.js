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
import Slider from '@material-ui/core/Slider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Tabletop from "tabletop";
import { useEffect, useState } from "react";


import MarkerMap from "./GoogleMaps.js";

export default function FilterAndSearch() {

  const [data, setData] = useState([]);

  // Industry data
  const industries = data.map(item => (item.Industry));
  const indset = new Set(industries);
  let indarray = [...indset];
  const industriesOptions = indarray.map(item => ({ label: item, value: item }));

  const options = industriesOptions.map((option) => {
    const firstLetter = option.label[0].toUpperCase();
    return {
      firstLetter: firstLetter,
      ...option,
    }
  })

  // Gender Data
  const genderOptions = [
    { label: 'Woman', value: 'Woman' },
    { label: 'Man', value: 'Man' },
    { label: 'Non-binary', value: 'Non-binary' },
    { label: 'Other', value: 'Other/NA' }
  ]

  // State/Province data
  const states = data.map(item => (item.State));
  const stateset = new Set(states);
  let statearray = [...stateset];
  const stateOptions = statearray.map(item => ({ label: item, value: item }));

  // Country data
  const countries = data.map(item => (item.Country));
  const countryset = new Set(countries);
  let countryarray = [...countryset];
  const countryOptions = countryarray.map(item => ({ label: item, value: item }));

  // City data
  const cities = data.map(item => (item.City));
  const cityset = new Set(cities);
  let cityarray = [...cityset];
  const cityOptions = cityarray.map(item => ({ label: item, value: item }));

  // Utilizes tabletop to get data from google spreadsheet
  useEffect(() => {
    Tabletop.init({
      key: "1bacAOGeeXSRUy5jzovspRcS-SPwWxaXjp8AqONnD290",
      simpleSheet: true
    })
      .then((data) => setData(data))
      .catch((err) => console.warn(err));
  }, []);

  // Page Styling
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Marks for Age Slider
  const marks = [
    { value: 0, label: '<18' },
    { value: 15, label: '18-24' },
    { value: 30, label: '25-34' },
    { value: 45, label: '35-44' },
    { value: 60, label: '45-54' },
    { value: 75, label: '55-64' },
    { value: 90, label: '>65' }
  ];

  // Age slider state
  const [value, setValue] = React.useState([15]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function valuetext(value) {
    return `${value}`;
  }


  const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 37.12,
    lng: -122.12,
  }
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
            <Grid item xs={12}>
              <Title>Set Parameters and Search the Dataset</Title>
              {/* React-Select, taken from https://stackoverflow.com/questions/48930622/react-select-show-search-bar-in-dropdown  */}
              <div style={{ width: "300px" }}>
                <Box pt={3}>
                  Industry:
                  <Autocomplete
                    id="industry-dropdown"
                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}

                  />
                </Box>
              </div>
              {/* Age Range is taken from @material-ui https://material-ui.com/components/slider/ */}
              <Box pt={3}>
                Age Range:
                <div className={classes.root} style={{ width: "300px" }}>
                  <Typography id="range-slider" gutterBottom></Typography>
                  <Slider
                    value={value}
                    style={{ width: 300 }}
                    onChange={handleChange}
                    step={null}
                    marks={marks}
                    min = {0}
                    max = {90}
                    aria-labelledby="discrete-slider"
                    getAriaValueText={valuetext}
                  />
                </div>
              </Box>

              <div style={{ width: "300px" }}>
                <Box pt={3}>
                  Gender:
                  <Autocomplete
                    id="gender-dropdown"
                    options={genderOptions}
                    loading={(true)}
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
                    id="country-dropdown"
                    options={countryOptions}
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
                    id="state-dropdown"
                    options={stateOptions}
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
                    id="city-dropdown"
                    options={cityOptions}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </Box>
              </div>
              <div style={{ width:"300px" }}>
                <Box pt={3}>
                Google Maps
                <MarkerMap location ={location} zoomLevel={8} pinLocations={[ "Charlottesville United States", "district of columbia United States of America","rio de janeiro brazil","paris france"]}/>
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
