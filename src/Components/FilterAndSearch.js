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
import GoogleMaps from "./GoogleMaps.js";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import PageTitle from "./PageTitle";
import MarkerMap from "./GoogleMaps.js";
import NativeSelect from '@material-ui/core/NativeSelect';



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
    retrieveAllData();
    retrieveCountries();
    retrieveCities();
  }, []);

  // All data
  const [allData, setAllData] = useState([]);

  function getAll() {
    var res = axios.get(`http://localhost:5000/salary_data/all_2021`);
    return res
  }

  const retrieveAllData = () => {
    getAll()
      .then(response => {
        setAllData(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshData = () => {
    retrieveAllData();
  }

  // Rows for table
  let dataRows = allData.rows;
  var tableRow = [];
  for (var i in dataRows)
    tableRow.push(Object.values(dataRows[i]));

  // Table filter
  function find(query, by) {
    return axios.get(`http://localhost:5000/salary_data/all_2021?${by}=${query}`);
  }

  const finder = (query, by) => {
    find(query, by)
      .then(response => {
        setAllData(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  // Industry data
  const [industriesData, setIndustries] = useState([]);
  const [industrySearch, setIndustrySearch] = useState("");

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

  // const findByIndustry = (event, value) => {
  //   console.log(value)
  //   setIndustrySearch(value)
  //   finder(industrySearch, "Industry")
  //   refreshData()
  // }

  // Age State Handler
  const handleChange = (event) => {
    finder(event.target.value, "Age")
  };


  const [data, setData] = useState([]);


  // Gender Data
  const [genderData, setGenderData] = useState('');

  const genderOptions = [
    'Woman', 'Man', 'Non-binary', 'Other or prefer not to answer'
  ]

  // const genderOnChange = (event, value) => {
  //   console.log(value);
  //   setGenderData(value);
  //   finder(genderData, "Gender");
  // }


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
  const states = data.map(item => (item.State));
  const stateset = new Set(states);
  let statearray = [...stateset];
  const stateOptions = statearray.map(item => ({ label: item, value: item }));



  // City data

  const [cityData, setCityData] = useState([]);

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
              <div style={{ width: '100%' }}>
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
                    onChange={(event, value) => finder(value, "Industry")}
                  />
                </Box>
              </div>
              <Box pt={3}>
                Age Range:
                <div className={classes.root} >
                  <NativeSelect
                    id="demo-customized-select-native"
                    onChange={handleChange}
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
                    onChange={(event, value) => finder(value, "Gender")}
                    getOptionLabel={(option) => option}
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
                    options={countryData}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => finder(value, "Country")}
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
                    options={cityData}
                    getOptionLabel={(option) => option}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </Box>
              </div>
              <div style={{ width: "300px" }}>
                <Box pt={3}>
                  Google Maps
                  <GoogleMaps location={location} zoomLevel={8} />
                  <MarkerMap
                    location={location}
                    zoomLevel={8}
                    pinLocations={[
                      "Charlottesville United States",
                      "district of columbia United States of America",
                      "rio de janeiro brazil",
                      "paris france",
                    ]}
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