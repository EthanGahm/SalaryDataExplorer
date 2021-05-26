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
import WebsiteTitle from "./WebsiteTitle";
import Copyright from "./Copyright";
import useStyles from "./UseStyles.js";
import { PieChart, Pie, LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip} from 'recharts';

const data = [{"name": "Computing or Tech", "val": 100}, {"name": "Accounting, Banking & Finance", "val": 50}, 
{"name": "Education (Higher Education)", "val": 170}];

const colors = ['#0088FE', '#00C49F', '#FFBB28'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

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
  // state = {
  //   activeIndex: 0,
  // };
  // onPieEnter = (_, index) => {
  //   this.setState({
  //     activeIndex: index,
  //   });
  // };

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
          <WebsiteTitle />
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
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={classes.paper}>
                <Title>About this Tool</Title>
                This is a tool that allows users to access information about their salaries based on the
                2021 ask a manager survey. Users could search for a specific job position or industry to
                find salary data. We have charts and graphs to represent the different levels of salaries, 
                and we could show corrolations between demographics and salary.
              </Paper>
            </Grid>


            <Grid item xs = {12} md = {8} lg = {9}>
              <Paper className={classes.paper}>     
                <center><h4>Sample Line Chart</h4></center>                
                <center><LineChart width={700} height={300} data={data}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" padding={{ left: 10, right: 10 }}>
                    <Label value = "Occupation" offset={-15} position="insideBottom" />
                  </XAxis>
                  <YAxis label = {{value: "Salary", angle: -90, position: "insideLeft"}} />
                  <Tooltip />
                  <Line type="monotone" dataKey="val" stroke="#8884d8" />
                </LineChart></center>
              </Paper>
            </Grid>
          </Grid>


          <Grid item xs = {12} md = {8} lg = {9}>
            <Paper className = {classes.paper}>
              <center><PieChart width={300} height={300} margin = {{ top: 5, right: 0, left: 0, bottom: 5}}>
                <Pie data = {data} dataKey = "val" nameKey = "name" cx = "50%" cy = "50%" outerRadius = {100} 
                fill= {colors[0]} label />
              </PieChart></center>
              <h4><center>Number of People for Each Degree</center></h4>
              </Paper>
          </Grid>


          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
