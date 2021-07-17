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
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterAndSearch from "./FilterAndSearch";
import DataSummary from "./DataSummary";
import AddResponse from "./AddResponse";
import salaryPic from "./salaryPic.jpg";
import homePic from "./homePic.png";
import Button from "@material-ui/core/Button";
// This is the home page, which holds a description for what features the app has.

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
            <Grid item xs={12} md={6} lg={12}>
              {/* <div style={{backgroundImage: `url(${homePic})`}} > */}
              <Paper className={classes.paper}>
                {/* context about the app */}
                <Title>About this Tool</Title>
                <p>
                  This application is a data analysis tool built from the
                  AskAManager.org 2021 and 2019 salary survey results. Through
                  graphs and text analysis, users can explore interesting trends
                  and compare their own salary to the data visualizaed in this
                  software. Information on this site may be used as reference to
                  provide guidance for professionals across industries.
                </p>

                <div
                  class="container"
                  style={{ position: "relative", width: "100%" }}
                >
                  <center>
                    <img src={homePic} />
                  </center>
                  <Button
                    variant="contained"
                    style={{
                      height: 40,
                      position: "absolute",
                      top: "80%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                    color="secondary"
                    href="DataSummary"
                  >
                    View Graphs
                  </Button>
                </div>

                <p>
                  Users can also filter and search for our 2021 dataset based on
                  parameters such as location, age, gender, industry, and race.
                  Additionally, users are encouraged to submit their own
                  reponses to the survey, and their salary information will be
                  included in our 2021 database. Your additions to the dataset
                  will also be reflected in the Data Summary and Filter and
                  Search pages on this app.
                </p>
              </Paper>
              {/* </div> */}
            </Grid>

            <Grid item xs={12} md={10} lg={6}>
              <Paper className={classes.longTextbox}>
                <Title>Key Features</Title>
                <ul>
                  <li style={{ fontSize: 16, color: "orange" }}>
                    Explore Data Trends
                  </li>
                  <p>
                    Want to know which age group, gender, race, or industry
                    earns the most? Looking for a job but unsure of its typical
                    salary levels? You won't believe these are the actual
                    highest paid industries! What are some of the most popular
                    industries for young professionals in 2021? Interested?
                    Check out our <a href="/DataSummary">Data Summary</a> page
                    for more information.
                  </p>
                  <li style={{ fontSize: 16, color: "orange" }}>
                    Compare Across Datasets
                  </li>
                  <p>
                    Want to learn more about how salary trends shifted from 2019
                    to 2021 after COVID-19 hit? Eager to find out how this
                    dataset compares to national averages? Curious about the top
                    earning industries in 2019 as opposed to 2021? Check out our{" "}
                    <a href="/DataComparisons">Comparing Datasets</a> page for
                    more information!
                  </p>
                  <li style={{ fontSize: 16, color: "orange" }}>
                    Filter and Search for Specific Jobs
                  </li>
                  <p>
                    Got a feeling that you are underpaid? Want to know the
                    average salary in your age group, industry, or area? Look no
                    further than our{" "}
                    <a
                      href="
                    FilterAndSearch"
                    >
                      Filter and Search
                    </a>{" "}
                    page to find the information you need!
                  </p>
                  <li style={{ fontSize: 16, color: "orange" }}>
                    Submit Your Own Salary Data
                  </li>
                  <p>
                    Feeling generous and want to contribute? Feel free to{" "}
                    <a href="AddResponse">submit your own salary data</a> to
                    help others like you. Your data will be included in our
                    database, and it will be reflected in the{" "}
                    <a href="DataSummary">Data Summary</a> and{" "}
                    <a href="FilterAndSearch">Filter and Search</a> pages as
                    well.
                  </p>
                </ul>
                <p>
                  The Data Summary page shows salary trends based on the 2021
                  survey data, and users can visualize average salary by age,
                  gender, race, work experience, highest level of education,
                  industry, and more. The Data Comparison page allows users to
                  visualize differences between the 2019 survey data, 2021
                  survey data, and United States national average data from
                  Don't Quit Your Day Job (DQYDJ). The Filter and Search page
                  enables users to filter jobs through various demographic
                  categories such as age, gender, industry, country, and race.
                  Users are more then welcome to enter their own salaries in the
                  Add Response page to contribute to our 2021 dataset.
                </p>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.longTextbox}>
                <Title>Demographics</Title>
                <p>
                  On the Data Summary page, users can find the average salary
                  data by age, highest level of education, gender, race, work
                  experience, and industry. Age is divided into seven groups:
                  under 18, 18-24, 25-34, 45-54, 55-64, and 65 or over. Degrees
                  have seven categories as well: high school, some college,
                  college degree, master's degree, PhD, professional degree (MD,
                  JD, etc.), and other. The 2021 survey has four choices for
                  gender: man, woman, non-binary, and other or prefer not to
                  answer. There are also seven choices for race: Asian or Asian
                  American, Black or African American, Hispanic/Latino or
                  Spanish origin, Middle Eastern or North African, Native
                  American or Alaskan Native, White, and other or prefer not to
                  answer. The survey allows multiple selections for race. Work
                  experience is divided into 8 categories: 0-1 years, 2-4 years,
                  5-7 years, 8-10 years, 11-20 years, 21-30 years, 31-40 years,
                  and 40 or more years. There are 33 distinct industries and
                  numerous country/state/city entries from around the world.
                </p>
                <p>
                  On the Filter and Search page, users have the power to filter
                  by age, industry, gender, location, and race to find entries
                  belonging in the specified categories. (Filtering by location
                  only supports country and states since most cities have very
                  few individual data points). Rows that meet the entered
                  requirements will display at the bottom of the page for
                  reference. After searching for jobs, users can find basic
                  statistics about the returned entries such as mean salary,
                  median salary, average age, etc. Additionally, users can
                  locate where the entries are on the embedded Google Maps
                  component. Users can reset filters and toggle through the
                  pages using the previous and next buttons if there are too
                  many rows of entries to display at once.
                </p>
                <img src={salaryPic} width={440} height={250} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <Title>About us</Title>
                <p>
                  This website was created by a group of University of Virginia
                  undergraduates as a summer project through the UVA Development
                  Hub.
                  <br></br>
                  Find us on GitHub:
                  <ul>
                    <li>
                      <a href="https://github.com/EthanGahm">Ethan Gahm</a>
                    </li>
                    <li>
                      <a href="https://github.com/vinnypeng2000">Vinny Peng</a>
                    </li>
                    <li>
                      <a href="https://github.com/ilangjung">I Jung</a>
                    </li>
                    <li>
                      <a href="https://github.com/JulietteLaburthe">
                        Juliette Laburthe
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/Philip-Hart">Philip Hart</a>
                    </li>
                  </ul>
                </p>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <Title>FAQ</Title>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      What if I don't have a job yet?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      A prospective young professional? Or freshly beween 
                      jobs?
                      You are still more than welcome to visit our side 
                      and explore data trends. If you are looking for a 
                      job and/or unsure which industry or area you want 
                      to pursue, check out some of our salary information. 
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography className={classes.heading}>
                      Can I see which industry earns the most?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The Data Summary page has a graph that illustrates the 
                      average annual salary across all 33 industries in the 
                      job market. You can also visit the Filter and Search page, 
                      enter specific filters, and the Data Summary box will tell 
                      you the top 3 highest earning industries according to the 
                      information you entered.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography className={classes.heading}>
                      I can't find any entries in my country/state.
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Due to the incredible lopsidedness of the dataset, 
                      some countries/states have very few entries. We 
                      apologize for the lack of data. However, you can become the 
                      first in your country/state by entering your own 
                      salary information in the Add Response page!
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography className={classes.heading}>
                      I don't know which industry my job belongs to.
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Make your best educated guess if you are not sure which 
                      industry your job belongs to. You could also browse some 
                      of our entires in the filter and search page to find similar 
                      jobs. Want to learn more about jobs and industries? 
                      Visit <a href="https://www.careeronestop.org">here</a> for 
                      more information.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      What is the default currency in the graphs?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      In order to standardize our data, all monetary values were
                      converted to USD. You may need to manually convert values
                      back into your currency of choice. In the Filter and Search 
                      page, there is a row specifying the original currencies of 
                      each data entry for reference.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      How can I convert my currency to USD?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Having trouble making sense of all the salary data? Google 
                      is your friend! Find an online currency converter now or 
                      use <a href='https://www.xe.com/'>this</a> tool 
                      to help.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      Where do I find salary data for people in my
                      country/state?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Head over to the Filter and Search page and specify your
                      location in the "filters" pop-up.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      What if there are too many entires in the data grid table?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Too many rows are dispalying? Can't seem to find what you are looking for? 
                      Try narrowing down the entires by entering more specific values 
                      in the drop down menues in the Filter and Search page.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      Why does filtering take too much time to load?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The data you searched contains a huge number of entires. You can 
                      significantly reduce the search time by being more specific in the 
                      filters. The more you enter, the less time it will take to return 
                      matching results.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      Why are some pin points outside of my selected Country/State?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      We do not fact check the entires in the dataset. Some people 
                      might have entered China for country, Virginia for state, and 
                      Berlin as city, which doesn't make sense at all. Nonetheless, 
                      these pins are shown on the Google Maps component.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      If the salary information I entered safe?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Everything entered in the Add Response page is confidential as 
                      we add your entry to the safe and secure database in the cloud. 
                      There will not be any personal information asked. If you feel 
                      uneasy while answering the questions, you can stop the survey 
                      immediately.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
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
