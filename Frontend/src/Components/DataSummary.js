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
import PageTitle from "./PageTitle";
import useStyles from "./UseStyles.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import {
  FunnelChart,
  Funnel,
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
  "#00cc14",
  "#CCCC00",
  "#FF4D4D",
  "#9999ff",
  "#00CCCC",
  "#FF00FF",
  "#00e390",
  "#9d00ff",
  "#ff8800",
];

var salaryOverTimeData = [];
var ageDistributionData = [];
var degreeDistributionData = [];
var degreeSalaryData = [];
var genderSalaryData = [];
var industrySalaryData = [];
var raceSalaryData = [];
var workExpSalaryData = [];
var distPeopleData = [];
var topCountriesData = [];

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

  const [isLoadedSalOverTime, setIsLoadedSalOverTime] = React.useState(false);
  const [isLoadedDistAges, setIsLoadedDistAges] = React.useState(false);
  const [isLoadedDistDeg, setIsLoadedDistDeg] = React.useState(false);
  const [isLoadedSalByDeg, setIsLoadedSalByDeg] = React.useState(false);
  const [isLoadedSalByGen, setIsLoadedSalByGen] = React.useState(false);
  const [isLoadedSalByRace, setIsLoadedSalByRace] = React.useState(false);
  const [isLoadedSalOverExp, setIsLoadedSalOverExp] = React.useState(false);
  const [isLoadedSalInds, setIsLoadedSalInds] = React.useState(false);
  const [isLoadedDistPeople, setIsLoadedDistPeople] = React.useState(false);
  const [isLoadedCountries, setIsLoadedCountries] = React.useState(false);

  useEffect(() => {
    (async function getData() {
      var salaryOverTime = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/ages"
      );
      salaryOverTimeData = salaryOverTime.data;
      salaryOverTimeData.sort((a, b) => (a._id > b._id ? 1 : -1));
      salaryOverTimeData.unshift(salaryOverTimeData.pop());
      setIsLoadedSalOverTime(true);

      var ageDistribution = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/disAge"
      );
      ageDistributionData = ageDistribution.data;
      ageDistributionData.sort((a, b) => (a._id > b._id ? 1 : -1));
      ageDistributionData.unshift(ageDistributionData.pop());
      let temp1 = ageDistributionData.slice(0, 3);
      let temp2 = ageDistributionData.slice(3);
      temp1.push(temp1.shift());
      ageDistributionData = temp1.concat(temp2);
      for (let i = 0; i < ageDistributionData.length; i++) {
        ageDistributionData[i].fill = colors1[i];
      }
      setIsLoadedDistAges(true);

      var degreeDistribution = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/disDegrees"
      );
      degreeDistributionData = degreeDistribution.data;
      for (let i = 0; i < degreeDistributionData.length; i++) {
        if (degreeDistributionData[i]._id === "High School") {
          degreeDistributionData[i].compare = 0;
        }
        if (degreeDistributionData[i]._id === "Some college") {
          degreeDistributionData[i].compare = 1;
        }
        if (degreeDistributionData[i]._id === "College degree") {
          degreeDistributionData[i].compare = 2;
        }
        if (degreeDistributionData[i]._id === "Master's degree") {
          degreeDistributionData[i].compare = 3;
        }
        if (degreeDistributionData[i]._id === "PhD") {
          degreeDistributionData[i].compare = 4;
        }
        if (
          degreeDistributionData[i]._id === "Professional degree (MD, JD, etc.)"
        ) {
          degreeDistributionData[i].compare = 5;
        }
        if (degreeDistributionData[i]._id === "Other") {
          degreeDistributionData[i].compare = 6;
        }
      }
      degreeDistributionData.sort((a, b) => (a.compare > b.compare ? 1 : -1));
      for (let i = 0; i < degreeDistributionData.length; i++) {
        degreeDistributionData[i].fill = colors1[i];
      }
      setIsLoadedDistDeg(true);

      var degreeSalary = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/degrees"
      );
      degreeSalaryData = degreeSalary.data;
      for (let i = 0; i < degreeSalaryData.length; i++) {
        if (degreeSalaryData[i]._id === "High School") {
          degreeSalaryData[i].compare = 0;
        }
        if (degreeSalaryData[i]._id === "Some college") {
          degreeSalaryData[i].compare = 1;
        }
        if (degreeSalaryData[i]._id === "College degree") {
          degreeSalaryData[i].compare = 2;
        }
        if (degreeSalaryData[i]._id === "Master's degree") {
          degreeSalaryData[i].compare = 3;
        }
        if (degreeSalaryData[i]._id === "PhD") {
          degreeSalaryData[i].compare = 4;
        }
        if (degreeSalaryData[i]._id === "Professional degree (MD, JD, etc.)") {
          degreeSalaryData[i].compare = 5;
        }
        if (degreeSalaryData[i]._id === "Other") {
          degreeSalaryData[i].compare = 6;
        }
      }
      degreeSalaryData.sort((a, b) => (a.compare > b.compare ? 1 : -1));
      for (let i = 0; i < degreeSalaryData.length; i++) {
        degreeSalaryData[i].fill = colors1[i];
      }
      setIsLoadedSalByDeg(true);

      var genderSalary = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/gender"
      );
      genderSalaryData = genderSalary.data;
      genderSalaryData.sort((a, b) => (a._id > b._id ? 1 : -1));
      for (let i = 0; i < genderSalaryData.length; i++) {
        genderSalaryData[i].fill = colors1[i];
      }
      genderSalaryData.forEach((ind) => {
        ind.val = (parseInt(ind.val) / 26336) * 100;
        ind.val = ind.val.toFixed(2);
        ind.val = ind.val + " %";
      });
      setIsLoadedSalByGen(true);

      var industrySalary = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/salaries"
      );
      industrySalaryData = industrySalary.data;
      industrySalaryData.sort((a, b) =>
        parseFloat(a.salary) < parseFloat(b.salary) ? 1 : -1
      );
      setIsLoadedSalInds(true);

      var raceSalary = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/race"
      );
      raceSalaryData = raceSalary.data;
      raceSalaryData.sort((a, b) => (a._id > b._id ? 1 : -1));
      for (let i = 0; i < raceSalaryData.length; i++) {
        raceSalaryData[i].fill = colors1[i];
      }
      raceSalaryData.forEach((ind) => {
        ind.val = (parseInt(ind.val) / 26336) * 100;
        ind.val = ind.val.toFixed(2);
        ind.val = ind.val + " %";
      });
      setIsLoadedSalByRace(true);

      var workExpSalary = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/work"
      );
      workExpSalaryData = workExpSalary.data;
      for (let i = 0; i < workExpSalaryData.length; i++) {
        if (workExpSalaryData[i]._id === "0 - 1 years") {
          workExpSalaryData[i]._id = "0-1";
          workExpSalaryData[i].compare = 0;
        }
        if (workExpSalaryData[i]._id === "2 - 4 years") {
          workExpSalaryData[i]._id = "2-4";
          workExpSalaryData[i].compare = 1;
        }
        if (workExpSalaryData[i]._id === "5 - 7 years") {
          workExpSalaryData[i]._id = "5-7";
          workExpSalaryData[i].compare = 2;
        }
        if (workExpSalaryData[i]._id === "8 - 10 years") {
          workExpSalaryData[i]._id = "8-10";
          workExpSalaryData[i].compare = 3;
        }
        if (workExpSalaryData[i]._id === "11 - 20 years") {
          workExpSalaryData[i]._id = "11-20";
          workExpSalaryData[i].compare = 4;
        }
        if (workExpSalaryData[i]._id === "21 - 30 years") {
          workExpSalaryData[i]._id = "21-30";
          workExpSalaryData[i].compare = 5;
        }
        if (workExpSalaryData[i]._id === "31 - 40 years") {
          workExpSalaryData[i]._id = "31-40";
          workExpSalaryData[i].compare = 6;
        }
        if (workExpSalaryData[i]._id === "41 years or more") {
          workExpSalaryData[i]._id = "40+";
          workExpSalaryData[i].compare = 7;
        }
      }
      workExpSalaryData.sort((a, b) => (a.compare > b.compare ? 1 : -1));
      setIsLoadedSalOverExp(true);

      var distPeople = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/numALL"
      );
      distPeopleData = distPeople.data;
      for (let i = 0; i < distPeopleData.length; i++) {
        distPeopleData[i].per =
          (distPeopleData[i].other / distPeopleData[i].all) * 100;
      }
      setIsLoadedDistPeople(true);

      var topCountries = await axios.get(
        "https://salary-data-api.herokuapp.com/salary_data/topCountries"
      );
      topCountriesData = topCountries.data;
      for (let i = 0; i < topCountriesData.length; i++) {
        topCountriesData[i].fill = colors1[i];
      }
      setIsLoadedCountries(true);
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
                  <h2>Average Annual Salary by Age</h2>
                </center>
                {!isLoadedSalOverTime ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <LineChart
                      width={620}
                      height={280}
                      data={salaryOverTimeData}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="_id" padding={{ left: 20, right: 20 }}>
                        <Label
                          value="Age"
                          offset={-2}
                          position="insideBottom"
                        />
                      </XAxis>
                      <Tooltip />
                      <YAxis
                        label={{
                          value: "Salary ($k)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                        domain={[0, 120]}
                      />
                      <Line
                        type="monotone"
                        dataKey="salary"
                        stroke={colors[0]}
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
                {!isLoadedDistAges ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <PieChart
                      width={290}
                      height={280}
                      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                    >
                      <Pie
                        data={ageDistributionData}
                        dataKey="val"
                        nameKey="_id"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                      />
                      <Legend iconSize={10} iconType={"diamond"} />
                      <Tooltip />
                    </PieChart>
                  </center>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h3>At What Age Do People Earn Most?</h3>
                </center>
                <p>
                  Our analysis of the 2021 dataset shows a positive correlation
                  between annual salary and age, but only until late middle age;
                  Salaries peak for respondents between 45 and 54, before dipping
                  again in later life. Interestingly, however, respondents who
                  are between 18 and 24 earn significantly less than people who
                  are below 18. As expected, the biggest increase in annual
                  salary is from the 18-24 to the 25-34 age group, perhaps due
                  to the completion of a college degree or graduate degree.
                </p>
                <p>
                  It is worth noting that most of the respondents to this survey
                  are young professionals aged 25 to 44. Only 10 respondents are
                  below 18 and only 88 are over 65, so their average annual
                  salaries are by no means representative of the greater population
                  in their respective age groups. The dearth of respondents in
                  the under-18 age group could explain why this group???s average
                  annual salary is greater than that of the 18-24 age group. We
                  also speculate that some of the respondents in the 18-24 age
                  range are undergraduates in college, so they might be working
                  lower-paid part-time jobs in addition to being full-time students.
                </p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={8}>
              <Paper className={classes.paper}>
                <center>
                  <h2>Average Annual Salary By Degree</h2>
                </center>
                {!isLoadedSalByDeg ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <BarChart width={600} height={320} data={degreeSalaryData}>
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
                  </center>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={4}>
              <Paper className={classes.paper}>
                <center>
                  <h2>Distribution of Degrees</h2>
                </center>
                {!isLoadedDistDeg ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <PieChart
                      width={290}
                      height={320}
                      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                    >
                      <Pie
                        data={degreeDistributionData}
                        dataKey="val"
                        nameKey="_id"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                      />
                      <Legend iconSize={10} />
                      <Tooltip />
                    </PieChart>
                  </center>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h3>Is a Master's or PhD Really Worth It?</h3>
                </center>
                <p>
                  Ignoring the 1,887 respondents who did not specify their
                  highest level of education, we see that individuals who
                  hold more advanced academic degrees tend to earn more.
                  Surprisingly, people with some college actually earn
                  less than people with only high school degrees. Finishing
                  a bachelor's degree appears crucial, as it correlates
                  with salaries almost $10K higher than those of high
                  school graduates.
                </p>
                <p>
                  Respondents with master's degrees slightly edge out bachelor's
                  degree holders, but the jump in numbers is not very significant.
                  However, PhD holders earn 8k more per year on average than
                  master's degree holders. It would seem that if you are truly
                  interested in studying, innovating, and researching new frontiers
                  of your area of choice, the paycheck could be worth the time
                  investment.
                </p>
                <p>
                  Perhaps surprisingly, people who have completed a professional
                  degree(MD, JD,etc.) earn significantly more than any other
                  category, even edging out PhD holders by 34k per year.
                  (Maybe you should consider becoming a doctor or lawyer after all!)
                  Obviously, degrees don't tell the whole story and it is always
                  important to carefully consider one???s personal goals before
                  deciding which educational path to pursue.
                </p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={6}>
              <Paper className={classes.textbox}>
                <center>
                  <h2>Average Income by Gender</h2>
                </center>
                {!isLoadedSalByGen ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <BarChart width={440} height={300} data={genderSalaryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="_id"
                        label={{
                          value: "Gender",
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
                        domain={[40, 140]}
                      />
                      <Bar dataKey="salary">
                        <LabelList
                          dataKey="_id"
                          angle={270}
                          position="center"
                          fontSize={14}
                          fill={"#000000"}
                        />
                        <LabelList
                          dataKey="val"
                          angle={0}
                          position="top"
                          fontSize={14}
                          fill={"#000000"}
                        />
                      </Bar>
                      <Tooltip cursor={false} />
                    </BarChart>
                  </center>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={6}>
              <Paper className={classes.textbox}>
                <center>
                  <h3>Gender Income Gap is a Grand Canyon</h3>
                </center>
                <p>
                  Our analysis of the 2021 dataset shows a significant pay gap
                  between male respondents and those of other genders. With an
                  average annual salary of 130k, men who responded to the 2021
                  survey earn an average of $40k more than women, and $50K more
                  than those who identify as non-binary . Besides men, women,
                  and non-binary people, those who chose "Other or prefer not to
                  answer" have an average annual salary around 103k???pretty high
                  compared to women's pay, but still significantly less than the
                  men's average of 130k.
                </p>
                <p>
                  Of course, Ask A Manager's data is not a perfect representation
                  of gender income discrepancy, since respondents were
                  self-selecting. It is worth noting that the survey received far
                  more responses from women than from men. In the population as a
                  whole, the gender pay gap could be much smaller or larger.

                </p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={5}>
              <Paper className={classes.bigTextbox}>
                <center>
                  <h3>Significant Disparities Exist Between Races</h3>
                </center>
                <p>
                  For survey respondents, the income discrepancy among different
                  races is smaller than the gender pay gap. Asian or Asian
                  Americans top the charts with an average annual salary of 114k,
                  followed by Middle Eastern or North Africans (110k). Native
                  Americans or Alaska Natives are at the middle of the pack,
                  earning an average annual salary of 98k. At 97k, Black or
                  African Americans are right behind them. Strikingly, white
                  people are at the lower end with only 96k per year, contrary
                  to most people's expectations. People of Hispanic, Latino, or
                  Spanish origin earn the lowest at only 91k per year. Those
                  who selected ???other??? or chose not to answer average around
                  110k per year.
                </p>
                <p>
                  It is worth noting that a portion of respondents have multiple
                  racial identities, and each selected race was counted in its
                  respective averages. Overall, respondents of the survey are
                  predominantly white, which could skew the data.
                </p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={7}>
              <Paper className={classes.bigTextbox}>
                <center>
                  <h2>Average Income by Race</h2>
                </center>
                {!isLoadedSalByRace ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <BarChart width={650} height={350} data={raceSalaryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="_id"
                        label={{
                          value: "Race",
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
                        domain={[60, 120]}
                      />
                      <Bar dataKey="salary" fill={"#00ff00"}>
                        <LabelList
                          dataKey="_id"
                          angle={270}
                          position="center"
                          fontSize={12}
                          fill={"#000000"}
                        />
                        <LabelList
                          dataKey="val"
                          angle={0}
                          position="top"
                          fontSize={14}
                          fill={"#000000"}
                        />
                      </Bar>
                      <Tooltip cursor={false} />
                    </BarChart>
                  </center>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={7}>
              <Paper className={classes.textbox}>
                <center>
                  <h2>Average Annual Salary by Work experience</h2>
                </center>
                {!isLoadedSalOverExp ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <LineChart
                      width={530}
                      height={280}
                      data={workExpSalaryData}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="_id" padding={{ left: 20, right: 20 }}>
                        <Label
                          value="Work Experience (Years)"
                          offset={-2}
                          position="insideBottom"
                        />
                      </XAxis>
                      <Tooltip />
                      <YAxis
                        label={{
                          value: "Salary ($k)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                        domain={[30, 130]}
                      />
                      <Line
                        type="monotone"
                        dataKey="salary"
                        stroke={colors[2]}
                        activeDot={{ r: 8 }}
                        label={{ value: "salary", position: "top" }}
                      />
                    </LineChart>
                  </center>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={5}>
              <Paper className={classes.textbox}>
                <center>
                  <h3>Work Experience Matters</h3>
                </center>
                <p>
                  Among respondents, average annual salary increases with
                  experience until 21-30 years of work experience, and begins
                  to decrease afterwards. If this pattern holds over time,
                  one could start at an annual salary of 70K and reach 115k
                  after working 21-30 years. For obvious reasons, this trend
                  matches the correlation of annual salary with age. (For most
                  people, getting older means gaining work experience.) Among
                  respondents with more than 30 years of work experience,
                  however, average income is lower. One explanation could be
                  that older (and more experienced) respondents tend to work
                  in lower-earning industries. For example, the Computing and
                  Tech industry is dominated by young people while offering
                  some of the highest average salaries.
                </p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h2>Average Annual Salary Across Industries</h2>
                </center>
                {!isLoadedSalInds ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <BarChart
                      width={2100}
                      height={370}
                      data={industrySalaryData}
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

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h3>How Lucrative is Your Industry in the Job Market?</h3>
                </center>
                <p>
                  Data from 2021 survey results illustrate huge gaps and
                  dramatic differences among the various industries. With
                  an average annual salary of 146k, energy is the most
                  lucrative industry in the 2021 survey results. Energy,
                  computing or tech, and law or law enforcement are the
                  three highest earning industries in 2021, all averaging
                  above 120k per year. Business or consulting, entertainment,
                  accounting, banking, and finance, aerospace, and sales
                  trail behind, still earning more than 100k per year on
                  average. Other seemingly quite lucrative professions such
                  as health care, insurance, marketing & advertising & PR,
                  media and digital, and government and public administration
                  fell short and dropped below the 100k line. Education,
                  food, art and design, and retail fall on the lower end of
                  the spectrum as they only earn around 70k per year. Perhaps
                  surprisingly, utilities and telecommunications, agriculture
                  and forestry, and auto repair are above average, all with
                  average salaries higher than 87k per year. Publishing,
                  social work, and library are the three lowest earning
                  industries in the 2021 survey. Library averages only 56k
                  per year. Note that these values in the bar chart are all
                  averages among respondents, so there definitely are many
                  outliers in each industry, pulling up or dragging down the
                  mean. Values in this graph should only be a general reference
                  for users since they are not completely accurate
                  representations of real-world salary levels.
                </p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h2>Distribution of People in the Job Market</h2>
                </center>
                {!isLoadedDistPeople ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <RadarChart
                      innerRadius={90}
                      outerRadius={300}
                      width={950}
                      height={670}
                      data={distPeopleData}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" fontSize={12} />
                      <PolarRadiusAxis angle={30} domain={[0, 4500]} />
                      <Radar
                        name="People"
                        dataKey="all"
                        stroke={"#8000ff"}
                        fillOpacity={0.1}
                      >
                        <LabelList
                          dataKey="all"
                          position="outside"
                          angle={0}
                          offset={90}
                        />
                      </Radar>
                      <Radar
                        name="Men"
                        dataKey="man"
                        stroke={"#0000FF"}
                        fill={"#ffffff"}
                        fillOpacity={0.1}
                      ></Radar>
                      <Radar
                        name="Women"
                        dataKey="woman"
                        stroke={"#FF0000"}
                        fill={"#ffffff"}
                        fillOpacity={0.1}
                      ></Radar>
                      <Radar
                        name="Non-Binary"
                        dataKey="non_binary"
                        stroke={"#00cc00"}
                        fill={"#ffffff"}
                        fillOpacity={0.1}
                      ></Radar>
                      <Radar
                        name="Other"
                        dataKey="other"
                        stroke={"#cccc00"}
                        fill={"#ffffff"}
                        fillOpacity={0.1}
                      ></Radar>
                      <Legend iconSize={12} iconType={"circle"} />
                      <Tooltip />
                    </RadarChart>
                  </center>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h3>Is Computing or Tech the Future of the Job Market?</h3>
                </center>
                <p>
                  Out of all the industries we have identified in the survey,
                  computing or tech is by far the most popular. Education,
                  nonprofits, health care, government and public administration,
                  and accounting banking & finance are also very popular
                  industries right behind computing. Highly specialized areas
                  such as aerospace, auto repair, energy, and environment are
                  the least popular industries, despite some of them appearing
                  to be extremely lucrative.
                </p>
                <p>
                  Since respondents were disproportionately female, every
                  industry has more women than men. As seen in the salary
                  difference by gender graph, more than 77% of the respondents
                  are women. Some industries have a much higher percentage of
                  men and much lower percentage of women. For computing or tech,
                  although it is by far the most popular job area, the gap
                  between men and women is least wide with women accounting
                  for just 54% of respondents. Energy, auto repair, entertainment,
                  and food are some of the other very popular industries among
                  men, and the percentages of women drop below 70% in these
                  areas. On the other end of the spectrum, we see that almost 92%
                  of those who work in the social work industry are women, along
                  with 90% of respondents in recruitment or HR. Shockingly, a
                  significant majority of those who work in aerospace are women,
                  but this could be skewed by a very small sample size. Other
                  industries such as health care, education, library, and nonprofits
                  also have a higher presence of women than men. The food industry
                  has the highest percentage of non-binary people (13%), followed
                  by argriculture or forestry and library. Additionally, the food
                  industry is also the most popular industry (3.77%) for those who
                  entered "other or prefer not to answer" as their gender. Other
                  popular industries for those who identify as non-binary or did
                  not answer are agriculture or forestry, entertainment, and retail.
                </p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h2>Top 10 Countries</h2>
                </center>
                {!isLoadedCountries ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <FunnelChart width={1070} height={230}>
                      <Funnel
                        data={topCountriesData}
                        dataKey="val"
                        nameKey="_id"
                      >
                        <LabelList
                          position="left"
                          dataKey="_id"
                          stroke="#000000"
                          fontSize={14}
                        />
                        <LabelList
                          position="right"
                          dataKey="val"
                          stroke="#000000"
                          fontSize={14}
                        />
                      </Funnel>
                      <Tooltip />
                    </FunnelChart>
                  </center>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h3>A Very USA-Centered Survey</h3>
                </center>
                <p>
                  As shown by all the previous graphs, the majority of
                  respondents in this dataset are young, white, female
                  professionals. In addition, as illustrated by the funnel
                  chart, over 85% of respondents are from the United States.
                  Other top countries are Canada, Australia, Germany, England,
                  Ireland, New Zealand, The Netherlands, France, and Scotland.
                  Smaller entries from other countries simply could not
                  contribute much, so it would not make much sense to conduct
                  data analysis on average annual salary by country.
                </p>
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
