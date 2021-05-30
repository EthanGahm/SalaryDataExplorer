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




// Passing in a map array to the search bar function, may be useful when extracting jobs from spreadsheet
var industryOptions = ['Doctor', 'Software Engineer', 'Teacher', 'Professor']
var options = industryOptions.map(opt => ({ label: opt, value: opt }));




export default function Search() {

  // data from google spreadsheet
  const [data, setData] = useState([]);
  // gets the Industry column from the google spreadsheet
  const industries = data.map(item => (item.Industry));
  // removes duplicates by coverting array to set
  var indset = new Set(industries);
  // change back to array and convert to map again
  let indarray = [...indset];
  const industriesOptions = indarray.map(item => ({ label: item, value: item }));

  // Code from :https://medium.com/vowel-magic/how-to-fetch-data-from-google-sheets-with-react-and-tabletop-js-ca0e9d2ab34b#:~:text=Getting%20started,click%20%E2%80%9CPublish%20to%20Web.%E2%80%9D&text=Step%20Two%3A%20Install%20the%20tabletop%20library.&text=Step%20Three%3A%20Write%20the%20React,the%20data%20from%20Google%20sheets.
  // Utilizes tabletop to get data from google spreadsheet
  useEffect(() => {
    Tabletop.init({
      key: "1bacAOGeeXSRUy5jzovspRcS-SPwWxaXjp8AqONnD290",
      simpleSheet: true
    })
      .then((data) => setData(data))
      .catch((err) => console.warn(err));
  }, []);

  const genderOptions = [
    { label: 'Woman', value: 'Woman' },
    { label: 'Man', value: 'Man' },
    { label: 'Non-binary', value: 'Non-binary' },
    { label: 'Other', value: 'Other/NA' }
  ]


  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const marks = [
    {
      value: 18,
      label: '18',
    },
    {
      value: 24,
      label: '24',
    },
    {
      value: 34,
      label: '34',
    },
    {
      value: 44,
      label: '44',
    },
    {
      value: 54,
      label: '54'
    },
    {
      value: 64,
      label: '64'
    },
    {
      value: 70,
      label: '65 and over'
    }
  ];


  // age range bar values
  const [value, setValue] = React.useState([20, 37]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function valuetext(value) {
    return `${value}°C`;
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
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Title>Search by Industry</Title>
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
                    style={{width:500}}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    step={null}
                    marks = {marks}
                    max = {70}
                    min = {18}
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
                    options={options}
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
                    options={options}
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
                    options={options}
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
