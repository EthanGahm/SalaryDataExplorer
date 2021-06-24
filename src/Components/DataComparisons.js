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
import Title from "./Title";
import PageTitle from "./PageTitle";
import Copyright from "./Copyright";
import useStyles from "./UseStyles.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios';


import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var data5 = [];
export default function DataComparisons() {
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
  const colors = ["#0088FE", "#00C49F", "#FFBB28"];
  const colors1 = ['#ABCDEF', '#009900', '#CCCC00', '#FF0000', '#3333FF', '#00CCCC', '#FF00FF'];

  useEffect(() => {
    (async function getData() {
  
      var response1 = await axios.get('https://salary-data-api.herokuapp.com/salary_data/numALL');
      data1 = response1.data;
      console.log(data1);
      var response2 = await axios.get('https://salary-data-api.herokuapp.com/salary_data/salaries');
      data2 = response2.data;
      data2.sort((a, b) => (b.val - a.val) );
      data2 = data2.slice(0,3)
      var response5 = await axios.get('http://localhost:8080/salary_data/2019_salaries');
      data5 = response5.data;
      data5.sort((a, b) => (b.val - a.val) );
      data5 = data5.slice(0,3)
       
      var response3 = await axios.get('https://salary-data-api.herokuapp.com/salary_data/degrees');
      data3 = response3.data;
      for (let i = 0; i < data3.length; i++) {
        data3[i].fill = colors1[i];
      }
      var response4 = await axios.get('https://salary-data-api.herokuapp.com/salary_data/ages');
      data4 = response4.data;
      data4.sort((a, b) => (a._id > b._id) ? 1 : -1);
      data4.unshift(data4.pop());
      setIsLoaded(true);
  
    })();
  }, [data2]);

 

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
          <PageTitle text="Data Comparisons" />
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
            <Grid item xs={12} md={8} lg={9}>
            <center>
              <Paper className={classes.paper}>
                <center>
                <Title>Comparing the 2021 Dataset to Other Datasets</Title>
                As our team analyzed and cleaned the 2021 survey responses on
                the AskAManager.org site, we wanted to see how they compared to
                other datasets. So, we decided to compare our findings with the
                survey held in 2019 on AskAManager, and additionally seeing how
                this data compares to the average American because a large
                majority of responses came from people working in the United
                States of America. Below are some of the most interesting trends
                and analyses we were able to make when looking at all of these
                datasets.
                </center>
              </Paper>
              </center>
            </Grid>
            <Grid item xs = {12} md = {8} lg = {12}>
              <Paper className = {classes.paper}>
                <center><h4>Top 3 Highest Earning Industries : 2019 vs 2021</h4></center>
                {!isLoaded ? (
                  <center>
                  <CircularProgress />
                  </center>
                ) : (
                  <center>
                    
                    <BarChart 
                      width = {1000} 
                      height = {500} 
                      data = {data2} 
                      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                    >
                    <CartesianGrid strokeDasharray = "3 3" />
                    <XAxis dataKey = "_id"/>
                    <YAxis 
                      label = {{value: "Salary ($k)", angle: -90, position: "insideLeft"}}
                      domain = {[0, 160]}
                    />
                
                    <Bar 
                      dataKey = "val" 
                      fill = {colors[1]}  
                    >
                      <LabelList dataKey = "_id" angle = {90} position = "center" fontSize = {12}/>
                    </Bar>
                    <Tooltip />
                    
                     
                     
                    </BarChart>
                    <BarChart 
                      width = {1000} 
                      height = {500} 
                      data = {data5} 
                      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                    >
                    <CartesianGrid strokeDasharray = "3 3" />
                    <XAxis dataKey = "_id"/>
                    <YAxis 
                      label = {{value: "Salary ($k)", angle: -90, position: "insideLeft"}}
                      domain = {[0, 160]}
                    />
                   
                    <Bar 
                      dataKey = "val" 
                      fill = {colors[2]}  
                    >
                      <LabelList dataKey = "_id" angle = {90} position = "center" fontSize = {12}/>
                    </Bar>
                    <Tooltip/>
                    </BarChart>
                  </center>
                )
                }
              </Paper>
            </Grid>


          <Box pt={4}>
            <Copyright />
          </Box>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
