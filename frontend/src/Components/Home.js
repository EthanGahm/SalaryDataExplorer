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
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, PieChart, Pie, LineChart,
   Line, CartesianGrid, XAxis, YAxis, Label, Tooltip, Legend} from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28']; 

const data1 = [{"age": "under 18", "salary": 40}, {"age": "18-24", "salary": 70}, 
{"age": "25-34", "salary": 130}, {"age": "35-44", "salary": 170}, {"age": "45-54", "salary": 220}, 
{"age": "55-64", "salary": 250}, {"age": "65 or over", "salary": 300}];
const data = [{"name": "Computing or Tech", "val": 100, "fill": colors[0]}, {"name": "Accounting, Banking & Finance", 
"val": 50, "fill": colors[1]}, {"name": "Education (Higher Education)", "val": 170, "fill": colors[2]}];

export default function Home() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
          <PageTitle text="Home" />
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
              <Paper className={classes.paper}>
                <Title>About this Tool</Title>
                This is a tool that allows users to access information about their salaries based on the
                2021 ask a manager survey. Users could search for a specific job position or industry to
                find salary data. We have charts and graphs to represent the different levels of salaries, 
                and we could show corrolations between demographics and salary.
              </Paper>
            </Grid>


            <Grid item xs = {12} md = {8} lg = {9}>
              <Paper className={classes.paper}>     
                <center><h4>Salary Over Time for Computer Scientists</h4></center>                
                <center><LineChart width={700} height={300} data={data1}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" padding={{ left: 10, right: 10 }}>
                    <Label value = "Age" offset={-15} position="insideBottom" />
                  </XAxis>
                  <YAxis label = {{value: "Salary", angle: -90, position: "insideLeft"}} />
                  <Tooltip />
                  <Line type="monotone" dataKey="salary" fill = {colors[0]} />
                </LineChart></center>
              </Paper>
            </Grid>
          </Grid>


          <Grid item xs = {12} md = {8} lg = {9}>
            <Paper className = {classes.paper}>
              <h4><center>Number of People for Each Degree</center></h4>
              <center><PieChart width={300} height={350} margin = {{ top: 5, right: 0, left: 0, bottom: 5}}>
                <Pie data = {data} dataKey = "val" nameKey = "name" cx = "50%" cy = "50%" outerRadius = {100} 
                label />
                <Legend />
              </PieChart></center>
              </Paper>
          </Grid>


          <Grid item xs = {12} md = {8} lg = {9}>
              <Paper className = {classes.paper}>
                <center><h4>Salaries for Different Jobs</h4></center>
                <center><BarChart width = {700} height = {300} data = {data} 
                margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray = "3 3" />
                  <XAxis dataKey = "name" padding={{ left: 10, right: 10 }}/>
                  <YAxis label = {{value: "Salary", angle: -90, position: "insideLeft"}}/>
                  <Bar dataKey = "val" fill = {colors[2]} />
                  <Tooltip />
                </BarChart></center>
              </Paper>
          </Grid>


          <Grid item xs = {12} md = {8} lg =  {9}>
            <Paper className = {classes.paper}>
              <center><h4>Distribution of People in the Job Market</h4></center>
              <center><RadarChart outerRadius = {100} width = {600} height = {250} data = {data}>
                <PolarGrid />
                <PolarAngleAxis dataKey = "name"/>
                <PolarRadiusAxis angle = {30} domain = {[0, 150]} />
                <Radar name = "Men" dataKey = "val" fill = {colors[1]} fillOpacity = {0.5} animationBegin 
                animationDuration = {3000} />
                <Legend />
              </RadarChart></center>
            </Paper>
          </Grid>


          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
