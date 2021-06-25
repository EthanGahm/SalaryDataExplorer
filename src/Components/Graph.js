import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useStyles from "./UseStyles.js";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { GoogleSpreadsheet } from "google-spreadsheet";
// import { csv } from 'd3';
// import dataCSV from './CleanedData2021.csv';
import axios from 'axios';
import {RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, PieChart, Pie,
LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip, Legend, LabelList} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const colors1 = ['#ABCDEF', '#009900', '#CCCC00', '#FF0000', '#3333FF', '#00CCCC', '#FF00FF'];
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];

export default function Graph() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  
  useEffect(() => {
    (async function getData() {

      var response1 = await axios.get('https://salary-data-api.herokuapp.com/salary_data/numALL');
      data1 = response1.data;
      console.log(data1);
      var response2 = await axios.get('https://salary-data-api.herokuapp.com/salary_data/salaries');
      data2 = response2.data;
      data2.sort((a, b) => (a._id > b._id) ? 1 : -1);
      var response3 = await axios.get('https://salary-data-api.herokuapp.com/salary_data/disDegrees');
      data3 = response3.data;
      for (let i = 0; i < data3.length; i++) {
        data3[i].fill = colors1[i];
      }
      var response4 = await axios.get('https://salary-data-api.herokuapp.com/salary_data/ages');
      data4 = response4.data;
      data4.sort((a, b) => (a._id > b._id) ? 1 : -1);
      data4.unshift(data4.pop());
      setIsLoaded(true);

    })();
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>


            <Grid item xs={12} md={8} lg={12}>
              <Paper className={classes.paper}>
                <center>
                  <h4>Distribution of People in the Job Market</h4>
                </center>
                {!isLoaded ? (
                  <CircularProgress />
                ) : (
                  <center>
                    <RadarChart
                      innerRadius={90}
                      outerRadius={270}
                      width={1000}
                      height={600}
                      data={data1}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" fontSize = {12} />
                      <PolarRadiusAxis angle={30} domain={[0, 4500]} />
                      {/* <Radar
                        name="People"
                        dataKey="all"
                        fill={'#0000FF'}
                        fillOpacity={0.3}
                      >
                        <LabelList dataKey = "all" position = "insideStart" angle = {0} />
                      </Radar> */}
                      <Radar
                        name="Men"
                        dataKey="man"
                        fill={'#0000FF'}
                        fillOpacity={0.1}
                      >
                        <LabelList dataKey = "val" position = "insideStart" angle = {0} />
                      </Radar>
                      <Radar
                        name="Women"
                        dataKey="woman"
                        fill={'#FF0000'}
                        fillOpacity={0.1}
                      >
                        <LabelList dataKey = "val" position = "insideStart" angle = {0} />
                      </Radar>
                      <Radar
                        name="Non-Binary"
                        dataKey="non_binary"
                        fill={'#00FF00'}
                        fillOpacity={0.1}
                      >
                        <LabelList dataKey = "val" position = "insideStart" angle = {0} />
                      </Radar>
                      <Radar
                        name="Other"
                        dataKey="other"
                        fill={'#cccc00'}
                        fillOpacity={0.1}
                      >
                        <LabelList dataKey = "val" position = "insideStart" angle = {0} />
                      </Radar>
                      {/* <Radar
                        name="No Answer"
                        dataKey="no_answer"
                        fill={'#0000FF'}
                        fillOpacity={0.3}
                      >
                        <LabelList dataKey = "val" position = "insideStart" angle = {0} />
                      </Radar> */}
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </center>
                )}
              </Paper>
            </Grid>


            <Grid item xs = {12} md = {8} lg = {12}>
              <Paper className = {classes.paper}>
                <center><h4>Average Annual Salary Across Industries</h4></center>
                {!isLoaded ? (
                  <CircularProgress />
                ) : (
                  <center>
                    <BarChart 
                      width = {1500} 
                      height = {500} 
                      data = {data2} 
                      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                    >
                    <CartesianGrid strokeDasharray = "3 3" />
                    <XAxis dataKey = "_id"/>
                    <YAxis 
                      label = {{value: "Salary ($k)", angle: -90, position: "insideLeft"}}
                      domain = {[0, 160]}
                    />
                    <Bar 
                      dataKey = "salary" 
                      fill = {colors[1]}  
                    >
                      <LabelList dataKey = "_id" angle = {90} position = "center" fontSize = {12}/>
                    </Bar>
                    <Tooltip />
                    </BarChart>
                  </center>
                )
                }
              </Paper>
            </Grid>


            <Grid item xs = {12} md = {8} lg = {4}>
              <Paper className={classes.paper}>
                <center><h4>Distribution of Degrees</h4></center>
                {!isLoaded ? (
                  <CircularProgress />
                ) : (
                  <center>
                    <PieChart 
                      width={300} 
                      height={350} 
                      margin = {{ top: 5, right: 0, left: 0, bottom: 5}}
                    >
                    <Pie 
                      data = {data3} 
                      dataKey = "val" 
                      nameKey = "name" 
                      cx = "50%" 
                      cy = "50%" 
                      outerRadius = {100} 
                      label />
                    <Legend />
                    <Tooltip />
                    </PieChart>
                  </center>
                )
                }
              </Paper>
            </Grid>


            <Grid item xs = {12} md = {8} lg = {8}>
              <Paper className = {classes.paper}>
                <center><h4>Change in Average Annual Salary over Time</h4></center>
                {!isLoaded ? (
                  <CircularProgress />
                ) : (
                  <center>
                    <LineChart 
                      width={700} 
                      height={350} 
                      data={data4}
                      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="_id" padding={{ left: 10, right: 10 }}>
                        <Label value = "Age" offset={-15} position="insideBottom" />
                      </XAxis>
                      <Tooltip />
                      <YAxis label = {{value: "Salary $k", angle: -90, position: "insideLeft"}} 
                      domain = {[0, 120]}/>
                      <Line type="monotone" dataKey="salary" fill = {colors[0]} />
                    </LineChart>
                  </center>
                )}
              </Paper>
            </Grid>


          </Grid>
        </Container>
      </main>
    </div>
  );
}
