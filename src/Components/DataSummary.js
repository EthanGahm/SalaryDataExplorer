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
                  <h2>Average Annual Salary over Time</h2>
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
                  <h3>Annual Salary Peaks in Late Forties and Early Fifties</h3>
                </center>
                <p>
                  Our analysis of the 2021 dataset shows a positive correlation between
                  annual salary and age; as age increases, so too does annual salary
                  until middle age. Salaries seem to peak between 45 and 54, before
                  dipping again in later life.
                  Interestingly, people who are between 18 and 24 earn
                  significantly less than people who are below 18.
                  As expected, the biggest increase in annual salary is from the 18-24 to the
                  25-34 age group, perhaps due to the completion of a college
                  degree or graduate degree. It is also worth noting that most
                  of the respondents of this survey are young professionals aged
                  25 to 44. Only 10 people are below 18 and 88 people are over
                  65, so their average annual salary are by no means
                  representative of the greater population in their respective
                  age groups. The lack of respondents in the under 18 age group
                  could explain why its average annual salary is greater than
                  that of the 18-24 age group. The 2021 survey is by no means
                  perfect, and the uneven distribution of of age groups among
                  the respondents contributes directly to this flaw.
                  Speculations could also be made that some of the respondents
                  in the 18-24 age range were undergraduates in college, so they
                  might be working part-time jobs in addition to being
                  full-time students. Overall, the trend of annual salary
                  generally increases with age and work experience despite a
                  drop among college-aged people and older people.
                </p>
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

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h3>Is a Master's or PhD Really Worth It?</h3>
                </center>
                <p>
                  Ignoring the 1,887 respondents who did not specify their highest
                  level of education, it appears generally true that individuals who hold more
                  advanced academic degrees tend to earn more. Surprisingly people with some
                  college actually earn less than people with only high school
                  degrees. Finishing a bachelor's degree is crucial as it
                  provides an almost 10k salary increase from a high school
                  level education. People with a master's degree slightly edge
                  out bachelor's degree holders, but the jump in numbers is not
                  very significant. PhD holders earn 8k more per year on
                  average than master's degree holders, so if you are truly
                  interested in studying, innovating, and researching new
                  frontiers of your area of choice, the paycheck could be worth
                  the time investment. Most universities offer stipends for most
                  of their PhD graduate students, and some master's students
                  occasionally recieve aid as well. Surprisingly, people who
                  have completed a professional degree(MD, JD,etc.) earn
                  significanly more than any other catagory, even edging out PhD
                  holders by 34k per year! Maybe you should consider becoming
                  a doctor or lawyer after all. Obviouly, degrees don't tell
                  the whole story and one should carefully consider his/her personal
                  goals before deciding which educational path to pursue.
                </p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={6}>
              <Paper className={classes.textbox}>
                <center>
                  <h2>Salary Difference by Gender</h2>
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
                  Our analysis of the 2021 dataset shows a significant pay gap between men
                  and other genders. With an average annual
                  salary of 130k, men who responded to the 2021 survey earn an average of
                  $40k more than women. Although earning dramatically lower salaries
                  than men, women earn roughly $10k/yr more than those who identify as
                  non-binary. Women on average earn around 90k per year,
                  which is substantially lower than men's average income, but
                  the difference between men's pay and non-binary people's pay
                  is even more daunting. Besides men, women, and non-binary
                  people, those who chose "Other or prefer not to answer" have
                  an average annual salary around 103k, which is pretty high
                  compared to women's pay, but it is still significantly less
                  than the men's average of 130k. Ask A Manager's data is not a
                  perfect representation of gender income discrepency due to the
                  nature of the survey. It is worth noting that the survey recieved
                  far more responses from women than from men. In reality, the gender pay gap could be
                  much smaller or larger.
                </p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={5}>
              <Paper className={classes.bigTextbox}>
                <center>
                  <h3>Asian Americans Top the Charts</h3>
                </center>
                <p>
                  The income discrepency among different races appears smaller
                  than the gender pay gap. Asian or Asian Americans top
                  the charts with an average annual salary of 114k followed by
                  Middle Eastern or North Africans (110k). Native Americans or
                  Alaska Natives are at the middle of the pack, earning an
                  average annual salary of 98k. At 97k, Black or African
                  Americans are right behind them. Strikingly, white people are
                  at the lower end with only 96k per year, contraracy to most
                  people's expectations. respondents of the survey are
                  predominantly white, which could result in this trough. People
                  of Hispanic, Latino, or Spanish origin earn the lowest at only
                  91k per year. Those who selected other or chose not to answer
                  average around 110k per year. It is also worth noting that a
                  portion of respondents have multiple racial identities, and
                  each selected race was counted in its respective averages.
                </p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={7}>
              <Paper className={classes.bigTextbox}>
                <center>
                  <h2>Salary Difference by Race</h2>
                </center>
                {!isLoadedSalByRace ? (
                  <center>
                    <CircularProgress />
                  </center>
                ) : (
                  <center>
                    <BarChart width={530} height={350} data={raceSalaryData}>
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
                  The average annual salary increases until 21-30 years
                  of work experience, and begins to decrease afterwards.
                  Starting at 70k, one could reach 115k per year after working 21-30
                  years. The trend basically goes hand in hand
                  with the first graph illustrating the growth of annual salary
                  over time. As a person grows older and gains more experience
                  working, it makes sense that his/her salary increases along
                  the way. Say a person first starts working at 20, and after
                  21-30 years that person is 41-50, which is among the highest
                  earning age groups as well. There is a drop in income after 30
                  years of work experience, and perhaps this could be due to old
                  age or structual reasons for not being able to adjust and
                  learn new technology needed for the job. Another explanation
                  could be that older (and more experienced) respondents tend to
                  work in lower-earning industries. For example, the Computing
                  and Tech industry is dominated by young people while offering
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
                      width={1500}
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
                  dramatic differences among the various industries. With an
                  average annual salary of 146k, energy is the most lucrative
                  industry in the 2021 survey results.
                  Energy, computing or tech, and law or law enforcement are the
                  three highest earning industries in 2021, all averaging above
                  120k per year. Business or consulting, entertainment,
                  accounting, banking, and finance, aerospace, and sales trail
                  behind, still earning more than 100k per year on average.
                  Other seemingly quite lucrative professions such as health
                  care, insurence, marketing & advertising & PR, media and
                  digital, and government and public administration fell short
                  and drop below the 100k line. Education, food, art and design,
                  and retail fall on the lower end of the spectrum as they
                  only earn around 70k per year. Perhaps surprisingly,
                  utilities and telecommunications, argriculture and forestry,
                  and auto repair are above average, all with average salaires higher
                  than 87k per year.
                  Publishing, social work, and library are the three lowest
                  earning industries in the 2021 survey. Library averages only
                  56k per year. Note that these values in the bar chart are
                  all averages among respondents, so there definitly are many
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
                  industries right behind computing. Law and law enforcement,
                  marketing advertising & PR, business or consulting and meida &
                  digital are less popular than the previous industries, but
                  they still have a substantial work force. Highly specialized
                  areas such as aerospace, auto repair, energy, and environment
                  are the least popular industries, despite some of them being
                  extremely lucrative. Since there are way more women than men
                  respondants in this survey, every industry has more women than
                  men. As seen in the salary difference by gender graph,
                  more than 77% of the respondants are women. For each industry,
                  they should comprise of roughly 77% correspondingly. However,
                  some industries have a much higher percentenage of men and
                  much lower percentage of women. For computing or tech,
                  although it is by far the most popluar job area, the gap
                  between men and women is least wide. Despite being one of the
                  most luractive industries, women only account for 54% of the
                  computing or tech population. Despite being very popular and
                  lucrative, computing or tech is still a very male-dominated
                  industry. Energy, auto repair, entertainment, and food are
                  some of the other very popular industries among men, and the
                  percentages of women drop below 70% in these areas. On the
                  other hand, some industries are overwhelmingly favored by
                  women. Almost 92% of those who work in the social work
                  industry are women, and women comprise of 90% of the
                  popluation in recruitment or HR. Shockingly, 92% of those who
                  work in aerospace are women, but this could be scewed by a very small
                  sample size since only 12 people work in this industry in the
                  survey. Other industries such as health care, education,
                  library, and nonprofits also have a higher presence of women
                  than men. The food industry has the highest percentage of
                  non-binary people (13%), followed by argriculture or forestry
                  and library, both over 7%. Additionally, food is also the most
                  popular industry (3.77%) for those who entered "other or
                  prefer not to answer" as their gender. Other popular
                  industries for those who identify as other or did not answer
                  are agriculture or forestry, entertainment, and retail. Data
                  analysis on all graphs on this page are not meant to be
                  accruate and comprehensive due to the imperfect nature of the
                  survey and low sample size for some of the industries.
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
                  As shown by all the previous graphs, the majority of respondants
                  in this dataset are young, white, female professionals. These
                  areas are nothing compared to the lopsidedness of the
                  countries entered in the 2021 survey. Illustrated by the
                  funnel chart, over 85% of respondants are from the
                  United States. Other top countries are Canada, Australia,
                  Germany, England, Ireland, New Zealand, The Netherlands,
                  France, and Scotland, making the data set very much
                  western-centered. Smaller entries from other countries simply
                  could not contribute much, so it would not make much sense to
                  conduct data analysis on average annual salary by country.
                  Although there are many flaws and imperfections, this survey
                  could provide a basic guide and reference for professionals in
                  the job market.
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
