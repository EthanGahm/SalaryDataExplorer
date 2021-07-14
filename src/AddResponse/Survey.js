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
import { mainListItems } from "../Components/listItems";
import Title from "../Components/Title";
import Copyright from "../Components/Copyright";
import useStyles from "../Components/UseStyles.js";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState, setState } from "react";
import axios from "axios";
import PageTitle from "../Components/PageTitle";
import MarkerMap from "../Components/GoogleMaps.js";
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
import cities from "./CitiesList";
import { usStates, countries } from "./CountryStateList";
import { ind, age, work_exp } from "./AgeIndWorkExp";
import { education, gender, races } from "./EducationGenderRace";
var cit = cities;
var s = usStates;
var c = countries;
var a = age;
var i = ind;
var w = work_exp;
var e = education;
var g = gender;
var r = races;
export default function SurveyComponent() {
  // state variable used to store the current filters.
  const [filters, setFilters] = useState({});
  filters["currency"] = "USD";
  filters["Other"] = "";
  // state variable used to store the filter rows for the table.
  const [filterRows, setFilterRows] = useState([]);

  // state variable used to store the data rows displayed in the table.
  const [allData, setAllData] = useState({});

  // state variable used to store the mean salary of the rows fitting the current filters
  const [meanSalary, setMeanSalary] = useState();
  const [topSalary, setTopSalary] = useState();
  const [botSalary, setBotSalary] = useState();

  // state variable used to store the median salary of the rows fitting the current filters
  const [medianSalary, setMedianSalary] = useState();

  // state variable used to store the location strings of the rows fitting the current filters
  const [pinLocations, setPinLocations] = useState([]);

  // state variable used to store the page number corresponding to the pages in the mongoDB database
  const [page, setPage] = useState(0);

  // state variable used to store whether or not the filter list is displayed when the 'Filter' button is pressed
  const [drawer, setDrawer] = useState(false);

  // state variable used to store distinct industry dropdown options
  const [industriesData, setIndustries] = useState([""]);

  // state variable used to store distinct country dropdown options
  const [countryData, setCountryData] = useState([""]);

  // state variable used to store distinct state dropdown options
  const [stateData, setStateData] = useState([""]);

  // state variable used to store distinct city dropdown options
  const [cityData, setCityData] = useState([""]);

  // state variable used to store distinct work experience  dropdown options
  const [workExperienceData, setWorkExperienceData] = useState([""]);

  // state variable used to store distinct work experience  dropdown options
  const [levelOfEducationData, setLevelOfEducationData] = useState([""]);

  // state variable used to store distinct race dropdown options
  const [raceData, setRaceData] = useState([""]);

  // state variable used to track whether the site options are displayed or not
  const [open, setOpen] = React.useState(true);
  // state variable used to track the job title

  // Styling used for the Filter/Search page
  const classes = useStyles();

  // this method creates a custom ordering for an array
  // obtained from this link : https://stackoverflow.com/questions/14872554/sorting-on-a-custom-order
  function applyCustomOrder(arr, desiredOrder) {
    const orderForIndexVals = desiredOrder.slice(0).reverse();
    arr.sort((a, b) => {
      const aIndex = -orderForIndexVals.indexOf(a);
      const bIndex = -orderForIndexVals.indexOf(b);
      return aIndex - bIndex;
    });
  }
  // Hook that renders once, displaying the dropdown options for the filter and retrieves database for filtering
  useEffect(() => {
    retrieveIndustries();
    setCountryData(c);
    setCityData(cit);
    setStateData(s);
    setWorkExperienceData(w);
    setLevelOfEducationData(e);
    setRaceData(r);
  }, []);

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
   * This is a helper method to getCoordinates(). Given a String representing a location of an entry,
   * the method will use an API call to Google's Geocoder and retrieve the coordinates and cleaned up
   * location name. This is what will be returned in the getCoordinates method.
   *
   * @param {*} str : String representing a location
   * @returns  the latitude, longitude, and cleaned up location name of the given String input
   */
  async function getRes(str) {
    var loc = str.replace(/\s+/g, "+");
    const url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      loc +
      "&key=" +
      process.env.REACT_APP_GOOGLEMAPS_ID;

    var res = await axios.get(url);

    var arr = [];
    arr.push(JSON.stringify(res.data.results[0].geometry.location.lat));
    arr.push(JSON.stringify(res.data.results[0].geometry.location.lng));

    return arr;
  }
  /**
   * OnChange function to close the Filter menu and keep track of it being closed
   */
  const handleClose = () => {
    // ordering the race options like the 2021 survey is set up
    // console.log(filters.race);
    const racesOrder2021 = r;
    if (filters.race != (undefined || null)) {
      applyCustomOrder(filters.race, racesOrder2021);
      var raceString = "";
      for (var i = 0; i < filters.race.length; i++) {
        if (i == filters.race.length - 1) {
          raceString += filters.race[i];
        } else {
          raceString += filters.race[i] + ", ";
        }
      }
      filters.race = raceString;
    }
    // console.log(filters);
    // craeting address string from the city,state,and country filters
    var addr = "";
    if (filters.city != (undefined || null)) {
      addr += filters.city + " ";
    }
    if (filters.state != (undefined || null)) {
      addr += filters.state + " ";
    }
    if (filters.country != (undefined || null)) {
      addr += filters.country;
    }
    filters["address"] = addr;

    // making api call to google geocoder with address filter to get lat and lng values

    submitJSONToDB();
    setDrawer(false);
  };

  async function submitJSONToDB() {
    if (filters.address != (undefined || null)) {
      try {
        var coords = await getRes(filters.address);
        filters["lat"] = coords[0];
        filters["lng"] = coords[1];
      } catch (error) {
        console.error(error);
      }
    }
    axios.post("http://localhost:5000/salary_data/addResponse", filters);
  }
  const handleOnChange = () => {
    console.log("Click");
  };
  /**
   * Used to get the endpoint that contains race from the database
   * @returns an array of race with no duplicates
   */
  function getRaces() {
    var res = axios.get(
      "https://salary-data-api.herokuapp.com/salary_data/races"
    );
    return res;
  }

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container>
          <DialogContent>
            <form className={classes.filtercontainer}>
              <FormControl className={classes.formControl}>
                <Box pt={3}>
                  What is your age?
                  <div className={classes.root}>
                    <NativeSelect
                      required
                      id="demo-customized-select-native"
                      value={filters["age"]}
                      onChange={(event) => {
                        if (
                          event.target.value == null ||
                          event.target.value == ""
                        ) {
                          setFilters((filters) => ({
                            ...filters,
                            age: "",
                          }));

                          setPage(0);
                        } else {
                          setFilters((filters) => ({
                            ...filters,
                            age: event.target.value,
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
                      <option value={"65 or over"}>65 or Over</option>
                    </NativeSelect>
                  </div>
                </Box>

                <Box pt={3}>
                  What industry do you work in?
                  <Autocomplete
                    required
                    id="industry-dropdown"
                    options={industriesData}
                    value={filters["industry"]}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                    onChange={(event, value) => {
                      if (value === null || value == "") {
                        setFilters((filters) => ({
                          ...filters,
                          industry: "",
                        }));

                        setPage(0);
                      } else {
                        setPage(0);
                        setFilters((filters) => ({
                          ...filters,
                          industry: value,
                        }));
                      }
                    }}
                  />
                </Box>
                <Box pt={3}>
                  What is your exact job title?
                  <br></br>
                  <TextField
                    required
                    id="jobTitleData"
                    value={filters["job_title"]}
                    style={{ width: 300 }}
                    onChange={(event, value) => {
                      if (value === null || value == "") {
                        setFilters((filters) => ({
                          ...filters,
                          job_title: "",
                        }));

                        setPage(0);
                      } else {
                        {
                          setFilters((filters) => ({
                            ...filters,
                            job_title: event.target.value,
                          }));
                        }
                      }
                    }}
                  />
                </Box>
                <Box pt={3}>
                  What is your annual income (in USD, please)?
                  <br></br>
                  <TextField
                    required
                    required="required"
                    id="jobTitleData"
                    type="number"
                    value={filters["annual_salary"]}
                    style={{ width: 300 }}
                    onChange={(event, value) => {
                      if (value === null || value == "") {
                        setFilters((filters) => ({
                          ...filters,
                          annual_salary: "",
                        }));

                        setPage(0);
                      } else {
                        {
                          setFilters((filters) => ({
                            ...filters,
                            annual_salary: event.target.value,
                          }));
                        }
                      }
                    }}
                  />
                </Box>
                <Box pt={3}>
                  How many years of work experience do you have (professional) ?
                  <Autocomplete
                    required
                    id="workExp-dropdown"
                    options={workExperienceData}
                    value={filters["work_experience"]}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    onChange={(event, value) => {
                      if (value === null || value == "") {
                        setPage(0);
                        setFilters((filters) => ({
                          ...filters,
                          work_experience: "",
                        }));
                      } else {
                        setPage(0);
                        setFilters((filters) => ({
                          ...filters,
                          work_experience: value,
                        }));
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </Box>
                <Box pt={3}>
                  If you have any additional context for your job, please put it
                  here:
                  <br></br>
                  <TextField
                    required="required"
                    id="jobContextData"
                    value={filters["job_context"]}
                    style={{ width: 300 }}
                    onChange={(event, value) => {
                      if (value === null || value == "") {
                        setFilters((filters) => ({
                          ...filters,
                          job_context: "",
                        }));

                        setPage(0);
                      } else {
                        {
                          setFilters((filters) => ({
                            ...filters,
                            job_context: event.target.value,
                          }));
                        }
                      }
                    }}
                  />
                </Box>
                <Box pt={3}>
                  Please list any additional income or monetary compensation you
                  received in a year:
                  <br></br>
                  <TextField
                    required
                    required="required"
                    id="otherCompensationData"
                    type="number"
                    value={filters["other_compensation"]}
                    style={{ width: 300 }}
                    onChange={(event, value) => {
                      if (value === null || value == "") {
                        setFilters((filters) => ({
                          ...filters,
                          other_compensation: "",
                        }));

                        setPage(0);
                      } else {
                        {
                          setFilters((filters) => ({
                            ...filters,
                            other_compensation: event.target.value,
                          }));
                        }
                      }
                    }}
                  />
                </Box>
                <Box pt={3}>
                  If you have any additional context for your extra/added
                  income, please put it here:
                  <br></br>
                  <TextField
                    required="required"
                    id="otherCompensationContextData"
                    value={filters["other_con"]}
                    style={{ width: 300 }}
                    onChange={(event, value) => {
                      if (value === null || value == "") {
                        setFilters((filters) => ({
                          ...filters,
                          other_con: "",
                        }));

                        setPage(0);
                      } else {
                        {
                          setFilters((filters) => ({
                            ...filters,
                            other_con: event.target.value,
                          }));
                        }
                      }
                    }}
                  />
                </Box>
                <Box pt={3}>
                  What country do you work in?
                  <Autocomplete
                    required
                    id="country-dropdown"
                    options={countryData}
                    value={filters["country"]}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => {
                      if (value === null || value == "") {
                        setPage(0);
                        setFilters((filters) => ({
                          ...filters,
                          country: "",
                        }));
                      } else {
                        setPage(0);
                        setFilters((filters) => ({
                          ...filters,
                          country: value,
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
                  If you work from the United States of America, which
                  state/district are you from?
                  <Autocomplete
                    id="state-dropdown"
                    options={stateData}
                    value={filters["state"]}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => {
                      if (value === null || value == "") {
                        setPage(0);
                        setFilters((filters) => ({
                          ...filters,
                          state: "",
                        }));
                      } else {
                        setPage(0);
                        setFilters((filters) => ({
                          ...filters,
                          state: value,
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
                  What city do you live in?:
                  <Autocomplete
                    id="city-dropdown"
                    options={filteredCityData}
                    value={filters["city"]}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => {
                      if (value === null || value == "") {
                        setPage(0);
                        setFilters((filters) => ({
                          ...filters,
                          city: "",
                        }));
                      } else {
                        setPage(0);
                        setFilters((filters) => ({
                          ...filters,
                          city: value,
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
                  What is your highest level of completed education?
                  <Autocomplete
                    required
                    id="education-dropdown"
                    options={levelOfEducationData}
                    value={filters["Highest_Level_of_Education"]}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                    onChange={(event, value) => {
                      if (value === null || value == "") {
                        setFilters((filters) => ({
                          ...filters,
                          Highest_Level_of_Education: "",
                        }));

                        setPage(0);
                      } else {
                        setPage(0);
                        setFilters((filters) => ({
                          ...filters,
                          Highest_Level_of_Education: value,
                        }));
                      }
                    }}
                  />
                </Box>
                <Box pt={3}>
                  What is your gender?
                  <Autocomplete
                    required
                    id="gender-dropdown"
                    options={genderOptions}
                    value={filters["gender"]}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    onChange={(event, value) => {
                      if (value === null) {
                        setPage(0);
                        setFilters((filters) => ({
                          ...filters,
                          gender: "",
                        }));
                      } else {
                        setPage(0);
                        setFilters((filters) => ({
                          ...filters,
                          gender: value,
                        }));
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </Box>
                <Box pt={3}>
                  What is your race (Choose all that apply)?
                  <Autocomplete
                    required
                    multiple
                    id="race-dropdown"
                    options={raceData}
                    value={filters["race"] || []}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => {
                      if (value === null) {
                        setPage(0);
                        setFilters((filters) => ({ ...filters, race: "" }));
                      } else {
                        setPage(0);
                        setFilters((filters) => ({ ...filters, race: value }));
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
            <br></br>
            <Button onClick={handleClose} color="primary" variant="contained">
              Submit Response
            </Button>
          </DialogContent>
        </Container>
      </main>
    </div>
  );
}
