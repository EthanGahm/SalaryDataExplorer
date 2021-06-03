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
  LabelList,
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
let numABF = 0;
let avgABF = 0.0;
var salABF = [];
var numAF = 0;
var avgAF = 0.0;
var salAF = [];
var numAD = 0;
var avgAD = 0.0;
var salAD = [];
var numBC = 0;
var avgBC = 0.0;
var salBC = [];
var numCT = 0;
var avgCT = 0.0;
var salCT = [];
var numEPS = 0;
var avgEPS = 0.0;
var salEPS = [];
var numEH = 0;
var avgEH = 0.0;
var salEH = [];
var numEM = 0;
var avgEM = 0.0;
var salEM = [];
var numEnt = 0;
var avgEnt = 0.0;
var salEnt = [];
var numGPA = 0;
var avgGPA = 0.0;
var salGPA = [];
var numHC = 0;
var avgHC = 0.0;
var salHC = [];
var numHE = 0;
var avgHE = 0.0;
var salHE = [];
var numIns = 0;
var avgIns = 0.0;
var salIns = [];
var numLaw = 0;
var avgLaw = 0.0;
var salLaw = [];
var numLS = 0;
var avgLS = 0.0;
var salLS = [];
var numLST = 0;
var avgLST = 0.0;
var salLST = [];
var numMAPR = 0;
var avgMAPR = 0.0;
var salMAPR = [];
var numMD = 0;
var avgMD = 0.0;
var salMD = [];
var numNonP = 0;
var avgNonP = 0.0;
var salNonP = [];
var numPC = 0;
var avgPC = 0.0;
var salPC = [];
var numRHR = 0;
var avgRHR = 0.0;
var salRHR = [];
var numRetail = 0;
var avgRetail = 0.0;
var salRetail = [];
var numSales = 0;
var avgSales = 0.0;
var salSales = [];
var numSW = 0;
var avgSW = 0.0;
var salSW = [];
var numTL = 0;
var avgTL = 0.0;
var salTL = [];
var numUT = 0;
var avgUT = 0.0;
var salUT = [];
var highSchool = 0; var someCollege = 0; var college = 0; var masters = 0; var PhD = 0; var profD = 0;

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
      var otherCurs = [];
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].Other != "") {
          otherCurs.push(rows[i].Other);
        }

        if (rows[i]["Highest Level of Education"] === "High School") {
          highSchool++;
        }
        if (rows[i]["Highest Level of Education"] === "Some college") {
          someCollege++;
        }
        if (rows[i]["Highest Level of Education"] === "College degree") {
          college++;
        }
        if (rows[i]["Highest Level of Education"] === "Master's degree") {
          masters++;
        }
        if (rows[i]["Highest Level of Education"] === "PhD") {
          PhD++;
        }
        if (rows[i]["Highest Level of Education"] === "Professional degree (MD, JD, etc.)") {
          profD++;
        }

        if (rows[i].Industry === "Accounting, Banking & Finance") {
          numABF++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salABF.push(totalSalary);
        }
        if (rows[i].Industry === "Agriculture or Forestry") {
          numAF++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salAF.push(totalSalary);
        }
        if (rows[i].Industry === "Art & Design") {
          numAD++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salAD.push(totalSalary);
        }
        if (rows[i].Industry === "Business or Consulting") {
          numBC++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salBC.push(totalSalary);
        }
        if (rows[i].Industry === "Computing or Tech") {
          numCT++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salCT.push(totalSalary);
        }
        if (rows[i].Industry === "Education (Primary/Secondary)") {
          numEPS++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salEPS.push(totalSalary);
        }
        if (rows[i].Industry === "Education (Higher Education)") {
          numEH++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salEH.push(totalSalary);
        }
        if (rows[i].Industry === "Engineering or Manufacturing") {
          numEM++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salEM.push(totalSalary);
        }
        if (rows[i].Industry === "Entertainment") {
          numEnt++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salEnt.push(totalSalary);
        }
        if (rows[i].Industry === "Government and Public Administration") {
          numGPA++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salGPA.push(totalSalary);
        }
        if (rows[i].Industry === "Health care") {
          numHC++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salHC.push(totalSalary);
        }
        if (rows[i].Industry === "Hospitality & Events") {
          numHE++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salHE.push(totalSalary);
        }
        if (rows[i].Industry === "Insurance") {
          numIns++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salIns.push(totalSalary);
        }
        if (rows[i].Industry === "Law") {
          numLaw++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salLaw.push(totalSalary);
        }
        if (rows[i].Industry === "Law Enforcement & Security") {
          numLS++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salLS.push(totalSalary);
        }
        if (rows[i].Industry === "Leisure, Sport & Tourism") {
          numLST++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salLST.push(totalSalary);
        }
        if (rows[i].Industry === "Marketing, Advertising & PR") {
          numMAPR++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salMAPR.push(totalSalary);
        }
        if (rows[i].Industry === "Media & Digital") {
          numMD++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salMD.push(totalSalary);
        }
        if (rows[i].Industry === "Nonprofits") {
          numNonP++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salNonP.push(totalSalary);
        }
        if (rows[i].Industry === "Property or Construction") {
          numPC++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salPC.push(totalSalary);
        }
        if (rows[i].Industry === "Recruitment or HR") {
          numRHR++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salRHR.push(totalSalary);
        }
        if (rows[i].Industry === "Retail") {
          numRetail++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salRetail.push(totalSalary);
        }
        if (rows[i].Industry === "Sales") {
          numSales++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salSales.push(totalSalary);
        }
        if (rows[i].Industry === "Social Work") {
          numSW++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salSW.push(totalSalary);
        }
        if (rows[i].Industry === "Transport or Logistics") {
          numTL++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salTL.push(totalSalary);
        }
        if (rows[i].Industry === "Utilities & Telecommunications") {
          numUT++;
          var totalSalary = parseInt(
            rows[i]["Annual Salary"].replace(/,/g, "")
          );
          if (rows[i].Currency === "EUR") {
            totalSalary *= 1.22;
          }
          if (rows[i].Currency === "JPY") {
            totalSalary *= 0.0091;
          }
          if (rows[i].Currency === "GPB") {
            totalSalary *= 1.42;
          }
          if (rows[i].Currency === "CHF") {
            totalSalary *= 1.11;
          }
          if (rows[i].Currency === "CAD") {
            totalSalary *= 0.83;
          }
          if (rows[i].Currency === "AUD/NZD") {
            totalSalary *= 0.78;
          }
          if (rows[i].Currency === "ZAR") {
            totalSalary *= 0.074;
          }
          if (rows[i].Currency === "HKD") {
            totalSalary *= 0.13;
          }
          if (rows[i].Currency === "SEK") {
            totalSalary *= 0.12;
          }
          salUT.push(totalSalary);
        }
      }
      console.log(otherCurs);

      var sumABF = 0;
      for (let i = 0; i < numABF; i++) {
        sumABF += salABF[i];
      }
      avgABF = sumABF / numABF / 1000;
      avgABF = avgABF.toFixed(2);
      var sumAF = 0;
      for (let i = 0; i < numAF; i++) {
        sumAF += salAF[i];
      }
      avgAF = sumAF / numAF / 1000;
      avgAF = avgAF.toFixed(2);
      var sumAD = 0;
      for (let i = 0; i < numAD; i++) {
        sumAD += salAD[i];
      }
      avgAD = sumAD / numAD / 1000;
      avgAD = avgAD.toFixed(2);
      var sumBC = 0;
      for (let i = 0; i < numBC; i++) {
        sumBC += salBC[i];
      }
      avgBC = sumBC / numBC / 1000;
      avgBC = avgBC.toFixed(2);
      var sumCT = 0;
      for (let i = 0; i < numCT; i++) {
        sumCT += salCT[i];
      }
      avgCT = sumCT / numCT / 1000;
      avgCT = avgCT.toFixed(2);
      var sumEPS = 0;
      for (let i = 0; i < numEPS; i++) {
        sumEPS += salEPS[i];
      }
      avgEPS = sumEPS / numEPS / 1000;
      avgEPS = avgEPS.toFixed(2);
      var sumEH = 0;
      for (let i = 0; i < numEH; i++) {
        sumEH += salEH[i];
      }
      avgEH = sumEH / numEH / 1000;
      avgEH = avgEH.toFixed(2);
      var sumEM = 0;
      for (let i = 0; i < numEM; i++) {
        sumEM += salEM[i];
      }
      avgEM = sumEM / numEM / 1000;
      avgEM = avgEM.toFixed(2);
      var sumEnt = 0;
      for (let i = 0; i < numEnt; i++) {
        sumEnt += salEnt[i];
      }
      avgEnt = sumEnt / numEnt / 1000;
      avgEnt = avgEnt.toFixed(2);
      var sumGPA = 0;
      for (let i = 0; i < numGPA; i++) {
        sumGPA += salGPA[i];
      }
      avgGPA = sumGPA / numGPA / 1000;
      avgGPA = avgGPA.toFixed(2);
      var sumHC = 0;
      for (let i = 0; i < numHC; i++) {
        sumHC += salHC[i];
      }
      avgHC = sumHC / numHC / 1000;
      avgHC = avgHC.toFixed(2);
      var sumHE = 0;
      for (let i = 0; i < numHE; i++) {
        sumHE += salHE[i];
      }
      avgHE = sumHE / numHE / 1000;
      avgHE = avgHE.toFixed(2);
      var sumIns = 0;
      for (let i = 0; i < numIns; i++) {
        sumIns += salIns[i];
      }
      avgIns = sumIns / numIns / 1000;
      avgIns = avgIns.toFixed(2);
      var sumLaw = 0;
      for (let i = 0; i < numLaw; i++) {
        sumLaw += salLaw[i];
      }
      avgLaw = sumLaw / numLaw / 1000;
      avgLaw = avgLaw.toFixed(2);
      var sumLS = 0;
      for (let i = 0; i < numLS; i++) {
        sumLS += salLS[i];
      }
      avgLS = sumLS / numLS / 1000;
      avgLS = avgLS.toFixed(2);
      var sumLST = 0;
      for (let i = 0; i < numLST; i++) {
        sumLST += salLST[i];
      }
      avgLST = sumLST / numLST / 1000;
      avgLST = avgLST.toFixed(2);
      var sumMAPR = 0;
      for (let i = 0; i < numMAPR; i++) {
        sumMAPR += salMAPR[i];
      }
      avgMAPR = sumMAPR / numMAPR / 1000;
      avgMAPR = avgMAPR.toFixed(2);
      var sumMD = 0;
      for (let i = 0; i < numMD; i++) {
        sumMD += salMD[i];
      }
      avgMD = sumMD / numMD / 1000;
      avgMD = avgMD.toFixed(2);
      var sumNonP = 0;
      for (let i = 0; i < numNonP; i++) {
        sumNonP += salNonP[i];
      }
      avgNonP = sumNonP / numNonP / 1000;
      avgNonP = avgNonP.toFixed(2);
      var sumPC = 0;
      for (let i = 0; i < numPC; i++) {
        sumPC += salPC[i];
      }
      avgPC = sumPC / numPC / 1000;
      avgPC = avgPC.toFixed(2);
      var sumRHR = 0;
      for (let i = 0; i < numRHR; i++) {
        sumRHR += salRHR[i];
      }
      avgRHR = sumRHR / numRHR / 1000;
      avgRHR = avgRHR.toFixed(2);
      var sumRetail = 0;
      for (let i = 0; i < numRetail; i++) {
        sumRetail += salRetail[i];
      }
      avgRetail = sumRetail / numRetail / 1000;
      avgRetail = avgRetail.toFixed(2);
      var sumSales = 0;
      for (let i = 0; i < numSales; i++) {
        sumSales += salSales[i];
      }
      avgSales = sumSales / numSales / 1000;
      avgSales = avgSales.toFixed(2);
      var sumSW = 0;
      for (let i = 0; i < numSW; i++) {
        sumSW += salSW[i];
      }
      avgSW = sumSW / numSW / 1000;
      avgSW = avgSW.toFixed(2);
      var sumTL = 0;
      for (let i = 0; i < numTL; i++) {
        sumTL += salTL[i];
      }
      avgTL = sumTL / numTL / 1000;
      avgTL = avgTL.toFixed(2);
      var sumUT = 0;
      for (let i = 0; i < numUT; i++) {
        sumUT += salUT[i];
      }
      avgUT = sumUT / numUT / 1000;
      avgUT = avgUT.toFixed(2);

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

      data2.push({ name: "Accounting, Banking & Finance", val: avgABF });
      data2.push({ name: "Agriculture or Forestry", val: avgAF });
      data2.push({ name: "Art & Design", val: avgAD });
      data2.push({ name: "Business or Consulting", val: avgBC });
      data2.push({ name: "Computing or Tech", val: avgCT });
      data2.push({ name: "Education (Primary/Secondary)", val: avgEPS });
      data2.push({ name: "Education (Higher Education)", val: avgEH });
      data2.push({ name: "Engineering or Manufacturing", val: avgEM });
      data2.push({ name: "Entertainment", val: avgEnt });
      data2.push({ name: "Government and Public Administration", val: avgGPA });
      data2.push({ name: "Health Care", val: avgHC });
      data2.push({ name: "Hospitality & Events", val: avgHE });
      data2.push({ name: "Insurance", val: avgIns });
      data2.push({ name: "Law", val: avgLaw });
      data2.push({ name: "Law Enforcement & Security", val: avgLS });
      data2.push({ name: "Leisure, Sport & Tourism", val: avgLST });
      data2.push({ name: "Marketing, Advertising & PR", val: avgMAPR });
      data2.push({ name: "Media & Digital", val: avgMD });
      data2.push({ name: "Nonprofits", val: avgNonP });
      data2.push({ name: "Property or Construction", val: avgPC });
      data2.push({ name: "Recruitment or HR", val: avgRHR });
      data2.push({ name: "Retail", val: avgRetail });
      data2.push({ name: "Sales", val: avgSales });
      data2.push({ name: "Social Work", val: avgSW });
      data2.push({ name: "Transport or Logistics", val: avgTL });
      data2.push({ name: "Utilities & Telecommunications", val: avgUT });

      data3.push({ name: "High School", val: highSchool, fill: "#009900" });
      data3.push({ name: "Some College", val: someCollege, fill: "#CCCC00" });
      data3.push({ name: "College Degree", val: college, fill: "#FF0000" });
      data3.push({ name: "Master's Degree", val: masters, fill: "#3333FF" });
      data3.push({ name: "PhD", val: PhD, fill: "#00CCCC" });
      data3.push({ name: "Professional degree (MD, JD, etc.)", val: profD, fill: "#FF00FF" });

      console.log(data1);
      console.log(data2);
      console.log(data3);
      // console.log(salABF);
      // console.log(avgABF);
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
                      innerRadius={70}
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
                      >
                        <LabelList dataKey = "val" position = "insideStart" angle = {0} />
                      </Radar>
                      <Legend />
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
                      width = {1150} 
                      height = {600} 
                      data = {data2} 
                      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                    >
                    <CartesianGrid strokeDasharray = "3 3" />
                    <XAxis dataKey = "name"/>
                    <YAxis 
                      label = {{value: "Salary ($k)", angle: -90, position: "insideLeft"}}
                      domain = {[0, 520.45]}
                    />
                    <Bar 
                      dataKey = "val" 
                      fill = {colors[1]}  
                    >
                      <LabelList dataKey = "name" angle = {90} position = "center" fontSize = {12}/>
                    </Bar>
                    <Tooltip />
                    </BarChart>
                  </center>
                )
                }
              </Paper>
            </Grid>


            <Grid item xs = {12} md = {8} lg = {12}>
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
                    </PieChart>
                  </center>
                )
                }
              </Paper>
            </Grid>


          </Grid>
        </Container>
      </main>
    </div>
  );
}
