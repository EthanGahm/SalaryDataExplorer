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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterAndSearch from "./FilterAndSearch";
import DataSummary from "./DataSummary";
import AddResponse from "./AddResponse";
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
              <Paper className={classes.paper}>
                {/* context about the app */}
                <Title>About this Tool</Title>
                <p>This application is a data analysis tool built from the AskAManager.org 
                2021 and 2019 survey results. Through graphs and text analysis, users can 
                explore interesting trends and compare their own salary to the data 
                visualizaed in this software. Information on this side could be used as 
                reference to provide guidance for professionals across various industries, 
                countries, gender, races, and education levels.</p>
                <p>User can also filter and 
                search for salaries according to their specified demographic information 
                such as location, age, gender, industry, and race. Additionally, users are 
                more then welcome to sumbit their own reponses to the survey, and their 
                salary information will be included in our 2021 database. Your additions 
                to the dataset will also be reflected in the Data Summery page on this app.
                </p>
              </Paper>
            </Grid>

            <Grid item xs = {12} md = {10} lg = {6}>
              <Paper className = {classes.longTextbox}>
                <Title>Key Features</Title>
                <ul>
                  <li style={{fontSize: 16}}>Explore Data Trends</li>
                    <p>Want to know which age group, gender, race, or industry earns the most? 
                    Looking for a job but unsure of its typical salary levels? You won't 
                    believe these are the actual highest paid industries! What are some of 
                    the most popular industries for young professionals these days? Interested?
                    Checkout our <a href="/DataSummary">Data Summary</a> page for more 
                    information now!</p>
                  <li style={{fontSize: 16}}>Compare Across Datasets</li>
                    <p>Want to learn more about how salary trends shifted from 2019 to 2021 after 
                    COVID 19 hit? Eager to find out how this dataset compares to the national 
                    averages? Curious of the top earning industries in 2019 as opposeed to 2021? 
                    Check out our <a href="/DataComparisons">Comparing Datasets</a> page for more 
                    information!</p>
                  <li style={{fontSize: 16}}>Filter and Search for Specific Jobs</li>
                    <p>Got a feeling that you are underpaid? Want to know the average salary 
                    in your age group, industry, or area? Look no further than our <a href="
                    FilterAndSearch">Filter and Search</a> page to find the information you need!</p>
                  <li style={{fontSize: 16}}>Sumbit Your Own Salary Data</li>
                    <p>Feeling generous and want to contribute? Feel free to <a href="AddResponse">
                    sumbit your own salary data</a> to help others like you. Your data will be 
                    included in our database, and it will be reflected in the <a href="DataSummary">
                    Data Summery</a> page as well.</p>
                </ul>
              </Paper>
            </Grid>

            <Grid item xs = {12} md = {6} lg = {6}>
              <Paper className = {classes.longTextbox}>
                <Title>Demographics</Title>
                <p>In the Data Summary page, users can find the average salary data by 
                  age, highest level of education, gender, race, work experience, and 
                  industry. Age is divided into seven groups: under 18, 18-24, 25-34, 
                  45-54, 55-64, and 65 or over. Degrees have seven catagories as well:
                  high school, some college, college degree, master's degree, PhD, 
                  professional degree (MD, JD, etc.), and other. The 2021 survey has 
                  four choices for gender: man, woman, non-binary, and other or prefer 
                  not to answer. There are also seven choices for race: Asian or Asian 
                  American, Black or African American, Hispanic/Latino or Spanish origin, 
                  Middle Eastern or North African, Native American or Alaskan Native, 
                  White, and other or prefer not to answer. Since many people are mixed, 
                  the survey allows multiple selections for race. Work experience is 
                  divided into 8 catagories: 0-1 years, 2-4 years, 5-7 years, 8-10 years, 
                  11-20 years, 21-30 years, 31-40 years, and 40 or more years. There are 
                  33 distinct industries and numerous country/state/city entries around 
                  the world.
                </p>
                <p>
                  In the Filter and Search page, users have the power to filter by age, 
                  industry, gender, location, and race to find entries belonging in the 
                  specified catagories. 
                  (Filtering by location only supports country and states since most cities 
                  have very few data.) 
                  Rows that meet the entered requirements will 
                  display at the bottom of the page for reference. After searching for 
                  jobs, users can find basic stats our of the returned jobs such as mean 
                  salary, median salary, average age, etc. Additionally, they can also 
                  locate where the entries are on the embedded Google Maps component. 
                  Users can reset filters and toggle through the pages using the 
                  previous and next buttons if there are too many rows of entries to 
                  display at once.
                </p>
              </Paper>
            </Grid>

          </Grid>

          <Grid container spacing={3}>
            <Grid item xs = {12} md = {8} lg = {12}>
              <Paper className = {classes.paper}>
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
                    Want to learn more about how salary trends shifted from 2019 to 2021 after 
                    COVID 19 hit? Eager to find out how this dataset compares to the national 
                    averages? Check out our <a href="/DataComparisons">Comparing Datasets</a> page 
                    for more information!
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
                      I can't find any entries in my country/state/province.
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    Got a feeling that you are underpaid? Want to know the average salary 
                    in your age group, industry, or area? Look no further than our <a href="
                    FilterAndSearch">Filter and Search</a> page to find the information you need! 
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
                    Feeling generous and want to contribute? Feel free to <a href="AddResponse">
                    sumbit your own salary data</a> to help others like you. Your data will be 
                    included in our database, and it will be reflected in the <a href="DataSummary">
                    Data Summery</a> page as well.
                    Am I too old?
                  What if I don't have a job yet?
                  I can't find any entries in my country/state/province/city.
                  I don't know which industry my job belongs to.
                  What is the default currency in the graphs?
                  How can I convert my currency to USD?
                  Who created this magnificent application?
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
                      Where do I find salary data for people in my country/state/province?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    
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
