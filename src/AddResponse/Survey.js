import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import useStyles from "../Components/UseStyles.js";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState, setState } from "react";
import axios from "axios";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import cities from "./CitiesList";
import { usStates, countries } from "./CountryStateList";
import { work_exp } from "./AgeIndWorkExp";
import { education, races, gender } from "./EducationGenderRace";
/**
 * This component creates a survey for users to fill out with information about their salary, job, and some demographics. The response will
 * then be collected to create a JSON that will be sent to be added to our MongoDB Data_2021 collection
 */
export default function SurveyComponent() {
  // state variable used to store the current surveyResponses.
  const [surveyResponses, setSurveyResponses] = useState({});
  // setting default values to survey question on 2021 survey from AskAManager we don't wish to include in our survey
  surveyResponses["currency"] = "USD";
  surveyResponses["Other"] = "";
  surveyResponses["job_context"] = "";
  surveyResponses["other_context"] = "";

  /**
   *  "other_compensation",
      "work_experience",
      "country",
      "gender",
      "race",
   */
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

  // state variable used to store distinct gender dropdown options
  const [genderData, setGenderData] = useState([""]);

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
  // Hook that renders once, displaying the dropdown options for the different survey questions
  useEffect(() => {
    retrieveIndustries();
    setCountryData(countries);
    setCityData(cities);
    setStateData(usStates);
    setWorkExperienceData(work_exp);
    setLevelOfEducationData(education);
    setRaceData(races);
    setGenderData(gender);
  }, []);

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
   * This is a helper method to getCoordinates(). Given a String representing a location of an entry,
   * the method will use an API call to Google'usStates Geocoder and retrieve the coordinates and cleaned up
   * location name. This is what will be returned in the getCoordinates method.
   *
   * @param {*} str : String representing a location
   * @returns  the latitude, longitude, and cleaned up location name of the given String input
   */
  async function getCoordsFromAddress(str) {
    var loc = str.replace(/\usStates+/g, "+");
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
   * OnChange function to finish creating the JSON to send to the backend
   */
  const handleSurveySubmission = () => {
    //checking that all fields that need to be answered are answered
    // NOT FINISHED: Working on form validation- kind of works, but forces a reload if one entry not filled out
    // var requiredQuestions = [
    //   "age",
    //   "industry",
    //   "job_title",
    //   "annual_salary",
    //   "work_experience",
    //   "other_compensation",
    //   "country",
    //   "gender",
    //   "race",
    // ];
    // for (var i in requiredQuestions) {
    //   if (!surveyResponses.hasOwnProperty(i)) {
    //     surveyResponses[requiredQuestions[i]] = "";
    //   }
    // }
    // for (var key in surveyResponses) {
    //   if (surveyResponses.hasOwnProperty(key)) {
    //     console.log(key + ": " + surveyResponses[key]);
    //     if (requiredQuestions.includes(key) && surveyResponses[key] === "") {
    //       console.log(requiredQuestions.findIndex(key));
    //       alert(
    //         "ERROR: UNABLE TO SUBMIT RESPONSE. PLEASE ENTER A VALUE FOR QUESTION # 1"
    //       );
    //       window.location.reload();
    //     }
    //   }
    // }
    // ordering the race options like the 2021 survey is set up
    const racesOrder2021 = races;
    if (surveyResponses.race != (undefined || null)) {
      applyCustomOrder(surveyResponses.race, racesOrder2021);
      var raceString = "";
      for (var i = 0; i < surveyResponses.race.length; i++) {
        if (i == surveyResponses.race.length - 1) {
          raceString += surveyResponses.race[i];
        } else {
          raceString += surveyResponses.race[i] + ", ";
        }
      }
      surveyResponses.race = raceString;
    }
    // creating address string from the city,state,and country surveyResponses
    var addr = "";
    if (surveyResponses.city != (undefined || null)) {
      addr += surveyResponses.city + " ";
    }
    if (surveyResponses.state != (undefined || null)) {
      addr += surveyResponses.state + " ";
    }
    if (surveyResponses.country != (undefined || null)) {
      addr += surveyResponses.country;
    }
    surveyResponses["address"] = addr;

    // making api call to google geocoder with address filter to get lat and lng values

    submitJSONToDB();
    window.location.reload();
  };
  /**
   * async function that makes an api call using the helper method getCoordsFromAddress which takes the address string of a user's submission
   * and queries Google's Geocoder api to retrieve the latitude and longitude values (if possible)
   */
  async function submitJSONToDB() {
    if (surveyResponses.address != (undefined || null)) {
      try {
        var coords = await getCoordsFromAddress(surveyResponses.address);
        surveyResponses["lat"] = coords[0];
        surveyResponses["lng"] = coords[1];
      } catch (error) {
        console.error(error);
      }
    }
    axios.post(
      "http://localhost:5000/salary_data/addResponse",
      surveyResponses
    );
  }
  const handleOnChange = () => {
    console.log("Click");
  };

  return (
    <div className={classes.root}>
      <Container>
        <DialogContent>
          <form className={classes.filtercontainer}>
            <FormControl className={classes.formControl}>
              <Box pt={3}>
                What is your age?
                <Autocomplete
                  required
                  id="age-dropdown"
                  options={[
                    "under 18",
                    "18-24",
                    "25-34",
                    "35-44",
                    "45-54",
                    "55-64",
                    "65 or over",
                  ]}
                  value={filters["age"]}
                  getOptionLabel={(option) => option}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                  onChange={(event, value) => {
                    if (value === null || value == "") {
                      setFilters((filters) => ({
                        ...filters,
                        age: "",
                      }));

                      setPage(0);
                    } else {
                      setPage(0);
                      setFilters((filters) => ({
                        ...filters,
                        age: value,
                      }));
                    }
                  }}
                />
              </Box>

              <Box pt={3}>
                What industry do you work in?
                <Autocomplete
                  required
                  id="industry-dropdown"
                  options={industriesData}
                  value={surveyResponses["industry"]}
                  getOptionLabel={(option) => option}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                  onChange={(event, value) => {
                    if (value === null || value == "") {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        industry: "",
                      }));
                    } else {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
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
                  value={surveyResponses["job_title"]}
                  style={{ width: 300 }}
                  onChange={(event, value) => {
                    if (value === null || value == "") {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        job_title: "",
                      }));
                    } else {
                      {
                        setSurveyResponses((surveyResponses) => ({
                          ...surveyResponses,
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
                  value={surveyResponses["annual_salary"]}
                  style={{ width: 300 }}
                  onChange={(event, value) => {
                    if (value === null || value == "") {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        annual_salary: "",
                      }));
                    } else {
                      {
                        setSurveyResponses((surveyResponses) => ({
                          ...surveyResponses,
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
                  value={surveyResponses["work_experience"]}
                  getOptionLabel={(option) => option}
                  style={{ width: 300 }}
                  onChange={(event, value) => {
                    if (value === null || value == "") {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        work_experience: "",
                      }));
                    } else {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
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
                  value={surveyResponses["job_context"]}
                  style={{ width: 300 }}
                  onChange={(event, value) => {
                    if (value === null || value == "") {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        job_context: "",
                      }));
                    } else {
                      {
                        setSurveyResponses((surveyResponses) => ({
                          ...surveyResponses,
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
                  value={surveyResponses["other_compensation"]}
                  style={{ width: 300 }}
                  onChange={(event, value) => {
                    if (value === null || value == "") {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        other_compensation: "",
                      }));
                    } else {
                      {
                        setSurveyResponses((surveyResponses) => ({
                          ...surveyResponses,
                          other_compensation: event.target.value,
                        }));
                      }
                    }
                  }}
                />
              </Box>
              <Box pt={3}>
                If you have any additional context for your extra/added income,
                please put it here:
                <br></br>
                <TextField
                  required="required"
                  id="otherCompensationContextData"
                  value={surveyResponses["other_con"]}
                  style={{ width: 300 }}
                  onChange={(event, value) => {
                    if (value === null || value == "") {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        other_con: "",
                      }));
                    } else {
                      {
                        setSurveyResponses((surveyResponses) => ({
                          ...surveyResponses,
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
                  value={surveyResponses["country"]}
                  getOptionLabel={(option) => option}
                  onChange={(event, value) => {
                    if (value === null || value == "") {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        country: "",
                      }));
                    } else {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
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
                  value={surveyResponses["state"]}
                  getOptionLabel={(option) => option}
                  onChange={(event, value) => {
                    if (value === null || value == "") {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        state: "",
                      }));
                    } else {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
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
                <br></br>
                <TextField
                  id="city"
                  style={{ width: 300 }}
                  value={surveyResponses["city"]}
                  getOptionLabel={(option) => option}
                  onChange={(event, value) => {
                    if (value === null || value == "") {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        city: "",
                      }));
                    } else {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        city: event.target.value,
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
                  value={surveyResponses["Highest_Level_of_Education"]}
                  getOptionLabel={(option) => option}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                  onChange={(event, value) => {
                    if (value === null || value == "") {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        Highest_Level_of_Education: "",
                      }));
                    } else {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
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
                  options={genderData}
                  value={surveyResponses["gender"]}
                  getOptionLabel={(option) => option}
                  style={{ width: 300 }}
                  onChange={(event, value) => {
                    if (value === null) {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        gender: "",
                      }));
                    } else {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
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
                  value={surveyResponses["race"] || []}
                  getOptionLabel={(option) => option}
                  onChange={(event, value) => {
                    if (value === null) {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        race: "",
                      }));
                    } else {
                      setSurveyResponses((surveyResponses) => ({
                        ...surveyResponses,
                        race: value,
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
          <br></br>
          <Button
            onClick={handleSurveySubmission}
            color="primary"
            variant="contained"
          >
            Submit Response
          </Button>
        </DialogContent>
      </Container>
    </div>
  );
}
