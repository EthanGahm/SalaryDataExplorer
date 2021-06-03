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
import { makeStyles } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';
import PropTypes from 'prop-types';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


export default function Search() {

  const [data, setData] = useState([]);

  // Industry data
  const industries = data.map(item => (item.Industry));
  const indset = new Set(industries);
  let indarray = [...indset];
  const industriesOptions = indarray.map(item => ({ label: item, value: item }));

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
  const stateOptions = statearray.map(item => ({label:item, value:item}));

  // Country data
  const countries = data.map(item => (item.Country));
  const countryset = new Set(countries);
  let countryarray = [...countryset];
  const countryOptions = countryarray.map(item => ({label:item, value:item}));

  // City data
  const cities = data.map(item => (item.City));
  const cityset = new Set(cities);
  let cityarray = [...cityset];
  const cityOptions = cityarray.map(item => ({label:item, value:item}));

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
    {value: 18,label: '18'},
    {value: 24,label: '24'},
    {value: 34,label: '34'},
    {value: 44,label: '44'},
    {value: 54,label: '54'},
    {value: 64,label: '64'},
    {value: 70,label: '>65'}
  ];

  // Age slider state
  const [value, setValue] = React.useState([18, 24]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function valuetext(value) {
    return `${value}`;
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
              <Title>Search/Filter</Title>
              <div style={{ width: '300px' }}>
                <Box pt={3}>
                  Industry:
                  <Autocomplete
                    id="industry-dropdown"
                    options={industriesOptions}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                  />
                </Box>
              </div>
              <div style={{ width: '300px' }}>
                <Box pt={3}>
                  Job Title:
                  <Autocomplete
                    id="job-title-dropdown"
                    options={genderOptions}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                  />
                </Box>
              </div>
              {/* Age Range is taken from @material-ui https://material-ui.com/components/slider/ */}
              <Box pt={3}>
                Age Range:
                <div className={classes.root}>
                  <Slider
                    value={value}
                    style={{ width: 300 }}
                    onChange={handleChange}
                    step={null}
                    marks={marks}
                    max={70}
                    min={18}
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                  />
                </div>
              </Box>

              <div style={{ width: '300px' }}>
                <Box pt={3}>
                  Gender:
                  <Autocomplete
                    id="gender-dropdown"
                    options={genderOptions}
                    loading={(true)}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                  />
                </Box>
              </div>
              <div style={{ width: '300px' }}>
                <Box pt={3}>
                  Country:
                  <Autocomplete
                    id="country-dropdown"
                    options={countryOptions}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                  />
                </Box>
              </div>
              <div style={{ width: '300px' }}>
                <Box pt={3}>
                  State/Province:
                  <Autocomplete
                    id="state-dropdown"
                    options={stateOptions}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                  />
                </Box>
              </div>
              <div style={{ width: '300px' }}>
                <Box pt={3}>
                  City:
                  <Autocomplete
                    id="city-dropdown"
                    options={cityOptions}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
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
