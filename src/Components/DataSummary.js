import React, { useEffect } from "react";
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
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import mainListItems from "./listItems";
import Copyright from "./Copyright";
import Title from "./Title";
import PageTitle from "./PageTitle";
import { GoogleSpreadsheet } from "google-spreadsheet";
import TestTable from "./TestTable";
import FirstDatasetTable from "./FirstDatasetTable";
import SecondDatasetTable from "./SecondDatasetTable";
import useStyles from "./UseStyles.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios';
import {RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, PieChart, Pie,
LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip, Legend, LabelList} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const colors1 = ['#ABCDEF', '#009900', '#CCCC00', '#FF0000', '#3333FF', '#00CCCC', '#FF00FF'];
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];

export default function DataSummary() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [isLoaded, setIsLoaded] = React.useState(false);
  useEffect(() => {
    (async function getData() {
      // var response1 = await axios.get('http://localhost:5000/salary_data/numALL');
      // data1 = response1.data;
      // console.log(data1);
      // var response2 = await axios.get('http://localhost:5000/salary_data/salaries');
      // data2 = response2.data;
      // data2.sort((a, b) => (a._id > b._id) ? 1 : -1);
      // var response3 = await axios.get('http://localhost:5000/salary_data/degrees');
      // data3 = response3.data;
      // for (let i = 0; i < data3.length; i++) {
      //   data3[i].fill = colors1[i];
      // }
      var response4 = await axios.get('http://localhost:5000/salary_data/ages');
      data4 = response4.data;
      data4.sort((a, b) => (a._id > b._id) ? 1 : -1);
      data4.unshift(data4.pop());
      setIsLoaded(true);
    })();
  }, []);

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


          <Grid item xs = {12} md = {8} lg = {9}>
              <Paper className = {classes.paper}>
                <center><h4>Change in Average Annual Salary over Time</h4></center>
                {!isLoaded ? (
                  <CircularProgress />
                ) : (
                  <center>
                    <LineChart 
                      width={700} 
                      height={350} 
                      data={data4}
                      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="_id" padding={{ left: 10, right: 10 }}>
                        <Label value = "Age" offset={-15} position="insideBottom" />
                      </XAxis>
                      <Tooltip />
                      <YAxis label = {{value: "Salary $k", angle: -90, position: "insideLeft"}} 
                      domain = {[0, 120]}/>
                      <Line type="monotone" dataKey="val" fill = {colors[0]} />
                    </LineChart>
                  </center>
                )}
              </Paper>
            </Grid>
            <Grid item xs = {12} md = {8} lg = {3}>
              <Paper className = {classes.paper}>
                <h2>Text Here.</h2>
              </Paper>
            </Grid>


            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Title>Summary of Major Data Trends</Title>
                Raw Data for 2019 AskAManager.org Salary Survey
                <FirstDatasetTable />
              </Paper>
            </Grid>
          </Grid>
          <Paper className={classes.paper}>
            Raw Data for 2021 AskAManager.org Salary Survey
            <SecondDatasetTable />
          </Paper>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
