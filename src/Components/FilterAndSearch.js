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
import { positions } from '@material-ui/system';
import { useEffect, useState } from "react";
import GoogleMaps from "./GoogleMaps.js";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import PageTitle from "./PageTitle";
import MarkerMap from "./GoogleMaps.js";
import NativeSelect from '@material-ui/core/NativeSelect';
import { mergeClasses } from "@material-ui/styles";
import getLocationsFromJSON from '../HelperMethods/ExtractLocationFromJSON'
import getSalaryFromJSON from '../HelperMethods/ExtractSalaryFromJSON'

export default function FilterAndSearch() {

  // Columns for table
  const columns = [
    { field: 4, headerName: "Age", width: 120 },
    { field: 5, headerName: "Industry", width: 250 },
    { field: 6, headerName: "Job Title", width: 300 },
    { field: 7, headerName: "Annual Salary", width: 170 },
    { field: 8, headerName: "Currency", width: 140 },
    { field: 14, headerName: "Country", width: 200 },
    { field: 15, headerName: "State", width: 180 },
    { field: 16, headerName: "City", width: 190 },
    { field: 17, headerName: "Education", width: 190 },
    { field: 18, headerName: "Gender", width: 160 },
    { field: 19, headerName: "Race", width: 150 },
  ];

  useEffect(() => {
    retrieveIndustries();
    retrieveCountries();
    retrieveCities();
    retrieveStates();
  }, []);




  // All data
  const [filters, setFilters] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() =>{
    finder();
  }, [filters])

  // Rows for table
  let dataRows = allData.rows;
  var tableRow = [];
  for (var i in dataRows)
    tableRow.push(Object.values(dataRows[i]));


  // Table filter
  function find(filters) {
    if (filters == null) {
      return
    }
    const dataURL = new URL("http://localhost:5000/salary_data/all_2021?")
    for (const [key, value] of Object.entries(filters)) {
      if(value == null){
        filters[key] = ""
      }
      dataURL.searchParams.append(key, value);
    }
    console.log(dataURL.href)
    return axios.get(dataURL);
  }

  
  const finder = () => {
    find(filters)
      .then(response => {
        setAllData(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };



  // Industry data
  const [industriesData, setIndustries] = useState([]);

  function getIndustries() {
    var res = axios.get('http://localhost:5000/salary_data/industries');
    return res
  }

  const retrieveIndustries = () => {
    getIndustries()
      .then(response => {
        setIndustries(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };



  // Gender Data
  const genderOptions = [
    'Woman', 'Man', 'Non-binary', 'Other or prefer not to answer'
  ]

  // Country data
  const [countryData, setCountryData] = useState([]);

  function getCountries() {
    var res = axios.get('http://localhost:5000/salary_data/countries');
    return res
  }

  const retrieveCountries = () => {
    getCountries()
      .then(response => {
        setCountryData(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  // State/Province data

  const [stateData, setStateData] = useState([]);

  function getStates() {
    var res = axios.get('http://localhost:5000/salary_data/states')
    return res
  }

  const retrieveStates = () => {
    getStates()
      .then(response => {
        setStateData(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  // City data
  const [cityData, setCityData] = useState([]);
  var filteredCityData = cityData.filter(function (val) { return val !== null })

  function getCities() {
    var res = axios.get('http://localhost:5000/salary_data/cities');
    return res
  }

  const retrieveCities = () => {
    getCities()
      .then(response => {
        setCityData(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // Page Styling
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Map marker state
  const url = "https://salary-data-api.herokuapp.com/salary_data/all_2021";
  const [pinLocations, setpinLocations] = React.useState([])
  React.useEffect(() => {
    let data = getLocationsFromJSON(url)
    data.then((data) => setpinLocations(data))
  }, [])

  // Salary state
  const [salary, setSalary] = React.useState([])
  React.useEffect(() => {
    let data = getSalaryFromJSON(url)
    data.then((data) => setSalary(data))
  }, [])

  // Calculates the mean salary
  const calculateMeanSalary = () => {
    var add = 0;
    for (var i = 0; i < salary.length; i++) {
      add = add + salary[i];
    }
    const mean = add/salary.length;
    return parseInt(mean);
    
  }
  const meanSalary = calculateMeanSalary()
  
  //Calculates the median salary
  const calculateMedianSalary = () => {
    const salarySort = salary.sort();
    const mid = Math.ceil(salary.length/2);
    const median = salary.length % 2 == 0 ? (salarySort[mid] + salarySort[mid - 1]) / 2 : salarySort[mid - 1];
    return parseInt(median)
  }
  const medianSalary = calculateMedianSalary();

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
              <Grid item xs={12} md={12} lg={12} container maxwidth={'lg'}>
                <Grid item xs={6} md={6} lg={6}>
                  <div style={{ width: '95%' }}>
                    <DataGrid
                      rows={tableRow}
                      columns={columns}
                      getRowId={(row) => row[0]}
                      pageSize={5}
                      autoHeight={true}
                    />
                  </div>
                  <div style={{ width: "300px" }}>
                    <Box pt={3}>
                      Industry:
                      <Autocomplete
                        id="industry-dropdown"
                        options={industriesData}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                        onChange={(event, value) => setFilters(filters => ({ ...filters, "Industry": value }))}
                      //onChange={(event, value) => finder(value, "Industry")}
                      />
                    </Box>
                  </div>
                  <Box pt={3}>
                    Age Range:
                    <div className={classes.root} >
                      <NativeSelect
                        id="demo-customized-select-native"
                        onChange={(event) => setFilters(filters => ({ ...filters, "Age": event.target.value }))}
                      >
                        <option value="">None</option>
                        <option value={'under 18'}>Under 18</option>
                        <option value={'18-24'}>18-24</option>
                        <option value={'25-34'}>25-34</option>
                        <option value={'35-44'}>35-44</option>
                        <option value={'45-54'}>45-54</option>
                        <option value={'55-64'}>55-64</option>
                        <option value={'65 or over'}>65 or Over</option>
                      </NativeSelect>
                    </div>
                  </Box>

                  <div style={{ width: "300px" }}>

                    <Box pt={3}>
                      Gender:
                      <Autocomplete
                        id="gender-dropdown"
                        options={genderOptions}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        onChange={(event, value) => setFilters(filters => ({ ...filters, "Gender": value }))}
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
                        options={countryData}
                        getOptionLabel={(option) => option}
                        onChange={(event, value) => setFilters(filters => ({ ...filters, "Country": value }))}
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
                        options={stateData}
                        getOptionLabel={(option) => option}
                        onChange={(event, value) => setFilters(filters => ({ ...filters, "State": value }))}
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
                        options={filteredCityData}
                        getOptionLabel={(option) => option}
                        onChange={(event, value) => setFilters(filters => ({ ...filters, "City": value }))}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </Box>
                  </div>
                  <div>
                    <Box pt={5}>
                      {/* <Button variant="contained" color="primary" onClick={finder()}>
                        Search
                      </Button> */}
                    </Box>
                  </div>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Box pt={3}>

                  </Box>
                  <Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom>
                      Data Summary
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Mean Salary: {meanSalary}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Median Salary: {medianSalary}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Average Age:
                    </Typography>
                  </Paper>
                  <Box pt={5}>

                  </Box>
                  <Paper className={classes.paper} elevation={0}>
                    <MarkerMap
                      location={location}
                      zoomLevel={8}
                      pinLocations={
                        pinLocations
                      }
                    />
                  </Paper>
                </Grid>
              </Grid>
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