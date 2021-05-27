import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems } from "./listItems";
import Title from "./Title";
import WebsiteTitle from "./WebsiteTitle";
import Copyright from "./Copyright";
import useStyles from "./UseStyles.js";
import Select from 'react-select';
import Slider from '@material-ui/core/Slider';



// Passing in a map array to the search bar function, may be useful when extracting jobs from spreadsheet
//var industryOptions = ['Doctor', 'Software Engineer', 'Teacher', 'Professor']
//var options = industryOptions.map(opt => ({label: opt, value: opt}));

// Hardcoded labels for search bar
// const industryOptions = [
//   { label: 'Software Engineer', value: 'Software Engineer' },
//   { label: 'Doctor', value: 'Doctor'},
// ];

export default function Search() {
  const options = [
    { label: 'Doctor', value: 'Doctor' },
    { label: 'Teacher', value: 'Teacher' },
    { label: 'Lawyer', value: 'Lawyer' },
    { label: 'Software Engineer', value: 'Software Engineer' }
  ]


  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

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
          <WebsiteTitle />
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
              {/* React-Select, taken from https://stackoverflow.com/questions/48930622/react-select-show-search-bar-in-dropdown  */}
              <div style={{ width: '300px' }}>
                <Box pt={1}>
                  Industry:
                  <Select
                    options={options}
                    isClearable={true}
                    placeholder='Search...'
                  />
                </Box>
              </div>
              <div style={{ width: '300px' }}>
                <Box pt={1}>
                  Job Title:
                  <Select
                    options={options}
                    isClearable={true}
                    placeholder='Search...'
                  />
                </Box>
              </div>
              {/* Age Range is taken from @material-ui https://material-ui.com/components/slider/ */}
              <Box pt={1}>
                Age Range:
          <div className={classes.root} style={{ width: '300px' }}>
                  <Typography id="range-slider" gutterBottom>
                  </Typography>
                  <Slider
                    min={18}
                    max={70}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                  />
                </div>
              </Box>

              <div style={{ width: '300px' }}>
                <Box pt={1}>
                  Gender:
                  <Select
                    options={options}
                    isClearable={true}
                    placeholder='Search...'
                  />
                </Box>
              </div>
              <div style={{ width: '300px' }}>
                <Box pt={1}>
                  Country:
                  <Select
                    options={options}
                    isClearable={true}
                    placeholder='Search...'
                  />
                </Box>
              </div>
              <div style={{ width: '300px' }}>
                <Box pt={1}>
                  State/Province:
                  <Select
                    options={options}
                    isClearable={true}
                    placeholder='Search...'
                  />
                </Box>
              </div>
              <div style={{ width: '300px' }}>
                <Box pt={1}>
                  City:
                  <Select
                    options={options}
                    isClearable={true}
                    placeholder='Search...'
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
