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
// import Title from "./Title";
import PageTitle from "./PageTitle";
import useStyles from "./UseStyles.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import {
  RadialBarChart,
  RadialBar,
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
// import { sum } from "d3";

const colors = ["#0088FE", "#82ca9d", "#FFBB28"];
const colors1 = ['#ABCDEF', '#00cc14', '#CCCC00', '#FF4D4D', '#9999ff', '#00CCCC', '#FF00FF', 
'#00e390', '#9d00ff', '#ff8800'];
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
        if (data3[i]._id === 'High School') {
          data3[i].compare = 0;
        }
        if (data3[i]._id === 'Some college') {
          data3[i].compare = 1;
        }
        if (data3[i]._id === 'College degree') {
          data3[i].compare = 2;
        }
        if (data3[i]._id === 'Master\'s degree') {
          data3[i].compare = 3;
        }
        if (data3[i]._id === 'PhD') {
          data3[i].compare = 4;
        }
        if (data3[i]._id === 'Professional degree (MD, JD, etc.)') {
          data3[i].compare = 5;
        }
        if (data3[i]._id === 'Other') {
          data3[i].compare = 6;
        }
      }
      data3.sort((a, b) => (a.compare > b.compare) ? 1 : -1);
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
    
      var response5 = await axios.get('https://salary-data-api.herokuapp.com/salary_data/gender');
      data5 = response5.data;
      data5.sort((a, b) => (a._id > b._id) ? 1 : -1);
      for (let i = 0; i < data5.length; i++) {
        data5[i].fill = colors1[i];
      }
      data5.forEach(ind => {
        ind.val = parseInt(ind.val) / 26336 * 100;
        ind.val = ind.val.toFixed(2);
        ind.val = ind.val + " %";
      });

      var response6 = await axios.get('https://salary-data-api.herokuapp.com/salary_data/salaries');
      data6 = response6.data;
      data6.sort((a, b) => (parseFloat(a.salary) < parseFloat(b.salary)) ? 1 : -1);

      var response7 = await axios.get('https://salary-data-api.herokuapp.com/salary_data/race');
      data7 = response7.data;
      data7.sort((a, b) => (a._id > b._id) ? 1 : -1);
      for (let i = 0; i < data7.length; i++) {
        data7[i].fill = colors1[i];
      }
      data7.forEach(ind => {
        ind.val = parseInt(ind.val) / 26336 * 100;
        ind.val = ind.val.toFixed(2);
        ind.val = ind.val + " %";
      });

      var response8 = await axios.get('https://salary-data-api.herokuapp.com/salary_data/work');
      data8 = response8.data;
      for (let i = 0; i < data8.length; i++) {
        if (data8[i]._id === '0 - 1 years') {
          data8[i]._id = '0-1';
          data8[i].compare = 0;
        }
        if (data8[i]._id === '2 - 4 years') {
          data8[i]._id = '2-4';
          data8[i].compare = 1;
        }
        if (data8[i]._id === '5 - 7 years') {
          data8[i]._id = '5-7';
          data8[i].compare = 2;
        }
        if (data8[i]._id === '8 - 10 years') {
          data8[i]._id = '8-10';
          data8[i].compare = 3;
        }
        if (data8[i]._id === '11 - 20 years') {
          data8[i]._id = '11-20';
          data8[i].compare = 4;
        }
        if (data8[i]._id === '21 - 30 years') {
          data8[i]._id = '21-30';
          data8[i].compare = 5;
        }
        if (data8[i]._id === '31 - 40 years') {
          data8[i]._id = '31-40';
          data8[i].compare = 6;
        }
        if (data8[i]._id === '41 years or more') {
          data8[i]._id = '40+';
          data8[i].compare = 7;
        }
      }
      data8.sort((a, b) => (a.compare > b.compare) ? 1 : -1);

      var response9 = await axios.get('https://salary-data-api.herokuapp.com/salary_data/numALL');
      data9 = response9.data;
      for (let i = 0; i < data9.length; i++) {
        data9[i].per = data9[i].other / data9[i].all * 100;
      }
      console.log(data9);

      var response10 = await axios.get('https://salary-data-api.herokuapp.com/salary_data/topCountries');
      data10 = response10.data;
      for (let i = 0; i < data10.length; i++) {
        data10[i].fill = colors1[i];
      }

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
                  <center><CircularProgress /></center>
                ) : (
                  <center><LineChart 
                    width={620} 
                    height={280} 
                    data={data1}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" padding={{ left: 20, right: 20 }}>
                      <Label value = "Age" offset={-2} position="insideBottom" />
                    </XAxis>
                    <Tooltip />
                    <YAxis label = {{value: "Salary ($k)", angle: -90, position: "insideLeft"}} 
                    domain = {[0, 120]}/>
                    <Line 
                      type="monotone" 
                      dataKey="salary" 
                      stroke = {colors[0]}
                      activeDot = {{r: 8}}
                      label = {{value: 'salary', position: "top"}}/>
                  </LineChart></center>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={4}>
              <Paper className={classes.paper}>
                <center>
                  <h2>Distribution of Age Groups</h2>
                </center>
                {!isLoaded ? (
                  <center><CircularProgress /></center>
                ) : (
                  <center>
                    <PieChart 
                      width={290} 
                      height={280} 
                      margin = {{ top: 5, right: 0, left: 0, bottom: 5}}
                    >
                      <Pie 
                        data = {data2} 
                        dataKey = "val" 
                        nameKey = "_id"
                        cx = "50%" 
                        cy = "50%" 
                        outerRadius = {90} 
                        label />
                      <Legend iconSize = {10} iconType = {'diamond'} />
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
                  the respondants contributes directly to this flaw. Speculations 
                  could also be made that some of the respondants in the 18-24 age 
                  range were undergraduates in college, so they might be working 
                  part-times jobs in addition to being full-time students. Overall, 
                  the  trend of annual salary generally increases with age and work 
                  experience despite a drop among college-aged people and older 
                  people.
                </p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={4}>
              <Paper className={classes.paper}>
                <center>
                  <h2>Distribution of Degrees</h2>
                </center>
                {!isLoaded ? (
                  <center><CircularProgress /></center>
                ) : (
                  <center>
                    <PieChart
                      width={290}
                      height={320}
                      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                    >
                      <Pie 
                        data = {data3} 
                        dataKey = "val" 
                        nameKey = '_id' 
                        cx = "50%" 
                        cy = "50%" 
                        outerRadius = {90} 
                        label />
                      <Legend iconSize = {10}/>
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
                  <center><CircularProgress /></center>
                ) : (
                <center><BarChart width = {600} height = {320} data = {data4}>
                  <CartesianGrid strokeDasharray = "3 3"/>
                  <XAxis dataKey = "_id" 
                    label = {{value: "Highest Level of Education", position: "insideBottom", offset: -2}}/>
                  <YAxis 
                    label = {{value: "Salary ($k)", angle: -90, position: "insideLeft"}} 
                    domain = {[30, 150]} />
                  <Bar dataKey = "salary">
                    <LabelList 
                      dataKey = "_id" 
                      angle = {270} 
                      position = "center" 
                      fontSize = {14} 
                      fill = '#000000' />
                  </Bar>
                  <Tooltip cursor = {false}/>
                </BarChart></center>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h3>Is a Master's or PhD Really Worth It?</h3>
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
                  become a doctor or lawyer after all. This dataset is by no means 
                  indicative of the worth of degrees, and people's salary are based 
                  on many more factors such as race, gender, age, experience in 
                  certain areas, professional skills, etc. One should carefully 
                  consider his/her personal goals before deciding which degree 
                  to pursue.
                </p>
              </Paper>
            </Grid>

            <Grid item xs = {12} md = {8} lg = {6}>
              <Paper className = {classes.textbox}>
                <center><h2>Salary Difference by Gender</h2></center>
                {!isLoaded ? (
                  <center><CircularProgress /></center>
                ) : (
                  <center><BarChart width = {440} height = {300} data = {data5}>
                    <CartesianGrid strokeDasharray = "3 3"/>
                    <XAxis 
                      dataKey = "_id" 
                      label = {{value: "Gender", position: "insideBottom", offset: -2}}/>
                    <YAxis 
                      label = {{value: "Salary ($k)", angle: -90, position: "insideLeft"}} 
                      domain = {[40, 140]} />
                    <Bar dataKey = "salary">
                      <LabelList 
                        dataKey = "_id" 
                        angle = {270} 
                        position = "center" 
                        fontSize = {14} 
                        fill = {'#000000'}
                      />
                      <LabelList 
                        dataKey = "val"
                        angle = {0} 
                        position = "top" 
                        fontSize = {14} 
                        fill = {'#000000'}
                      />
                    </Bar>
                    <Tooltip cursor = {false}/>
                  </BarChart></center>
                )}
              </Paper>
            </Grid>

            <Grid item xs = {12} md = {8} lg = {6}>
              <Paper className = {classes.textbox}>
                <center><h3>Gender Income Gap is a Grand Canyon</h3></center>
                <p>Based on the bar chart to the left, the pay gap between men and other 
                  genders is quite significant. With an average annual salary at 
                  130k, men earn a whopping 40k more than their women counterparts. 
                  Although earning dramatically lower salaries than men, women 
                  still earn more than 10k per year than non-binary people. Women 
                  on average earn around 90k per year, which is substantially lower 
                  than men's average income, but the difference between men's pay 
                  and non-binary people's pay is even more daunting. Besides men, 
                  women, and non-binary people, those who chose "Other or prefer 
                  not to answer" has an average annual salary around 103k, which 
                  is pretty high compared to women's pay, but it is still 
                  significantly less than the men's average of 130k. Ask A Manager's 
                  data is not a perfect representation of gender income discrepency 
                  due to the nature of the survey. In reality, the gender pay gap 
                  could be much smaller or bigger.</p>
              </Paper>
            </Grid>

            <Grid item xs = {12} md = {8} lg = {5}>
              <Paper className = {classes.bigTextbox}>
                <center><h3>Asian Americans Top the Charts</h3></center>
                <p>Surprisingly, the income discrepency among different races is 
                  not as big as the gender pay gap. Asian or Asian Americans top 
                  the charts with an average annual salary of 114k followed by 
                  Middle Eastern or North Africans (110k). Native Americans or 
                  Alaska Natives are at the middle of the pack, earning an average 
                  annual salary of 98k. At 97k, Black or African Americans are 
                  right behind them. Strikingly, white people are at the lower 
                  end with only 96k per year, contraracy to most people's 
                  expectations. Respondants of the survey are predominantly white, 
                  which could result in this trough. People of Hispanic, Latino, 
                  or Spanish origin earn the lowest at only 91k per year. Those 
                  who selected other or chose not to answer average around 110k
                  per year. It is also worth noting that a portion of respondants 
                  have multiple racial identities, and each selected race was 
                  counted in its respective averages.
                </p>
              </Paper>
            </Grid>

            <Grid item xs = {12} md = {8} lg = {7}>
              <Paper className = {classes.bigTextbox}>
                <center><h2>Salary Difference by Race</h2></center>
                {!isLoaded ? (
                  <center><CircularProgress /></center>
                ) : (
                  <center><BarChart width = {530} height = {350} data = {data7}>
                    <CartesianGrid strokeDasharray = "3 3"/>
                    <XAxis 
                      dataKey = "_id" 
                      label = {{value: "Race", position: "insideBottom", offset: -2}}/>
                    <YAxis 
                      label = {{value: "Salary ($k)", angle: -90, position: "insideLeft"}} 
                      domain = {[60, 120]} />
                    <Bar dataKey = "salary" fill = {'#00ff00'}>
                      <LabelList 
                        dataKey = "_id" 
                        angle = {270} 
                        position = "center" 
                        fontSize = {12} 
                        fill = {'#000000'}
                      />
                      <LabelList 
                        dataKey = "val"
                        angle = {0} 
                        position = "top" 
                        fontSize = {14} 
                        fill = {'#000000'}
                      />
                    </Bar>
                    <Tooltip cursor = {false}/>
                  </BarChart></center>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={7}>
              <Paper className={classes.textbox}>
                <center>
                  <h2>Average Annual Salary by Work experience</h2>
                </center>
                {!isLoaded ? (
                  <center><CircularProgress /></center>
                ) : (
                  <center><LineChart 
                    width={530} 
                    height={280} 
                    data={data8}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" padding={{ left: 20, right: 20 }}>
                      <Label value = "Work Experience (Years)" offset={-2} position="insideBottom" />
                    </XAxis>
                    <Tooltip />
                    <YAxis label = {{value: "Salary ($k)", angle: -90, position: "insideLeft"}} 
                    domain = {[30, 130]}/>
                    <Line 
                      type="monotone" 
                      dataKey="salary" 
                      stroke = {colors[2]} 
                      activeDot = {{r: 8}}
                      label = {{value: 'salary', position: "top"}}/>
                  </LineChart></center>
                )}
              </Paper>
            </Grid>

            <Grid item xs = {12} md = {8} lg = {5}>
              <Paper className = {classes.textbox}>
                <center><h3>Work Experience Matters</h3></center>
                <p>The average annual salary increases steadily until 21-30 years 
                  of work experience, and begins to decrease afterwards. Starting 
                  at 70k, one could reach 115k per year after 21-30 years in the 
                  work force. The trend basically goes hand in hand with the first 
                  graph illustrating the growth of annual salary over time. As a 
                  person grows older and gains more experience working, it makes 
                  sense that his/her salary increases along the way. Say a person 
                  first starts working at 20, and after 21-30 years that person 
                  is 41-50, which is among the highest earning age groups as well. 
                  There is a drop in income after 30 years of work experience, and 
                  perhaps this could be due to old age or structual reasons for not 
                  being albe to adjust and learn new technology needed for the job.</p>
              </Paper>
            </Grid>

            <Grid item xs = {12} md = {8} lg = {12}>
              <Paper className = {classes.paper}>
                <center><h2>Average Annual Salary Across Industries</h2></center>
                {!isLoaded ? (
                  <center><CircularProgress /></center>
                ) : (
                  <center>
                    <BarChart 
                      width = {1500} 
                      height = {370} 
                      data = {data6} 
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

            <Grid item xs = {12} md = {8} lg = {12}>
              <Paper className = {classes.paper}>
                <center><h3>How Lucrative is Your Industry in the Job Market?</h3></center>
                <p>Data from 2021 survey results illustrate huge gaps and dramatic 
                  differences among the various industries. With an average annual 
                  salary of 146k, energy is the most lucrative industry in 2021 
                  according to the data from the survey. Energy, computing or tech, 
                  and law or law enforcement are the three highest earning industries 
                  in 2021, all averaging above 120k per year. Business or consulting, 
                  entertainment, accounting, banking, and finance, aerospace, and sales 
                  trail behind, still earning more than 100k per year on average. Other 
                  seemingly quite lucrative professions such as health care, insurence, 
                  marketing & advertising & PR, meida and digital,
                  and government and public administration fell short and drop below 
                  the 100k line. Education, food, art and design, and retail are among 
                  the lower end of the spectrum as they only earn around 70k per year. 
                  Quite out of the ordinary, utilities and telecommunications, 
                  argriculture and forestry, and auto repair are strikingly above average
                  grossing industries as they all average more than 87k per year.
                  Publishing, social work, and library are the three lowest earning 
                  industries in the 2021 survey. Library averages only 56k per year, 
                  making the cut as the most unlucrative job industry in 2021. Note 
                  that these values in the bar chart are all averages among respondants, 
                  so there definitly are many outliers in each industry, pulling up or 
                  dragging down the mean. Values in this graph should only be a general 
                  reference for users since they are not completely accurate 
                  representations of real-world salary levels.</p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h2>Distribution of People in the Job Market</h2>
                </center>
                {!isLoaded ? (
                  <center><CircularProgress /></center>
                ) : (
                  <center>
                    <RadarChart
                      innerRadius={90}
                      outerRadius={300}
                      width={950}
                      height={670}
                      data={data9}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" fontSize = {12} />
                      <PolarRadiusAxis angle={30} domain={[0, 4500]} />
                      <Radar
                        name="People"
                        dataKey="all"
                        stroke={'#8000ff'}
                        fillOpacity={0.1}
                      >
                        <LabelList 
                          dataKey = "all" 
                          position = "outside" 
                          angle = {0}
                          offset = {90} />
                      </Radar>
                      <Radar
                        name="Men"
                        dataKey="man"
                        stroke={'#0000FF'}
                        fill={'#ffffff'}
                        fillOpacity={0.1}
                      >
                      </Radar>
                      <Radar
                        name="Women"
                        dataKey="woman"
                        stroke={'#FF0000'}
                        fill={'#ffffff'}
                        fillOpacity={0.1}
                      >
                      </Radar>
                      <Radar
                        name="Non-Binary"
                        dataKey="non_binary"
                        stroke={'#00cc00'}
                        fill={'#ffffff'}
                        fillOpacity={0.1}
                      >
                      </Radar>
                      <Radar
                        name="Other"
                        dataKey="other"
                        stroke={'#cccc00'}
                        fill={'#ffffff'}
                        fillOpacity={0.1}
                      >
                      </Radar>
                      <Legend iconSize = {12} iconType = {'circle'} />
                      <Tooltip />
                    </RadarChart>
                  </center>
                )}
              </Paper>
            </Grid>

            <Grid item xs = {12} md = {8} lg = {12}>
              <Paper className = {classes.paper}>
                <center><h3>Is Computing or Tech the Future of the Job Market?</h3></center>
                <p>Out of all the industries we have identified in the survey, computing 
                  or tech is by far the most popular one. Education, nonprofits, health 
                  care, government and public administration, and accounting banking & 
                  finance are also very popular industries right behind computing. Law 
                  and law enforcement, marketing advertising & PR, business or consulting 
                  and meida & digital are less popular than the previous industries, but 
                  they still have a substantial work force. Highly specialized areas such 
                  as aerospace, auto repair, energy, and environment are the least popular 
                  industries, despite some of them being extremely lucrative. Since there 
                  are way more women than men respondants in this survey, every industry 
                  has more women than men. As seen in the salary difference by gender graph 
                  above, more than 77% of the respondants are women. For each industry, they 
                  should comprise of roughly 77% correspondingly. However, some industries 
                  have a much higher percentenage of men and much lower percentage of women.
                  For computing or tech, although it is by far the most popluar job area, 
                  the gap between men and women is least wide. Despite being one of the 
                  most luractive industries, women only amount to 54% of the computing or 
                  tech population. Despite being very popular and lucrative, computing or 
                  tech is still a very male-dominated industry. Energy, auto repair, 
                  entertainment, and food are some of the other very popular industries among 
                  men, and the percentages of women drop below 70% in these areas. On the 
                  other hand, some industries are overwhelmingly favored by women. Almost 92%
                  of those who work in the social work industry are women, and women comprise 
                  of 90% of the popluation in recruitment or HR. Shockingly, 92% of those who 
                  work in aerospace are women, but this is due to the very small sample size 
                  since only 12 people work in this industry in the survey. Other industries 
                  such as health care, education, library, and nonprofits also have a higher 
                  presence of women than men. The food industry has the highest percentage of 
                  non-binary people (13%), followed by argriculture or forestry and library, 
                  both over 7%. Additionally, food is also the most popular industry (3.77%) 
                  for those who entered "other or prefer not to answer" as their gender. 
                  Other popular industries for those who identify as other or did not answer 
                  are agriculture or forestry, entertainment, and retail. Data analysis on 
                  all graphs on this page are not meant to be accruate and comprehensive due 
                  to the imperfect nature of the survey and low sample size for some of the 
                  industries.
                </p>
              </Paper>
            </Grid>

            <Grid item xs = {12} md = {8} lg = {12}>
              <Paper className = {classes.paper}>
                <center><h2>Top 10 Countries</h2></center>
                {!isLoaded ? (
                  <center><CircularProgress /></center>
                ) : (
                  <center>
                    <FunnelChart 
                      width={1070} 
                      height={230} 
                    >
                      <Funnel 
                        data = {data10}
                        dataKey='val'
                        nameKey = "_id"
                      >
                        <LabelList
                          position = "left" 
                          dataKey = '_id'
                          stroke = '#000000'
                          fontSize = {14}
                        />
                        <LabelList
                          position = "right" 
                          dataKey = 'val'
                          stroke = '#000000'
                          fontSize = {14}
                        />
                      </Funnel>
                      <Tooltip />
                    </FunnelChart>
                  </center>
                )}
              </Paper>
            </Grid>

            <Grid item xs = {12} md = {8} lg = {12}>
              <Paper className = {classes.paper}>
                <center><h3>A Very USA-Centered Survey</h3></center>
                <p>As shown by all the graphs above, the majority of respondants in this 
                  dataset are young, white, female professionals. These areas are nothing 
                  compared to the lopsidedness of the countries entered in the 2021 survey.
                  Illustrated by the funnel chart to the left, over 85% of respondants are 
                  from the United States. Other top countries are Canada, Australia, 
                  Germany, England, Ireland, New Zealand, The Netherlands, France, and 
                  Scotland, making the data set very much western-centered. Smaller entries 
                  from other countries simply could not contribute much, so it would not 
                  make much sense to conduct data analysis on average annual salary by 
                  country. Although there are many flaws and imperfections, this survey 
                  could provide a basic guide and reference for professionals in the job 
                  market. 
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
