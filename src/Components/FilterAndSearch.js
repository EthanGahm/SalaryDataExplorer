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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';



export default function FilterAndSearch() {


  useEffect(() => {
    retrieveIndustries();
    retrieveCountries();
    retrieveCities();
    retrieveStates();
  }, []);


  // State variables
  const [filters, setFilters] = useState([]);
  const [page, setPage] = useState(0);
  const [filterRows, setFilterRows] = useState([]);
  const [drawer, setDrawer] = useState(false);


  // Previous button
  const handlePreviousPageChange = () => {
    if (page <= 0) {
      return
    } else {
      setPage(page - 1);
    }
  };

  // Next button
  const handleNextPageChange = () => {
    if (filterRows.length < 5) {
      return
    } else {
      setPage(page + 1);
    }
  }

  // setting table rows
  useEffect(() => {
    const response = find(filters, page);
    const tempRows = [];
    response.then((res) => {
      for (const row of Object.values(res.data.rows)) {
        tempRows.push(Object.values(row));
      }
      setFilterRows(tempRows)
    }).catch((e) => {
      console.error(e);
    });
  }, [page, drawer])

  // database query
  function find(filters, page) {
    const dataURL = new URL("http://localhost:5000/salary_data/all_2021?")
    for (const [key, value] of Object.entries(filters)) {
      if (value === null) {
        filters[key] = ""
      }
      dataURL.searchParams.append(key, value);
    }
    dataURL.searchParams.append("page", page);
    console.log(dataURL.href)
    return axios.get(dataURL);
  }


  // Industry dropdown option
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

  // Page Styling and Drawer
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Filter

  const handleClickOpen = () => {
    setDrawer(true);
  };

  const handleClose = () => {
    setDrawer(false);
  };

  const handleResetFilter = () => {
    setFilters([])
    setPage(0)
    const response = find("", 0);
    const tempRows = [];
    response.then((res) => {
      for (const row of Object.values(res.data.rows)) {
        tempRows.push(Object.values(row));
      }
      setFilterRows(tempRows)
    }).catch((e) => {
      console.error(e);
    });
  }


  // Map marker state
  /*
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
    const mean = add / salary.length;
    return parseInt(mean);

  }
  const meanSalary = calculateMeanSalary()

  //Calculates the median salary
  const calculateMedianSalary = () => {
    const salarySort = salary.sort();
    const mid = Math.ceil(salary.length / 2);
    const median = salary.length % 2 == 0 ? (salarySort[mid] + salarySort[mid - 1]) / 2 : salarySort[mid - 1];
    return parseInt(median)
  }
  const medianSalary = calculateMedianSalary();
  */

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
          <PageTitle text="Data Summary" />

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
                <Grid>
                  <TableContainer component={Paper} style={{ maxHeight: 500 }}>
                    <Table stickyHeader className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">Age</TableCell>
                          <TableCell align="right">Industry</TableCell>
                          <TableCell align="right">Job Title</TableCell>
                          <TableCell align="right">Annual Salary</TableCell>
                          <TableCell align="right">Currency</TableCell>
                          <TableCell align="right">Work Experience</TableCell>
                          <TableCell align="right">Country</TableCell>
                          <TableCell align="right">State</TableCell>
                          <TableCell align="right">City</TableCell>
                          <TableCell align="right">Education</TableCell>
                          <TableCell align="right">Gender</TableCell>
                          <TableCell align="right">Race</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filterRows.map((row) => (
                          <TableRow key={row[0]}>
                            <TableCell align="right">{row[2]}</TableCell>
                            <TableCell align="right">{row[3]}</TableCell>
                            <TableCell align="right">{row[4]}</TableCell>
                            <TableCell align="right">{row[5]}</TableCell>
                            <TableCell align="right">{row[6]}</TableCell>
                            <TableCell align="right">{row[7]}</TableCell>
                            <TableCell align="right">{row[12]}</TableCell>
                            <TableCell align="right">{row[13]}</TableCell>
                            <TableCell align="right">{row[14]}</TableCell>
                            <TableCell align="right">{row[15]}</TableCell>
                            <TableCell align="right">{row[16]}</TableCell>
                            <TableCell align="right">{row[17]}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box m={1} alignItems="center" className={`${classes.spreadBox} ${classes.box}`}>
                    <Button variant="contained" style={{ height: 40 }} color="primary" onClick={handlePreviousPageChange}>
                      Previous
                    </Button>

                    <Button variant="contained" style={{ height: 40 }} color="primary" onClick={handleResetFilter}>
                      Reset Filters
                    </Button>

                    <Button variant="contained" style={{ height: 40 }} color="primary" onClick={handleClickOpen}>Filter</Button>
                    <Dialog disableBackdropClick disableEscapeKeyDown open={drawer} onClose={handleClose}>
                      <DialogTitle>Table Filter</DialogTitle>
                      <DialogContent>
                        <form className={classes.filtercontainer}>
                          <FormControl className={classes.formControl}>
                            <Box pt={3}>
                              Industry:
                              <Autocomplete
                                id="industry-dropdown"
                                options={industriesData}
                                value={filters["Industry"]}
                                getOptionLabel={(option) => option}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => {
                                  if (value === null) {
                                    setFilters(filters => ({ ...filters, "Industry": "" }))
                                    setPage(0)
                                  } else {
                                    setPage(0)
                                    setFilters(filters => ({ ...filters, "Industry": value }))
                                  }
                                }}
                              />
                            </Box>
                            <Box pt={3}>
                              Age Range:
                              <div className={classes.root} >
                                <NativeSelect
                                  id="demo-customized-select-native"
                                  value={filters["Age"]}
                                  onChange={(event) => {
                                    if (event.target.value === null) {
                                      setFilters(filters => ({ ...filters, "Age": "" }))
                                      setPage(0)
                                    } else {
                                      setFilters(filters => ({ ...filters, "Age": event.target.value }))
                                      setPage(0)
                                    }
                                  }}
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

                            <Box pt={3}>
                              Gender:
                              <Autocomplete
                                id="gender-dropdown"
                                options={genderOptions}
                                value={filters["Gender"]}
                                getOptionLabel={(option) => option}
                                style={{ width: 300 }}
                                onChange={(event, value) => {
                                  if (value === null) {
                                    setPage(0)
                                    setFilters(filters => ({ ...filters, "Gender": "" }))
                                  } else {
                                    setPage(0)
                                    setFilters(filters => ({ ...filters, "Gender": value }))

                                  }
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} variant="outlined" />
                                )}
                              />
                            </Box>

                            <Box pt={3}>
                              Country:
                              <Autocomplete
                                id="country-dropdown"
                                options={countryData}
                                value={filters["Country"]}
                                getOptionLabel={(option) => option}
                                onChange={(event, value) => {
                                  if (value === null) {
                                    setPage(0)
                                    setFilters(filters => ({ ...filters, "Country": "" }))
                                  } else {
                                    setPage(0)
                                    setFilters(filters => ({ ...filters, "Country": value }))
                                  }

                                }}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                  <TextField {...params} variant="outlined" />
                                )}
                              />
                            </Box>

                            <Box pt={3}>
                              State/Province:
                              <Autocomplete
                                id="state-dropdown"
                                options={stateData}
                                value={filters["State"]}
                                getOptionLabel={(option) => option}
                                onChange={(event, value) => {
                                  if (value === null) {
                                    setPage(0)
                                    setFilters(filters => ({ ...filters, "State": "" }))

                                  } else {
                                    setPage(0)
                                    setFilters(filters => ({ ...filters, "State": value }))
                                  }
                                }}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                  <TextField {...params} variant="outlined" />
                                )}
                              />
                            </Box>

                            <Box pt={3}>
                              City:
                              <Autocomplete
                                id="city-dropdown"
                                options={filteredCityData}
                                value={filters["City"]}
                                getOptionLabel={(option) => option}
                                onChange={(event, value) => {
                                  if (value === null) {
                                    setPage(0)
                                    setFilters(filters => ({ ...filters, "City": "" }))
                                  } else {
                                    setPage(0)
                                    setFilters(filters => ({ ...filters, "City": value }))
                                  }
                                }}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                  <TextField {...params} variant="outlined" />
                                )}
                              />
                            </Box>
                          </FormControl>
                        </form>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Ok
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Button variant="contained" style={{ height: 40 }} color="primary" onClick={handleNextPageChange}>
                      Next
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Box pt={3}>

                  </Box>
                  {/* <Paper className={classes.paper}>
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
                  </Paper> */}
                  <Box pt={5}>

                  </Box>
                  <Paper className={classes.paper} elevation={0}>
                    {/* <MarkerMap
                      location={location}
                      zoomLevel={8}
                      pinLocations={
                        pinLocations
                      }
                    /> */}
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