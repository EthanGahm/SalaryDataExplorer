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
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState, setState } from "react";
import axios from "axios";
import PageTitle from "./PageTitle";
import MarkerMap from "./GoogleMaps.js";
import NativeSelect from "@material-ui/core/NativeSelect";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";

export default function FilterAndSearch() {
  // State variable used to store the current filters.
  const [filters, setFilters] = useState({});

  // State variable used to store the current filters for data summary analysis.
  const [summaryFilters, setSummaryFilters] = useState({});

  // State variable used to store the filter rows for the table.
  const [filterRows, setFilterRows] = useState([]);

  // State variable used to store the data rows displayed in the table.
  const [allData, setAllData] = useState({});

  // State variable used to store the mean salary of the rows fitting the current filters
  const [meanSalary, setMeanSalary] = useState();
  const [topSalary, setTopSalary] = useState();
  const [botSalary, setBotSalary] = useState();

  // State variable used to store the median salary of the rows fitting the current filters
  const [medianSalary, setMedianSalary] = useState();

  // State variable used to store the location strings of the rows fitting the current filters
  const [pinLocations, setPinLocations] = useState([]);

  // State variable used to store the page number corresponding to the pages in the mongoDB database
  const [page, setPage] = useState(0);

  // State variable used to store whether or not the filter list is displayed when the 'Filter' button is pressed
  const [drawer, setDrawer] = useState(false);

  // State variable used to store distinct industry dropdown options
  const [industriesData, setIndustries] = useState([]);

  // State variable used to store distinct country dropdown options
  const [countryData, setCountryData] = useState([]);

  // State variable used to store distinct state dropdown options
  const [stateData, setStateData] = useState([]);

  // State variable used to store distinct city dropdown options
  const [cityData, setCityData] = useState([]);

  // State variable used to track whether the site options are displayed or not
  const [open, setOpen] = React.useState(true);

  // Styling used for the Filter/Search page
  const classes = useStyles();

  // Hook that renders once, displaying the dropdown options for the filter and retrieves database for filtering
  useEffect(() => {
    retrieveIndustries();
    retrieveCountries();
    retrieveCities();
    retrieveStates();
    retrieveAllData();
  }, []);

  // Each time the filter is changed, changes the summary data corresponding to the filter selected
  useEffect(() => {
    retrieveSummaryData(summaryFilters);
  }, [summaryFilters]);

  /**
   * Connects to the endpoint from the axios 'GET' call
   * @returns Connection with the corresponding endpoint in the backend
   */
  function getAll() {
    var res = axios.get(
      `https://salary-data-api.herokuapp.com/salary_data/all_2021`
    );
    return res;
  }

  /**
   * Calls the endpoint with axios and sets the state variable setAllData with all the specifed data from the backend
   */
  const retrieveAllData = () => {
    getAll()
      .then((response) => {
        setAllData(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  /**
   * OnChange function for the previous page button, allows traversal of the previous database page from the backend to front end
   * @returns the previous page of the database
   */
  const handlePreviousPageChange = () => {
    if (page <= 0) {
      return;
    } else {
      setPage(page - 1);
    }
  };

  /**
   * OnChange function for the next page button, allows traversal of the next database page from the backend to front end
   * @returns the next page of the database
   */
  const handleNextPageChange = () => {
    if (filterRows.length < 5) {
      return;
    } else {
      setPage(page + 1);
    }
  };

  /**
   * Using the current filters and page number, utilizes the query from the find function to set the table with the resulting rows
   * by setting the setFilterRows state variable. This hook activates whenever the page is changed or the drawer is opened or closed with
   * the selected filters.
   */
  useEffect(() => {
    const response = find(filters, page);
    const tempRows = [];
    response
      .then((res) => {
        for (const row of Object.values(res.data.rows)) {
          tempRows.push(Object.values(row));
        }
        setFilterRows(tempRows);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page, drawer]);

  /**
   * @param {*} filters filters specified from the dropdowns using the state variable 'filters'
   * @param {*} page page number specified from the backend that shows unique rows on each page
   * @returns an endpoint that appends the page number and filters to show specified data
   */
  function find(filters, page) {
    const dataURL = new URL(
      "https://salary-data-api.herokuapp.com/salary_data/all_2021?"
    );
    for (const [key, value] of Object.entries(filters)) {
      if (value === null) {
        filters[key] = "";
      }
      dataURL.searchParams.append(key, value);
    }
    dataURL.searchParams.append("page", page);
    console.log(dataURL.href);
    return axios.get(dataURL);
  }

  // Takes in a set of filters and retrieves the corresponding summary data values
  // from the database. This includes mean + median salaries as well as the location
  // strings for the corresponding rows.
  const retrieveSummaryData = (summaryFilters) => {
    const dataURL = new URL(
      "https://salary-data-api.herokuapp.com/salary_data/allRaw_2021?"
    );
    for (const [key, value] of Object.entries(summaryFilters)) {
      if (value === null) {
        summaryFilters[key] = "";
      }
      dataURL.searchParams.append(key, value);
    }
    let res = axios.get(dataURL);
    res
      .then((response) => {
        setMeanSalary(response.data.mean_salary);
        setMedianSalary(response.data.median_salary);
        setTopSalary(response.data.top_salary);
        setBotSalary(response.data.bot_salary);
        if (Object.keys(summaryFilters) == 0){
          setPinLocations([82.8628, 135.0000])
          }
          else {
          setPinLocations(response.data.pin_locations)
          }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  /**
   * Used to get the endpoint that contains industries from the database
   * @returns an array of industries with no duplicates
   */
  function getIndustries() {
    var res = axios.get(
      "https://salary-data-api.herokuapp.com/salary_data/industries"
    );
    return res;
  }

  /**
   * Using the endpoint from axios, updates the state variable 'setIndustries' to be used in the dropdown menu
   */
  const retrieveIndustries = () => {
    getIndustries()
      .then((response) => {
        setIndustries(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * Options for gender that were stated in the 2021 salary survey
   */
  const genderOptions = [
    "Woman",
    "Man",
    "Non-binary",
    "Other or prefer not to answer",
  ];

  /**
   * Used to get the endpoint that contains countries from the database
   * @returns an array of countries with no duplicates
   */
  function getCountries() {
    var res = axios.get(
      "https://salary-data-api.herokuapp.com/salary_data/countries"
    );
    return res;
  }

  /**
   * Using the endpoint from axios, updates the state variable 'setCountryData' to be used in the dropdown menu
   */
  const retrieveCountries = () => {
    getCountries()
      .then((response) => {
        setCountryData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * Used to get the endpoint that contains states from the database
   * @returns an array of states with no duplicates
   */

  function getStates() {
    var res = axios.get(
      "https://salary-data-api.herokuapp.com/salary_data/states"
    );
    return res;
  }

  /**
   * Using the endpoint from axios, updates the state variable 'setStateData' to be used in the dropdown menu
   */

  const retrieveStates = () => {
    getStates()
      .then((response) => {
        setStateData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Used to get rid of null values in the city endpoint data
  var filteredCityData = cityData.filter(function (val) {
    return val !== null;
  });

  /**
   * Used to get the endpoint that contains cities from the database
   * @returns an array of cities with no duplicates
   */
  function getCities() {
    var res = axios.get(
      "https://salary-data-api.herokuapp.com/salary_data/cities"
    );
    return res;
  }

  /**
   * Using the endpoint from axios, updates the state variable 'setCityData' to be used in the dropdown menu
   */
  const retrieveCities = () => {
    getCities()
      .then((response) => {
        setCityData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * OnChange function to open the drawer and keep track of it being open
   */
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  /**
   * OnChange function to close the drawer and keep track of it being closed
   */
  const handleDrawerClose = () => {
    setOpen(false);
  };

  /**
   * OnChange function to open the Filter menu and keep track of it being open
   */
  const handleClickOpen = () => {
    setDrawer(true);
  };

  /**
   * OnChange function to close the Filter menu and keep track of it being closed
   */
  const handleClose = () => {
    setDrawer(false);
  };

  /**
   * OnChange function that when clicked resets the table to default settings, on page 0 and no filters
   */
  const handleResetFilter = () => {
    setFilters({});
    setPage(0);
    const response = find("", 0);
    const tempRows = [];
    response
      .then((res) => {
        for (const row of Object.values(res.data.rows)) {
          tempRows.push(Object.values(row));
        }
        setFilterRows(tempRows);
      })
      .catch((e) => {
        console.error(e);
      });
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
          <PageTitle text="Filter and Search" />
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
            <Grid container direction="row">
              <Title>Set Parameters and Search the Dataset</Title>
              <Grid item xs={12} md={12} lg={12} container maxwidth={'lg'}>
                <Grid item xs={12} md={6} lg = {6}>
                  {<Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom>
                      Data Summary
                    </Typography>
                    <p>Filters: filters</p>
                    <Typography variant="subtitle1" gutterBottom>
                      Mean Salary: {meanSalary}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Median Salary: {medianSalary}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Highest Salary: {topSalary}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Lowest Salary: {botSalary}
                    </Typography>
                  </Paper>}
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Paper className={classes.paper} elevation={0}>
                    {
                      <MarkerMap
                        location={location}
                        zoomLevel={8}
                        pinLocations={pinLocations}
                      />
                    }
                  </Paper>
                </Grid>
                <Grid xs={12}>
                  <Paper elevation={1}>
                    <Box
                      m={1}
                      alignItems="center"
                      className={`${classes.spreadBox} ${classes.box}`}
                    >
                      <Button
                        variant="contained"
                        style={{ height: 40 }}
                        color="primary"
                        onClick={handlePreviousPageChange}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="contained"
                        style={{ height: 40 }}
                        color="primary"
                        onClick={handleResetFilter}
                      >
                        Reset Filters
                      </Button>
                      <Button
                        variant="contained"
                        style={{ height: 40 }}
                        color="primary"
                        onClick={handleClickOpen}
                      >
                        Filter
                      </Button>
                      <Dialog
                        disableBackdropClick
                        disableEscapeKeyDown
                        open={drawer}
                        onClose={handleClose}
                      >
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
                                  renderInput={(params) => (
                                    <TextField {...params} variant="outlined" />
                                  )}
                                  onChange={(event, value) => {
                                    if (value === null) {
                                      setFilters((filters) => ({
                                        ...filters,
                                        Industry: "",
                                      }));
                                      setSummaryFilters((summaryFilters) => ({
                                        ...summaryFilters,
                                        Industry: "",
                                      }));
                                      setPage(0);
                                    } else {
                                      setPage(0);
                                      setFilters((filters) => ({
                                        ...filters,
                                        Industry: value,
                                      }));
                                      setSummaryFilters((summaryFilters) => ({
                                        ...summaryFilters,
                                        Industry: value,
                                      }));
                                    }
                                  }}
                                />
                              </Box>
                              <Box pt={3}>
                                Age Range:
                                <div className={classes.root}>
                                  <NativeSelect
                                    id="demo-customized-select-native"
                                    value={filters["Age"]}
                                    onChange={(event) => {
                                      if (event.target.value === null) {
                                        setFilters((filters) => ({
                                          ...filters,
                                          Age: "",
                                        }));
                                        setSummaryFilters((summaryFilters) => ({
                                          ...summaryFilters,
                                          Age: "",
                                        }));
                                        setPage(0);
                                      } else {
                                        setFilters((filters) => ({
                                          ...filters,
                                          Age: event.target.value,
                                        }));
                                        setSummaryFilters((summaryFilters) => ({
                                          ...summaryFilters,
                                          Age: event.target.value,
                                        }));
                                        setPage(0);
                                      }
                                    }}
                                  >
                                    <option value="">None</option>
                                    <option value={"under 18"}>Under 18</option>
                                    <option value={"18-24"}>18-24</option>
                                    <option value={"25-34"}>25-34</option>
                                    <option value={"35-44"}>35-44</option>
                                    <option value={"45-54"}>45-54</option>
                                    <option value={"55-64"}>55-64</option>
                                    <option value={"65 or over"}>
                                      65 or Over
                                    </option>
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
                                      setPage(0);
                                      setFilters((filters) => ({
                                        ...filters,
                                        Gender: "",
                                      }));
                                      setSummaryFilters((summaryFilters) => ({
                                        ...summaryFilters,
                                        Gender: "",
                                      }));
                                    } else {
                                      setPage(0);
                                      setFilters((filters) => ({
                                        ...filters,
                                        Gender: value,
                                      }));
                                      setSummaryFilters((summaryFilters) => ({
                                        ...summaryFilters,
                                        Gender: value,
                                      }));
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
                                      setPage(0);
                                      setFilters((filters) => ({
                                        ...filters,
                                        Country: "",
                                      }));
                                      setSummaryFilters((summaryFilters) => ({
                                        ...summaryFilters,
                                        Country: "",
                                      }));
                                    } else {
                                      setPage(0);
                                      setFilters((filters) => ({
                                        ...filters,
                                        Country: value,
                                      }));
                                      setSummaryFilters((summaryFilters) => ({
                                        ...summaryFilters,
                                        Country: value,
                                      }));
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
                                      setPage(0);
                                      setFilters((filters) => ({
                                        ...filters,
                                        State: "",
                                      }));
                                      setSummaryFilters((summaryFilters) => ({
                                        ...summaryFilters,
                                        State: "",
                                      }));
                                    } else {
                                      setPage(0);
                                      setFilters((filters) => ({
                                        ...filters,
                                        State: value,
                                      }));
                                      setSummaryFilters((summaryFilters) => ({
                                        ...summaryFilters,
                                        State: value,
                                      }));
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
                                      setPage(0);
                                      setFilters((filters) => ({
                                        ...filters,
                                        City: "",
                                      }));
                                      setSummaryFilters((summaryFilters) => ({
                                        ...summaryFilters,
                                        City: "",
                                      }));
                                    } else {
                                      setPage(0);
                                      setFilters((filters) => ({
                                        ...filters,
                                        City: value,
                                      }));
                                      setSummaryFilters((summaryFilters) => ({
                                        ...summaryFilters,
                                        City: value,
                                      }));
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
                      <Button
                        variant="contained"
                        style={{ height: 40 }}
                        color="primary"
                        onClick={handleNextPageChange}
                      >
                        Next
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
                <Grid>
                  <TableContainer component={Paper} style={{ maxHeight: 500 }}>
                    <Table
                      stickyHeader
                      className={classes.table}
                      aria-label="simple table"
                    >
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
                            <TableCell align="right">{row[3]}</TableCell>
                            <TableCell align="right">{row[4]}</TableCell>
                            <TableCell align="right">{row[5]}</TableCell>
                            <TableCell align="right">{row[6]}</TableCell>
                            <TableCell align="right">{row[7]}</TableCell>
                            <TableCell align="right">{row[8]}</TableCell>
                            <TableCell align="right">{row[13]}</TableCell>
                            <TableCell align="right">{row[14]}</TableCell>
                            <TableCell align="right">{row[15]}</TableCell>
                            <TableCell align="right">{row[16]}</TableCell>
                            <TableCell align="right">{row[17]}</TableCell>
                            <TableCell align="right">{row[18]}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
