import React, { useEffect } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
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
import FirstDatasetTable from "./FirstDatasetTable";
import SecondDatasetTable from "./SecondDatasetTable";
import useStyles from "./UseStyles.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
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

const colors = ["#0088FE", "#82ca9d", "#FFBB28"];
const colors1 = [
  "#ABCDEF",
  "#009900",
  "#CCCC00",
  "#FF0000",
  "#3333FF",
  "#00CCCC",
  "#FF00FF",
];
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var data5 = [];
var data6 = [];
var data7 = [];
var data8 = [];
var data9 = [];
var data10 = [];

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
      var response1 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/ages"
      );
      data1 = response1.data;
      data1.sort((a, b) => (a._id > b._id ? 1 : -1));
      data1.unshift(data1.pop());

      var response2 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/disAge"
      );
      data2 = response2.data;
      data2.sort((a, b) => (a._id > b._id ? 1 : -1));
      data2.unshift(data2.pop());
      let temp1 = data2.slice(0, 3);
      let temp2 = data2.slice(3);
      temp1.push(temp1.shift());
      data2 = temp1.concat(temp2);
      for (let i = 0; i < data2.length; i++) {
        data2[i].fill = colors1[i];
      }

      var response3 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/disDegrees"
      );
      data3 = response3.data;
      for (let i = 0; i < data3.length; i++) {
        data3[i].fill = colors1[i];
      }

      var response4 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/degrees"
      );
      data4 = response4.data;
      for (let i = 0; i < data4.length; i++) {
        if (data4[i]._id === "High School") {
          data4[i].compare = 0;
        }
        if (data4[i]._id === "Some college") {
          data4[i].compare = 1;
        }
        if (data4[i]._id === "College degree") {
          data4[i].compare = 2;
        }
        if (data4[i]._id === "Master's degree") {
          data4[i].compare = 3;
        }
        if (data4[i]._id === "PhD") {
          data4[i].compare = 4;
        }
        if (data4[i]._id === "Professional degree (MD, JD, etc.)") {
          data4[i].compare = 5;
        }
        if (data4[i]._id === "Other") {
          data4[i].compare = 6;
        }
      }
      data4.sort((a, b) => (a.compare > b.compare ? 1 : -1));
      for (let i = 0; i < data4.length; i++) {
        data4[i].fill = colors1[i];
      }

      var response5 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/salaries"
      );
      data5 = response5.data;
      data5.sort((a, b) => (a._id > b._id ? 1 : -1));

      // var response1 = await axios.get('http://localhost:5000/salary_data/numALL');
      // data1 = response1.data;
      // console.log(data1);

      // var response3 = await axios.get('http://localhost:5000/salary_data/degrees');
      // data3 = response3.data;
      // for (let i = 0; i < data3.length; i++) {
      //   data3[i].fill = colors1[i];
      // }

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
            <Grid item xs={12} md={8} lg={8}>
              <Paper className={classes.paper}>
                <center>
                  <h2>Average Annual Salary over Time</h2>
                </center>
                {!isLoaded ? (
                  <CircularProgress />
                ) : (
                  <center>
                    <LineChart
                      width={620}
                      height={300}
                      data={data1}
                      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="_id" padding={{ left: 10, right: 10 }}>
                        <Label
                          value="Age"
                          offset={-15}
                          position="insideBottom"
                        />
                      </XAxis>
                      <Tooltip />
                      <YAxis
                        label={{
                          value: "Salary $k",
                          angle: -90,
                          position: "insideLeft",
                        }}
                        domain={[0, 120]}
                      />
                      <Line
                        type="monotone"
                        dataKey="salary"
                        fill={colors[0]}
                        activeDot={{ r: 8 }}
                        label={{ value: "salary", position: "top" }}
                      />
                    </LineChart>
                  </center>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={4}>
              <Paper className={classes.paper}>
                <center>
                  <h2>Distribution of Age Groups</h2>
                </center>
                {!isLoaded ? (
                  <CircularProgress />
                ) : (
                  <center>
                    <PieChart
                      width={290}
                      height={300}
                      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                    >
                      <Pie
                        data={data2}
                        dataKey="val"
                        nameKey="_id"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                      />
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </center>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h3>Annual Salary Peaks in Late Forties and Early Fifties</h3>
                </center>
                <p>
                  According to the data collected from Ask A Manager's 2021
                  survey, the line chart on the left shows the progression of
                  annual salary over time. As age grows, the annual salary
                  generally increases, and it peaks around when a person is
                  between 45 and 54. Not surprisingly, the average annual salary
                  starts to go down hill when people get older than 54.
                  Interestingly enough, people who are between 18 and 24 earn
                  significantly less than people who are below 18. As expected,
                  the biggest increase in annual salary is from the 18-24 to the
                  25-34 age group, perhaps due to the completion of a college
                  degree or graduate degree. It is also worth noting that most
                  of the respondants of this survey are young professionals aged
                  25 to 44. Only 10 people are below 18 and 88 people are over
                  65, so their average annual salary are by no means
                  representative of the greater population in their respective
                  age groups. The lack of respondants in the under 18 age group
                  could explain why its average annual salary is greater than
                  that of the 18-24 age group. The 2021 survey is by no means
                  perfect, and the uneven distribution of of age groups among
                  the respondants contributes directly to this flaw.
                </p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={4}>
              <Paper className={classes.paper}>
                <center>
                  <h2>Distribution of Degrees</h2>
                </center>
                {!isLoaded ? (
                  <CircularProgress />
                ) : (
                  <center>
                    <PieChart
                      width={290}
                      height={320}
                      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                    >
                      <Pie
                        data={data3}
                        dataKey="val"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                      />
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </center>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={8}>
              <Paper className={classes.paper}>
                <center>
                  <h2>Average Annual Salary By Degree</h2>
                </center>
                {!isLoaded ? (
                  <CircularProgress />
                ) : (
                  <BarChart width={600} height={320} data={data4}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="_id"
                      label={{
                        value: "Highest Level of Education",
                        position: "insideBottom",
                        offset: -2,
                      }}
                    />
                    <YAxis
                      label={{
                        value: "Salary ($k)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                      domain={[30, 150]}
                    />
                    <Bar dataKey="salary">
                      <LabelList
                        dataKey="_id"
                        angle={270}
                        position="center"
                        fontSize={14}
                        fill="#000000"
                      />
                    </Bar>
                    <Tooltip cursor={false} />
                  </BarChart>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h3>Is a Master's or PhD Worth It?</h3>
                </center>
                <p>
                  Apart from the 1887 people who did not specify their highest
                  level of education most people falls in the trend that higher
                  degree means higher income. Surprisingly people with some
                  college actually earn less than people with only high school
                  degrees. Finishing a bachelor's degree is crucial as it
                  provides an almost 10k salary increase from a high school
                  level education. People with a master's degree slightly edge
                  out college degree holders, but the jump in numbers is not
                  very significant at all. PhD holders earn 8k more per year on
                  average than master's degree holders, so if you are truly
                  interested in studying, innovating, and researching new
                  frontiers of your area of choice, the paycheck could be worth
                  the time investment. Most universities offer stipends for most
                  of their PhD graduate students, and some master's students
                  occasionally recieve aid as well. Astonishingly, people who
                  have completed a professional degree(MD, JD,etc.) earn
                  significanly more than any other catagory, even out edging PhD
                  holders by 34k per year! Maybe you should be considering to
                  become a doctor or lawyer after all.
                </p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h2>Average Annual Salary Across Industries</h2>
                </center>
                {!isLoaded ? (
                  <CircularProgress />
                ) : (
                  <center>
                    <BarChart
                      width={1500}
                      height={370}
                      data={data5}
                      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="_id"
                        padding={{ left: 10, right: 10 }}
                        label={{
                          value: "Industries",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "Salary ($k)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                        domain={[30, 150]}
                      />
                      <Bar dataKey="salary" fill={colors[1]}>
                        <LabelList
                          dataKey="_id"
                          angle={270}
                          position="center"
                          fontSize={12}
                          fill="#000000"
                        />
                      </Bar>
                      <Tooltip cursor={false} />
                    </BarChart>
                  </center>
                )}
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
