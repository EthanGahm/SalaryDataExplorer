import React from "react";
import SheetsAPIInfo from "../SheetsAPIInfo.json";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useStyles from "./UseStyles.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
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
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const data = [
  { name: "Computing or Tech", val: 5000, fill: colors[0] },
  { name: "Accounting, Banking & Finance", val: 7000, fill: colors[1] },
  { name: "Education (Higher Education)", val: 2000, fill: colors[2] },
];
let data1 = [];
let data2 = [];
let data3 = [];
let rows = [];
var numCT = 0;
let numABF = 0;
let avgABF = 0.0;
var salABF = [];
var numAF = 0;
var numAD = 0;
var numBC = 0;
var numEPS = 0;
var numEH = 0;
var numEM = 0;
var numEnt = 0;
var numGPA = 0;
var numHC = 0;
var numHE = 0;
var numIns = 0;
var numLaw = 0;
var numLS = 0;
var numLST = 0;
var numMAPR = 0;
var numMD = 0;
var numNonP = 0;
var numPC = 0;
var numRHR = 0;
var numRetail = 0;
var numSales = 0;
var numSW = 0;
var numTL = 0;
var numUT = 0;

const spreadSheet = new GoogleSpreadsheet(
  "1xL-FWa7vdAH32MtPPVX688IMmG2y2rE34A_VW7SoZnI"
);

export default function Graph() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  (async function google() {
    try {
      await spreadSheet.useServiceAccountAuth({
        client_email: SheetsAPIInfo.client_email,
        private_key: SheetsAPIInfo.private_key,
      });

      await spreadSheet.loadInfo();
      const sheet = spreadSheet.sheetsByIndex[0];
      rows = await sheet.getRows();
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].Industry === "Accounting, Banking & Finance") {
          numABF++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          salABF.push(totalSalary);
        }
        if (rows[i].Industry === "Agriculture or Forestry") {
          numAF++;
        }
        if (rows[i].Industry === "Art & Design") {
          numAD++;
        }
        if (rows[i].Industry === "Business or Consulting") {
          numBC++;
        }
        if (rows[i].Industry === "Computing or Tech") {
          numCT++;
        }
        if (rows[i].Industry === "Education (Primary/Secondary)") {
          numEPS++;
        }
        if (rows[i].Industry === "Education (Higher Education)") {
          numEH++;
        }
        if (rows[i].Industry === "Engineering or Manufacturing") {
          numEM++;
        }
        if (rows[i].Industry === "Entertainment") {
          numEnt++;
        }
        if (rows[i].Industry === "Government and Public Administration") {
          numGPA++;
        }
        if (rows[i].Industry === "Health care") {
          numHC++;
        }
        if (rows[i].Industry === "Hospitality & Events") {
          numHE++;
        }
        if (rows[i].Industry === "Insurance") {
          numIns++;
        }
        if (rows[i].Industry === "Law") {
          numLaw++;
        }
        if (rows[i].Industry === "Law Enforcement & Security") {
          numLS++;
        }
        if (rows[i].Industry === "Leisure, Sport & Tourism") {
          numLST++;
        }
        if (rows[i].Industry === "Marketing, Advertising & PR") {
          numMAPR++;
        }
        if (rows[i].Industry === "Media & Digital") {
          numMD++;
        }
        if (rows[i].Industry === "Nonprofits") {
          numNonP++;
        }
        if (rows[i].Industry === "Property or Construction") {
          numPC++;
        }
        if (rows[i].Industry === "Recruitment or HR") {
          numRHR++;
        }
        if (rows[i].Industry === "Retail") {
          numRetail++;
        }
        if (rows[i].Industry === "Sales") {
          numSales++;
        }
        if (rows[i].Industry === "Social Work") {
          numSW++;
        }
        if (rows[i].Industry === "Transport or Logistics") {
          numTL++;
        }
        if (rows[i].Industry === "Utilities & Telecommunications") {
          numUT++;
        }
      }
      var sumABF = 0;
      for (let i = 0; i < numABF; i++) {
        sumABF += salABF[i];
      }
      avgABF = sumABF / numABF;
      // console.log(avgABF);
      avgABF = avgABF.toFixed(2);
      data1.push({ name: "Accounting, Banking & Finance", val: numABF });
      data1.push({ name: "Agriculture or Forestry", val: numAF });
      data1.push({ name: "Art & Design", val: numAD });
      data1.push({ name: "Business or Consulting", val: numBC });
      data1.push({ name: "Computing or Tech", val: numCT });
      data1.push({ name: "Education (Primary/Secondary)", val: numEPS });
      data1.push({ name: "Education (Higher Education)", val: numEH });
      data1.push({ name: "Engineering or Manufacturing", val: numEM });
      data1.push({ name: "Entertainment", val: numEnt });
      data1.push({ name: "Government and Public Administration", val: numGPA });
      data1.push({ name: "Health Care", val: numHC });
      data1.push({ name: "Hospitality & Events", val: numHE });
      data1.push({ name: "Insurance", val: numIns });
      data1.push({ name: "Law", val: numLaw });
      data1.push({ name: "Law Enforcement & Security", val: numLS });
      data1.push({ name: "Leisure, Sport & Tourism", val: numLST });
      data1.push({ name: "Marketing, Advertising & PR", val: numMAPR });
      data1.push({ name: "Media & Digital", val: numMD });
      data1.push({ name: "Nonprofits", val: numNonP });
      data1.push({ name: "Property or Construction", val: numPC });
      data1.push({ name: "Recruitment or HR", val: numRHR });
      data1.push({ name: "Retail", val: numRetail });
      data1.push({ name: "Sales", val: numSales });
      data1.push({ name: "Social Work", val: numSW });
      data1.push({ name: "Transport or Logistics", val: numTL });
      data1.push({ name: "Utilities & Telecommunications", val: numUT });
      console.log(data1);
      console.log(salABF);
      console.log(avgABF);
      setIsLoaded(true);
      console.log(isLoaded);
      return true;
    } catch (e) {
      console.error("Error: ", e);
    }
  })();

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={classes.paper}>
                <center>
                  <h4>Distribution of People in the Job Market hi</h4>
                </center>
                {!isLoaded ? (
                  <CircularProgress />
                ) : (
                  <center>
                    <RadarChart
                      outerRadius={300}
                      width={1000}
                      height={670}
                      data={data1}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} />
                      <Radar
                        name="People"
                        dataKey="val"
                        fill={colors[2]}
                        fillOpacity={0.5}
                      />
                      <Legend />
                    </RadarChart>
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
