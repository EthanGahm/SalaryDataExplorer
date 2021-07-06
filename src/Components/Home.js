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

            <Grid item xs={12} md={8} lg={8}>
              <Paper className={classes.paper}>
                {/* context about the app */}
                <Title>About this Tool</Title>
                This is a tool that allows users to access information about
                their salaries based on the 2021 ask a manager survey. Users
                could search for a specific job position or industry to find
                salary data. We have charts and graphs to represent the
                different levels of salaries, and we could show corrolations
                between demographics and salary.
              </Paper>
            </Grid>

            <Grid item xs = {12} md = {8} lg = {4}>
              <Paper className = {classes.paper}>
                <Title>Key Features</Title>
                Hello!!!!!!!!!!!
              </Paper>
            </Grid>

            <Grid item xs = {12} md = {8} lg = {4}>
              <Paper className = {classes.paper}>
                <Title>ADs</Title>
                Advertising??????????
              </Paper>
            </Grid>

            <Grid item xs = {12} md = {8} lg = {8}>
              <Paper className = {classes.paper}>
                <Title>Sample</Title>
                Pics
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
