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
import axios from "axios";

import {
  ResponsiveContainer,
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
  Cell,
} from "recharts";
import { median } from "d3";
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var data5 = [];
var topThree2019;
var topThree2021;
var medians = [];
var age_med_2019 = [];
var age_med_2021 = [];
var dqydj = [
  ["under 18", 0],
  ["18-24", 16500],
  ["25-34", 40105],
  ["35-44", 50277.5],
  ["45-54", 53001],
  ["55-64", 52350],
  ["65 or over", 54270],
];
let renderLabel = function (entry) {
  return entry[1];
};
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
  const colors1 = [
    "#ABCDEF",
    "#009900",
    "#CCCC00",
    "#FF0000",
    "#3333FF",
    "#00CCCC",
    "#FF00FF",
  ];

  useEffect(() => {
    (async function getData() {
      var response1 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/numALL"
      );
      data1 = response1.data;
      // console.log(data1);
      var response2 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/salaries"
      );
      data2 = response2.data;
      data2.sort((a, b) => b.val - a.val);
      data2 = data2.slice(0, 3);

      /// TOP 3 SALARIES DATA
      var t19 = await axios.get(
        "http://localhost:5000/salary_data/2019_top_salaries"
      );

      topThree2019 = t19.data;
      // console.log("2019: " + topThree2019);
      var t21 = await axios.get(
        "http://localhost:5000/salary_data/top_salaries"
      );

      topThree2021 = t21.data;
      // console.log("2021: " + topThree2021);
      /// MEDIAN OVERALL SALARIES 2019/2021
      var m19 = await axios.get(
        "http://localhost:5000/salary_data/2019_median_salary"
      );
      var m21 = await axios.get(
        "http://localhost:5000/salary_data/median_salary"
      );

      medians.push(["2019", m19.data[0].median]);
      medians.push(["2021", m21.data[0].median]);
      medians.push(["DQYDJ", 43206]);
      // console.log(medians);
      /// MEDIANS SALARIES FOR AGE GROUPS 2019 2021
      var ma19 = await axios.get(
        "http://localhost:5000/salary_data/2019_median_ages"
      );
      // console.log(ma19.data);
      var ma21 = await axios.get(
        "http://localhost:5000/salary_data/median_ages"
      );
      // console.log(ma21.data);
      age_med_2019 = ma19.data;
      age_med_2019.sort((a, b) => (a[0] > b[0] ? 1 : -1));
      age_med_2019.unshift(age_med_2019.pop());

      age_med_2021 = ma21.data;
      age_med_2021.sort((a, b) => (a[0] > b[0] ? 1 : -1));
      age_med_2021.unshift(age_med_2021.pop());

      console.log(age_med_2019);
      console.log(age_med_2021);
      var response3 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/degrees"
      );
      data3 = response3.data;
      for (let i = 0; i < data3.length; i++) {
        data3[i].fill = colors1[i];
      }
      var response4 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/ages"
      );
      data4 = response4.data;
      data4.sort((a, b) => (a._id > b._id ? 1 : -1));
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
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h3>Comparing the 2021 Dataset to Other Datasets</h3>
                </center>
                <p>
                  As our team analyzed and cleaned the 2021 survey responses on
                  the AskAManager.org site, we wanted to see how they compared
                  to other datasets. So, we decided to compare our findings with
                  the survey held in 2019 on AskAManager, and additionally
                  seeing how this data compares to the average American because
                  a large majority of responses came from people working in the
                  United States of America. Below are some of the most
                  interesting trends and analyses we were able to make when
                  looking at all of these datasets.
                </p>
              </Paper>
              <center>
                <h2>Top 3 Highest Earning Industries : 2019 vs 2021</h2>
              </center>
            </Grid>

            <Grid item xs={12} md={8} lg={6}>
              <Paper className={classes.paper}>
                <center></center>
                {!isLoaded ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <h3>2019</h3>
                    <BarChart
                      width={500}
                      height={320}
                      data={topThree2019}
                      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="0" />
                      <YAxis
                        label={{
                          value: "Salary ($k)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                        domain={[0, 160]}
                      />

                      <Bar dataKey="1" name="Salary" fill={colors[1]}>
                        <LabelList
                          dataKey="1"
                          angle={90}
                          position="center"
                          fontSize={12}
                        />
                      </Bar>
                      <Tooltip cursor={false} />
                    </BarChart>
                  </center>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <Paper className={classes.paper}>
                <center></center>
                {!isLoaded ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <h3>2021</h3>
                    <BarChart
                      width={500}
                      height={320}
                      data={topThree2021}
                      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="0" />
                      <YAxis
                        label={{
                          value: "Salary ($k)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                        domain={[0, 160]}
                      />

                      <Bar dataKey="1" name="Salary" fill={colors[2]}>
                        <LabelList angle={90} position="center" fontSize={12} />
                      </Bar>
                      <Tooltip cursor={false} />
                    </BarChart>
                  </center>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h3>
                    Findings From Comparing Top Earning Industries Between the
                    2019 and 2021 Datasets
                  </h3>
                </center>
                <p>
                  When looking at the top earning industries, we decided to look
                  at median annual salaries versus mean salaries because we felt
                  that this would produce more accurate results. One interesting
                  trend that can be observed is that both the 2019 and 2021 had
                  the same top 3 highest earning industries: Computing or Tech,
                  Aerospace, and Energy. This may be due to the fact that both
                  of these surveys come from the AskAManager blog which likely
                  means that many readers entered their salary information for
                  both years.
                </p>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h3>
                    Why Does the Average American Citizen Earn Less Than
                    AskAManager Respondants?
                  </h3>
                </center>
                <p>
                  In order to get a better idea of where respondants of the
                  survey compared to a more general population, we used
                  information gathered from a company called Don't Quit Your Day
                  Job (DQYDJ). We decided to use data from the United States
                  because it was the country that had the most entries from the
                  AskAManager survey responses. Based on their findings in 2019,
                  the median annual income in the United States was $43,206.
                  When comparing this value to both the 2019 and 2021
                  AskAManager survey results, there is a massive gap of about
                  $30,000 , with both datasets having a median personal salary
                  of about $70,000. There may be a few factors leading to this
                  gap. The first is that the data gathered from the AskAManager
                  blog were voluntary, so there is response bias that appears,
                  with higher-earning respondants choosing to share their
                  salaries versus research over an more general population.
                  Another factors is the amount of responses and data from each
                  dataset. For example, both surveys yielded a total of about
                  50,000 responses whereas the DQYDJ research was based on 175+
                  million responses.
                </p>
              </Paper>
              <center>
                <h2>Comparing Median Salaries : 2019 vs 2021 vs DQYDJ</h2>
              </center>
            </Grid>
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                {!isLoaded ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <BarChart
                      width={600}
                      height={320}
                      data={medians}
                      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="0" />
                      <YAxis
                        label={{
                          value: "Salary ($k)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                        domain={[0, 80000]}
                      />
                      {/* api /docs used:https://recharts.org/en-US/api/Cell */}
                      <Bar dataKey="1" name="Median Salary" fill={colors[0]}>
                        {medians.map((entry, index) => (
                          <Cell
                            dataKey="1"
                            key={medians[index][1]}
                            fill={colors[index]}
                            strokeWidth={index === 2 ? 4 : 1}
                          />
                        ))}
                      </Bar>
                      <Tooltip cursor={false} />
                      <LabelList
                        dataKey="1"
                        angle={90}
                        position="center"
                        fontSize={12}
                      />
                    </BarChart>
                  </center>
                )}
              </Paper>
              <center>
                <h2>
                  Comparing Median Salaries By Age : 2019 vs 2021 vs DQYDJ
                </h2>
              </center>
            </Grid>
            <Grid item xs={12} md={8} lg={4}>
              <Paper className={classes.paper}>
                {!isLoaded ? (
                  <CircularProgress />
                ) : (
                  <center>
                    <LineChart
                      width={350}
                      height={300}
                      data={age_med_2019}
                      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="0"
                        name="Age Group"
                        padding={{ left: 10, right: 10 }}
                      >
                        <Label
                          value="Age"
                          offset={-15}
                          position="insideBottom"
                        />
                      </XAxis>
                      <Tooltip />
                      <YAxis
                        name="Median Salary"
                        label={{
                          value: "Salary $k",
                          angle: -90,
                          position: "insideLeft",
                        }}
                        domain={[0, 120]}
                      />
                      <Line
                        type="monotone"
                        dataKey="1"
                        name="Median Salary"
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
                {!isLoaded ? (
                  <CircularProgress />
                ) : (
                  <center>
                    <LineChart
                      width={350}
                      height={300}
                      data={age_med_2021}
                      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="0"
                        name="Age Group"
                        padding={{ left: 10, right: 10 }}
                      >
                        <Label
                          value="Age"
                          offset={-15}
                          position="insideBottom"
                        />
                      </XAxis>
                      <Tooltip />
                      <YAxis
                        name="Median Salary"
                        label={{
                          value: "Salary $k",
                          angle: -90,
                          position: "insideLeft",
                        }}
                        domain={[0, 120]}
                      />
                      <Line
                        type="monotone"
                        dataKey="1"
                        name="Median Salary"
                        fill={colors[1]}
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
                {!isLoaded ? (
                  <CircularProgress />
                ) : (
                  <center>
                    <LineChart
                      width={350}
                      height={300}
                      data={dqydj}
                      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="0"
                        name="Age Group"
                        padding={{ left: 10, right: 10 }}
                      >
                        <Label
                          value="Age"
                          offset={-15}
                          position="insideBottom"
                        />
                      </XAxis>
                      <Tooltip />
                      <YAxis
                        name="Median Salary"
                        label={{
                          value: "Salary $k",
                          angle: -90,
                          position: "insideLeft",
                        }}
                        domain={[0, 120]}
                      />
                      <Line
                        type="monotone"
                        dataKey="1"
                        name="Median Salary"
                        fill={colors[2]}
                        activeDot={{ r: 8 }}
                        label={{ value: "salary", position: "top" }}
                      />
                    </LineChart>
                  </center>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h3>Examining the Trends in Median Salary By Age</h3>
                </center>
                <p>
                  When looking at the three different median salary
                  distributions by age in the datasets, there are some trends
                  and variations that appear. Something that is interesting is
                  that the 2019 AskAManager results and the DQYDJ values seems
                  to trend similarily, with a mostly increasing median salary as
                  age increases. However, upon observing the 2021 AskAManager
                  results, there are more dips in the data, with a heavy
                  decrease from 25-34 years old with a median salary of $97,000
                  to $38,944.6 for people aged between 45-54. Something else to
                  note is that the highest earning age group in this dataset
                  (2021) were 25-34 year olds, whereas with the other two
                  datasets older age groups had the highest median salaries.
                  Something that may have created this variation in pay for 2021
                  is the COVID pandemic, as many people lost employment which
                  could impact the median salary for a certain age group.
                </p>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
