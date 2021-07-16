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
// importing element from recharts package to use for data visualization and analysis
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  LabelList,
  Cell,
} from "recharts";

// various variables and lists that are initialized. They will be used later on when retrieving data from our API endpoints
var salaries21 = [];
var topThree2019;
var topThree2021;
var medians = [];
var age_med_2019 = [];
var age_med_2021 = [];
var dqydj = [
  ["under 18", 0],
  ["18-24", 16.5],
  ["25-34", 40.11],
  ["35-44", 50.28],
  ["45-54", 53.0],
  ["55-64", 52.35],
  ["65 or over", 54.27],
];

export default function DataComparisons() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [isLoadedTopIndustries, setIsLoadedTopIndustries] =
    React.useState(false);
  const [isLoadedMedSals, setIsLoadedMedSals] = React.useState(false);
  const [isLoadedByAge, setIsLoadedByAge] = React.useState(false);
  // colors for the graphs
  const colors = ["#0088FE", "#00C49F", "#FFBB28"];

  /**
   * This method is built from this link: https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
   * @param {*} num number to convert to thousands of dollars
   * @returns newly formatted number
   */
  function convertNumFormat(num) {
    if (Math.abs(num) > 999) {
      num = (Math.abs(num) / 1000).toFixed(1);
    }
    return num;
  }
  //this useEffect makes API calls to our backend/database and retrieve data needed to build the graphs/analyze
  useEffect(() => {
    (async function getData() {
      /// TOP 3 SALARIES DATA FOR 2019 AND 2021
      var t19 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/2019_top_salaries"
      );

      topThree2019 = t19.data;
      // console.log("2019: " + topThree2019);
      var t21 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/top_salaries"
      );

      topThree2021 = t21.data;
      setIsLoadedTopIndustries(true);
      // console.log("2021: " + topThree2021);
      /// MEDIAN OVERALL SALARIES 2019/2021
      var m19 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/2019_median_salary"
      );
      var m21 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/median_salary"
      );
      medians = [];
      medians.push(["2019", m19.data[0].median]);
      medians.push(["2021", m21.data[0].median]);
      medians.push(["DQYDJ", 43206]);
      setIsLoadedMedSals(true);
      // console.log(medians);
      /// MEDIANS SALARIES FOR AGE GROUPS 2019 2021
      var ma19 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/2019_median_ages"
      );
      // console.log(ma19.data);
      var ma21 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/median_ages"
      );
      // console.log(ma21.data);
      age_med_2019 = ma19.data;
      for (var i in age_med_2019) {
        age_med_2019[i][1] = convertNumFormat(age_med_2019[i][1]);
        // console.log(age_med_2019[i][1]);
      }

      age_med_2019.sort((a, b) => (a[0] > b[0] ? 1 : -1));
      age_med_2019.unshift(age_med_2019.pop());

      age_med_2021 = ma21.data;
      for (var i in age_med_2021) {
        age_med_2021[i][1] = convertNumFormat(age_med_2021[i][1]);
      }
      age_med_2021.sort((a, b) => (a[0] > b[0] ? 1 : -1));
      age_med_2021.unshift(age_med_2021.pop());

      // console.log(age_med_2019);
      // console.log(age_med_2021);
      var response3 = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/degrees"
      );

      setIsLoadedByAge(true);
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
                  The 2021 AskAManager.org salary survey is only one tiny
                  snapshot of a relatively small group of people. Here, we
                  compare data from the 2021 survey to data from a similar
                  survey conducted in 2019. In addition, because a majority of
                  survey responses were from US readers, we examine how the
                  salaries of typical respondants compare to those of the
                  average American. Below are some of the most interesting
                  trends and analyses we were able to find when looking at all
                  of these datasets.
                </p>
              </Paper>
              <center>
                <h2>Top 3 Highest Earning Industries : 2019 vs 2021</h2>
              </center>
            </Grid>
            {/* first graphs comparing the 2019 and 2021 highest earning industries*/}
            <Grid item xs={12} md={8} lg={6}>
              <Paper className={classes.paper}>
                <center></center>
                {!isLoadedTopIndustries ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <h3>2019</h3>
                    {/* First barchart- 2019 top three industries */}
                    <BarChart
                      width={500}
                      height={320}
                      data={topThree2019}
                      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="0" />
                      <YAxis
                        tickFormatter={(value) =>
                          Math.round(value).toLocaleString()
                        }
                        label={{
                          value: "Salary ($)",
                          angle: -90,

                          dx: -30,
                        }}
                        domain={[0, 160]}
                      />

                      <Bar dataKey="1" name="Salary" fill={colors[1]}>
                        <LabelList
                          dataKey="1"
                          angle={0}
                          position="middle"
                          fontSize={16}
                          formatter={(value) =>
                            "$" + Math.round(value).toLocaleString()
                          }
                        />
                      </Bar>
                      <Tooltip
                        cursor={false}
                        formatter={(value) =>
                          "$" + Math.round(value).toLocaleString()
                        }
                      />
                    </BarChart>
                  </center>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <Paper className={classes.paper}>
                <center></center>
                {!isLoadedTopIndustries ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <h3>2021</h3>
                    {/* Other bar chart - this one is the 2021 top industries */}
                    <BarChart
                      width={500}
                      height={320}
                      data={topThree2021}
                      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="0" />
                      <YAxis
                        dx={5}
                        tickFormatter={(value) =>
                          Math.round(value).toLocaleString()
                        }
                        label={{
                          value: "Salary ($)",
                          angle: -90,
                          dx: -30,
                          // position: "insideLeft",
                        }}
                        domain={[0, 140]}
                      />

                      <Bar dataKey="1" name="Salary" fill={colors[2]}>
                        <LabelList
                          dataKey="1"
                          angle={0}
                          position="middle"
                          fontSize={16}
                          formatter={(value) =>
                            "$" + Math.round(value).toLocaleString()
                          }
                        />
                      </Bar>
                      <Tooltip
                        cursor={false}
                        formatter={(value) =>
                          "$" + Math.round(value).toLocaleString()
                        }
                      />
                    </BarChart>
                  </center>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={12}>
              {/* Summarizing results from 2019 and 2021 comparison */}
              <Paper className={classes.paper}>
                <center>
                  <h3>
                    Findings From Comparing Top Earning Industries Between the
                    2019 and 2021 Datasets
                  </h3>
                </center>
                <p>
                  To reduce the skewing effects of outlier data points, we
                  examined the median (rather than mean) annual salaries of top
                  earning industries across both datasets. Notably, both the
                  2019 and 2021 datasets had the same top 3 highest earning
                  industries: Computing or Tech, Aerospace, and Energy. This may
                  be due to the fact that both of these surveys come from the
                  AskAManager blog which likely means that many readers entered
                  their salary information for both years.
                </p>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  {/* Introducing new dataset/context for further comparison */}
                  <h3>
                    Why Does the Average American Citizen Earn Less Than
                    AskAManager Respondants?
                  </h3>
                </center>
                <p>
                  In order to get a better idea of how respondants of the survey
                  compared to a more general population, we used information
                  gathered from a company called "Don't Quit Your Day Job"
                  (DQYDJ). We decided to use data from the United States because
                  it was the country that had the most entries from the
                  AskAManager survey responses. Based on their findings in 2019,
                  the median annual income in the United States was $43,206.
                  When comparing this value to both the 2019 and 2021
                  AskAManager survey results, there is a gap of about $30,000 ,
                  with both datasets having a median personal salary of about
                  $70,000. A few factors might contribute to this discrepency.
                  The first is that the data gathered from the AskAManager blog
                  were voluntary, so there is response bias that appears, with
                  higher-earning respondants choosing to share their salaries
                  versus research over an more general population. As shown on
                  the data summary page, respondants are overwhelmingly white,
                  highly-educated, and tend to work in high-earning industries,
                  like computing and tech. Another factor is the amount of
                  responses and data from each dataset. For example, both
                  surveys yielded a total of about 50,000 responses whereas the
                  DQYDJ research was based on more than 175 million datapoints.
                </p>
              </Paper>
              <center>
                <h2>Comparing Median Salaries : 2019 vs 2021 vs DQYDJ</h2>
              </center>
            </Grid>
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                {!isLoadedMedSals ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    {/* barchart comparing the  overall median salary between 2019,2021, and Don't Quit Your Day Job  */}
                    <BarChart
                      width={600}
                      height={320}
                      data={medians}
                      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="0" />
                      <YAxis
                        tickFormatter={(value) =>
                          Math.round(value).toLocaleString()
                        }
                        label={{
                          value: "Salary ($)",
                          angle: -90,
                          dx: -35,
                        }}
                        domain={[0, 80000]}
                      />
                      {/* api /docs used:https://recharts.org/en-US/api/Cell */}
                      <Bar dataKey="1" name="Median Salary" fill={colors[0]}>
                        <LabelList
                          dataKey="0"
                          angle={0}
                          position="center"
                          fontSize={14}
                          fill={"#000000"}
                        />
                        <LabelList
                          dataKey="1"
                          angle={0}
                          position="top"
                          fontSize={16}
                          fill={"#000000"}
                          formatter={(value) =>
                            "$" + Math.round(value).toLocaleString()
                          }
                        />
                        {medians.map((entry, index) => (
                          <Cell
                            dataKey="1"
                            key={medians[index][1]}
                            fill={colors[index]}
                            strokeWidth={index === 2 ? 4 : 1}
                          />
                        ))}
                      </Bar>
                      <Tooltip
                        cursor={false}
                        formatter={(value) =>
                          "$" + Math.round(value).toLocaleString()
                        }
                      />
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
                {!isLoadedByAge ? (
                  <CircularProgress />
                ) : (
                  <center>
                    {/* First of three line chart to compare the median salary by age - this is for 2019 */}
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
                      <Tooltip formatter={(num) => "$" + num + "k"} />
                      <YAxis
                        name="Median Salary"
                        label={{
                          value: "Salary ($k)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                        domain={[0, 110]}
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
                {!isLoadedByAge ? (
                  <CircularProgress />
                ) : (
                  <center>
                    {/* Second of three line chart to compare the median salary by age - this is for 2021 */}
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
                      <Tooltip formatter={(num) => "$" + num + "k"} />
                      <YAxis
                        name="Median Salary"
                        label={{
                          value: "Salary ($k)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                        domain={[0, 110]}
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
                {!isLoadedByAge ? (
                  <CircularProgress />
                ) : (
                  <center>
                    {/* Last of three line chart to compare the median salary by age - this is for DQYDJ */}
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
                      <Tooltip formatter={(num) => "$" + num + "k"} />
                      <YAxis
                        name="Median Salary"
                        label={{
                          value: "Salary ($k)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                        domain={[0, 110]}
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
                {/* Summarizing the results and trends occuring from the 3 dataset comparison */}
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
          {/* Copyright box */}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
