import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems } from "./listItems";
import Title from "./Title";
import Copyright from "./Copyright";
import useStyles from "./UseStyles.js";
import PageTitle from "./PageTitle";
let res;
/**
 * This component is to add responses to our database by embedding a Google Form with questions matching the original survey's
 * @returns a rendered google form and extra components to format the web-page
 */
export default function AddResponse() {
  // Page Styling
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // returning components and web page design elements
  return (
    <div className={classes.root}>
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
          <PageTitle text="Add a Response" />
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
      {/* This is the main part of the page, where the google form can be taken */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Title>Add Your Own Response! Responses submitted through this page will be added directly to our copy of the 2021 dataset and will show up on graphs and in searches.</Title>
          <Box>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdsCwNyG9kLUVL8QqINFvW-jLQAMHJkyXo6ykaS2ei4MTtPqA/viewform?embedded=true"
              width="640"
              height="3812"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
            >
              Loading…
            </iframe>
          </Box>
          {/* Copyright for the app */}
          <Box pt={5}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
