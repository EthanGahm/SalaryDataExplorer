import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useStyles from "./UseStyles.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { csv } from 'd3';
import dataCSV from './CleanedData2021.csv';
import axios from 'axios';
import {RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, PieChart, Pie,
LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip, Legend, LabelList} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const data = [
  { name: "Computing or Tech", val: 5000, fill: colors[0] },
  { name: "Accounting, Banking & Finance", val: 7000, fill: colors[1] },
  { name: "Education (Higher Education)", val: 2000, fill: colors[2] },
];
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];

var numABF = 0; var avgABF = 0.0; var salABF = [];
var numAF = 0; var avgAF = 0.0; var salAF = [];
var numAD = 0; var avgAD = 0.0; var salAD = [];
var numBC = 0; var avgBC = 0.0; var salBC = [];
var numCT = 0; var avgCT = 0.0; var salCT = [];
var numEDU = 0; var avgEDU = 0.0; var salEDU = [];
var numEM = 0; var avgEM = 0.0; var salEM = [];
var numEnt = 0; var avgEnt = 0.0; var salEnt = [];
var numGPA = 0; var avgGPA = 0.0; var salGPA = [];
var numHC = 0; var avgHC = 0.0; var salHC = [];
var numHE = 0; var avgHE = 0.0; var salHE = [];
var numIns = 0; var avgIns = 0.0; var salIns = [];
var numLaw = 0; var avgLaw = 0.0; var salLaw = [];
var numLST = 0; var avgLST = 0.0; var salLST = [];
var numMAPR = 0; var avgMAPR = 0.0; var salMAPR = [];
var numMD = 0; var avgMD = 0.0; var salMD = [];
var numNonP = 0; var avgNonP = 0.0; var salNonP = [];
var numPC = 0; var avgPC = 0.0; var salPC = [];
var numRHR = 0; var avgRHR = 0.0; var salRHR = [];
var numRetail = 0; var avgRetail = 0.0; var salRetail = [];
var numSales = 0; var avgSales = 0.0; var salSales = [];
var numSW = 0; var avgSW = 0.0; var salSW = [];
var numTL = 0; var avgTL = 0.0; var salTL = [];
var numUT = 0; var avgUT = 0.0; var salUT = [];
var numPUB = 0; var avgPUB = 0.0; var salPUB = [];
var numRES = 0; var avgRES = 0.0; var salRES = [];
var numAER = 0; var avgAER = 0.0; var salAER = [];
var numLIB = 0; var avgLIB = 0.0; var salLIB = [];
var numFOOD = 0; var avgFOOD = 0.0; var salFOOD = [];
var numENG = 0; var avgENG = 0.0; var salENG = [];
var numENV = 0; var avgENV = 0.0; var salENV = [];
var numAR = 0; var avgAR = 0.0; var salAR = [];
var numO = 0; var avgO = 0.0; var salO = [];
var test1 = [];
var sal18 = []; var sal18t24 = []; var sal25t34 = []; var sal35t44 = []; 
var sal45t54 = []; var sal55t64 = []; var sal65 = [];
var avg18 = 0.0; var avg18t24 = 0.0;  var avg25t34 = 0.0; var avg35t44 = 0.0; var avg45t54 = 0.0;
var avg55t64 = 0.0; var avg65 = 0.0;
var highSchool = 0; var someCollege = 0; var college = 0; var masters = 0; var PhD = 0; var profD = 0;

export default function Graph() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  
  (async function google() {
    useEffect(() => {  
      csv(dataCSV).then(data => {
        data.pop(0);
        for (let i = 0; i < data.length; i++) {
          if (data[i].Age === 'under 18') {
            sal18.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Age === '18-24') {
            sal18t24.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Age === '25-34') {
            sal25t34.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Age === '35-44') {
            sal35t44.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Age === '45-54') {
            sal45t54.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Age === '55-64') {
            sal55t64.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Age === '65 or over') {
            sal65.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Accounting, Banking & Finance') {
            numABF++;
            salABF.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Agriculture or Forestry') {
            numAF++;
            salAF.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Art & Design') {
            numAD++;
            salAD.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Business or Consulting') {
            numBC++;
            salBC.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Computing or Tech') {
            numCT++;
            salCT.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Education') {
            numEDU++;
            salEDU.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Engineering or Manufacturing') {
            numEM++;
            salEM.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Entertainment') {
            numEnt++;
            salEnt.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Government and Public Administration') {
            numGPA++;
            salGPA.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Health care') {
            numHC++;
            salHC.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Hospitality & Events') {
            numHE++;
            salHE.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Insurance') {
            numIns++;
            salIns.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Law or Law Enforcement') {
            numLaw++;
            salLaw.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Leisure, Sport & Tourism') {
            numLST++;
            salLST.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Marketing, Advertising & PR') {
            numMAPR++;
            salMAPR.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Media & Digital') {
            numMD++;
            salMD.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Nonprofits') {
            numNonP++;
            salNonP.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Property or Construction') {
            numPC++;
            salPC.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Recruitment or HR') {
            numRHR++;
            salRHR.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Retail') {
            numRetail++;
            salRetail.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Sales') {
            numSales++;
            salSales.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Social Work') {
            numSW++;
            salSW.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Transport or Logistics') {
            numTL++;
            salTL.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Utilities & Telecommunications') {
            numUT++;
            salUT.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Publishing') {
            numPUB++;
            salPUB.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Research') {
            numRES++;
            salRES.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Aerospace') {
            numAER++;
            salAER.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Library') {
            numLIB++;
            salLIB.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Food') {
            numFOOD++;
            salFOOD.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Energy') {
            numENG++;
            salENG.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Environment') {
            numENV++;
            salENV.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Auto Repair') {
            numAR++;
            salAR.push(parseFloat(data[i].Annual_Salary));
          }
          if (data[i].Industry === 'Other') {
            numO++;
            salO.push(parseFloat(data[i].Annual_Salary));
          }

          if (data[i].Highest_Level_of_Education === 'High School') {
            highSchool++;
          }
          if (data[i].Highest_Level_of_Education === 'Some college') {
            someCollege++;
          }
          if (data[i].Highest_Level_of_Education === 'College degree') {
            college++;
          }
          if (data[i].Highest_Level_of_Education === "Master's degree") {
            masters++;
          }
          if (data[i].Highest_Level_of_Education === 'PhD') {
            PhD++;
          }
          if (data[i].Highest_Level_of_Education === 'Professional degree (MD, JD, etc.)') {
            profD++;
          }
        }

        var sumABF = 0.0;
        for (let i = 0; i < numABF; i++) {
          sumABF += salABF[i];
        }
        avgABF = sumABF / numABF / 1000;
        avgABF = avgABF.toFixed(2);
        var sumENG = 0.0;
        for (let i = 0; i < numENG; i++) {
          sumENG += salENG[i];
        }
        avgENG = sumENG / numENG / 1000;
        avgENG = avgENG.toFixed(2);
        var sumAF = 0.0;
        for (let i = 0; i < numAF; i++) {
          sumAF += salAF[i];
        }
        avgAF = sumAF / numAF / 1000;
        avgAF = avgAF.toFixed(2);
        var sumAD = 0.0;
        for (let i = 0; i < numAD; i++) {
          sumAD += salAD[i];
        }
        avgAD = sumAD / numAD / 1000;
        avgAD = avgAD.toFixed(2);
        var sumBC = 0.0;
        for (let i = 0; i < numBC; i++) {
          sumBC += salBC[i];
        }
        avgBC = sumBC / numBC / 1000;
        avgBC = avgBC.toFixed(2);
        var sumCT = 0.0;
        for (let i = 0; i < numCT; i++) {
          sumCT += salCT[i];
        }
        avgCT = sumCT / numCT / 1000;
        avgCT = avgCT.toFixed(2);
        var sumEDU = 0.0;
        for (let i = 0; i < numEDU; i++) {
          sumEDU += salEDU[i];
        }
        avgEDU = sumEDU / numEDU / 1000;
        avgEDU = avgEDU.toFixed(2);
        var sumEM = 0.0;
        for (let i = 0; i < numEM; i++) {
          sumEM += salEM[i];
        }
        avgEM = sumEM / numEM / 1000;
        avgEM = avgEM.toFixed(2);
        var sumEnt = 0.0;
        for (let i = 0; i < numEnt; i++) {
          sumEnt += salEnt[i];
        }
        avgEnt = sumEnt / numEnt / 1000;
        avgEnt = avgEnt.toFixed(2);
        var sumGPA = 0.0;
        for (let i = 0; i < numGPA; i++) {
          sumGPA += salGPA[i];
        }
        avgGPA = sumGPA / numGPA / 1000;
        avgGPA = avgGPA.toFixed(2);
        var sumHC = 0.0;
        for (let i = 0; i < numHC; i++) {
          sumHC += salHC[i];
        }
        avgHC = sumHC / numHC / 1000;
        avgHC = avgHC.toFixed(2);
        var sumHE = 0.0;
        for (let i = 0; i < numHE; i++) {
          sumHE += salHE[i];
        }
        avgHE = sumHE / numHE / 1000;
        avgHE = avgHE.toFixed(2);
        var sumIns = 0.0;
        for (let i = 0; i < numIns; i++) {
          sumIns += salIns[i];
        }
        avgIns = sumIns / numIns / 1000;
        avgIns = avgIns.toFixed(2);
        var sumLaw = 0.0;
        for (let i = 0; i < numLaw; i++) {
          sumLaw += salLaw[i];
        }
        avgLaw = sumLaw / numLaw / 1000;
        avgLaw = avgLaw.toFixed(2);
        var sumLST = 0.0;
        for (let i = 0; i < numLST; i++) {
          sumLST += salLST[i];
        }
        avgLST = sumLST / numLST / 1000;
        avgLST = avgLST.toFixed(2);
        var sumMAPR = 0.0;
        for (let i = 0; i < numMAPR; i++) {
          sumMAPR += salMAPR[i];
        }
        avgMAPR = sumMAPR / numMAPR / 1000;
        avgMAPR = avgMAPR.toFixed(2);
        var sumMD = 0.0;
        for (let i = 0; i < numMD; i++) {
          sumMD += salMD[i];
        }
        avgMD = sumMD / numMD / 1000;
        avgMD = avgMD.toFixed(2);
        var sumNonP = 0.0;
        for (let i = 0; i < numNonP; i++) {
          sumNonP += salNonP[i];
        }
        avgNonP = sumNonP / numNonP / 1000;
        avgNonP = avgNonP.toFixed(2);
        var sumPC = 0.0;
        for (let i = 0; i < numPC; i++) {
          sumPC += salPC[i];
        }
        avgPC = sumPC / numPC / 1000;
        avgPC = avgPC.toFixed(2);
        var sumRHR = 0.0;
        for (let i = 0; i < numRHR; i++) {
          sumRHR += salRHR[i];
        }
        avgRHR = sumRHR / numRHR / 1000;
        avgRHR = avgRHR.toFixed(2);
        var sumRetail = 0.0;
        for (let i = 0; i < numRetail; i++) {
          sumRetail += salRetail[i];
        }
        avgRetail = sumRetail / numRetail / 1000;
        avgRetail = avgRetail.toFixed(2);
        var sumSales = 0.0;
        for (let i = 0; i < numSales; i++) {
          sumSales += salSales[i];
        }
        avgSales = sumSales / numSales / 1000;
        avgSales = avgSales.toFixed(2);
        var sumSW = 0.0;
        for (let i = 0; i < numSW; i++) {
          sumSW += salSW[i];
        }
        avgSW = sumSW / numSW / 1000;
        avgSW = avgSW.toFixed(2);
        var sumTL = 0.0;
        for (let i = 0; i < numTL; i++) {
          sumTL += salTL[i];
        }
        avgTL = sumTL / numTL / 1000;
        avgTL = avgTL.toFixed(2);
        var sumUT = 0.0;
        for (let i = 0; i < numUT; i++) {
          sumUT += salUT[i];
        }
        avgUT = sumUT / numUT / 1000;
        avgUT = avgUT.toFixed(2);
        var sumPUB = 0.0;
        for (let i = 0; i < numPUB; i++) {
          sumPUB += salPUB[i];
        }
        avgPUB = sumPUB / numPUB / 1000;
        avgPUB = avgPUB.toFixed(2);
        var sumRES = 0.0;
        for (let i = 0; i < numRES; i++) {
          sumRES += salRES[i];
        }
        avgRES = sumRES / numRES / 1000;
        avgRES = avgRES.toFixed(2);
        var sumAER = 0.0;
        for (let i = 0; i < numAER; i++) {
          sumAER += salAER[i];
        }
        avgAER = sumAER / numAER / 1000;
        avgAER = avgAER.toFixed(2);
        var sumLIB = 0.0;
        for (let i = 0; i < numLIB; i++) {
          sumLIB += salLIB[i];
        }
        avgLIB = sumLIB / numLIB / 1000;
        avgLIB = avgLIB.toFixed(2);
        var sumFOOD = 0.0;
        for (let i = 0; i < numFOOD; i++) {
          sumFOOD += salFOOD[i];
        }
        avgFOOD = sumFOOD / numFOOD / 1000;
        avgFOOD = avgFOOD.toFixed(2);
        var sumENV = 0.0;
        for (let i = 0; i < numENV; i++) {
          sumENV += salENV[i];
        }
        avgENV = sumENV / numENV / 1000;
        avgENV = avgENV.toFixed(2);
        var sumAR = 0.0;
        for (let i = 0; i < numAR; i++) {
          sumAR += salAR[i];
        }
        avgAR = sumAR / numAR / 1000;
        avgAR = avgAR.toFixed(2);
        var sumO = 0.0;
        for (let i = 0; i < numO; i++) {
          sumO += salO[i];
        }
        avgO = sumO / numO / 1000;
        avgO = avgO.toFixed(2);

        var sum18 = 0.0;
        for (let i = 0; i < sal18.length; i++) {
          sum18 += sal18[i];
        }
        avg18 = sum18 / sal18.length / 1000;
        avg18 = avg18.toFixed(2);
        var sum18t24 = 0.0;
        for (let i = 0; i < sal18t24.length; i++) {
          sum18t24 += sal18t24[i];
        }
        avg18t24 = sum18t24 / sal18t24.length / 1000;
        avg18t24 = avg18t24.toFixed(2);
        var sum25t34 = 0.0;
        for (let i = 0; i < sal25t34.length; i++) {
          sum25t34 += sal25t34[i];
        }
        avg25t34 = sum25t34 / sal25t34.length / 1000;
        avg25t34 = avg25t34.toFixed(2);
        var sum35t44 = 0.0;
        for (let i = 0; i < sal35t44.length; i++) {
          sum35t44 += sal35t44[i];
        }
        avg35t44 = sum35t44 / sal35t44.length / 1000;
        avg35t44 = avg35t44.toFixed(2);
        var sum45t54 = 0.0;
        for (let i = 0; i < sal45t54.length; i++) {
          sum45t54 += sal45t54[i];
        }
        avg45t54 = sum45t54 / sal45t54.length / 1000;
        avg45t54 = avg45t54.toFixed(2);
        var sum55t64 = 0.0;
        for (let i = 0; i < sal55t64.length; i++) {
          sum55t64 += sal55t64[i];
        }
        avg55t64 = sum55t64 / sal55t64.length / 1000;
        avg55t64 = avg55t64.toFixed(2);
        var sum65 = 0.0;
        for (let i = 0; i < sal65.length; i++) {
          sum65 += sal65[i];
        }
        avg65 = sum65 / sal65.length / 1000;
        avg65 = avg65.toFixed(2);

        data1.push({ name: "Energy", val: numENG});
        data1.push({ name: "Agriculture or Forestry", val: numAF });
        data1.push({ name: "Art & Design", val: numAD });
        data1.push({ name: "Business or Consulting", val: numBC });
        data1.push({ name: "Computing or Tech", val: numCT });
        data1.push({ name: "Education", val: numEDU });
        data1.push({ name: "Engineering or Manufacturing", val: numEM });
        data1.push({ name: "Entertainment", val: numEnt });
        data1.push({ name: "Government and Public Admin", val: numGPA });
        data1.push({ name: "Health Care", val: numHC });
        data1.push({ name: "Hospitality & Events", val: numHE });
        data1.push({ name: "Insurance", val: numIns });
        data1.push({ name: "Law or Law Enforcement", val: numLaw });
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
        data1.push({ name: "Publishing", val: numPUB});
        data1.push({ name: "Research", val: numRES});
        data1.push({ name: "Aerospace", val: numAER});
        data1.push({ name: "Library", val: numLIB});
        data1.push({ name: "Food", val: numFOOD});
        data1.push({ name: "Accounting, Banking & Finance", val: numABF });
        data1.push({ name: "Environment", val: numENV});
        data1.push({ name: "Auto Repair", val: numAR});
        data1.push({ name: "Other", val: numO});

        data2.push({ name: "Energy", val: avgENG});
        data2.push({ name: "Agriculture or Forestry", val: avgAF});
        data2.push({ name: "Art & Design", val: avgAD });
        data2.push({ name: "Business or Consulting", val: avgBC  });
        data2.push({ name: "Computing or Tech", val: avgCT  });
        data2.push({ name: "Education", val: avgEDU  });
        data2.push({ name: "Engineering or Manufacturing", val: avgEM  });
        data2.push({ name: "Entertainment", val: avgEnt  });
        data2.push({ name: "Government and Public Admin", val: avgGPA  });
        data2.push({ name: "Health Care", val: avgHC });
        data2.push({ name: "Hospitality & Events", val: avgHE  });
        data2.push({ name: "Insurance", val: avgIns});
        data2.push({ name: "Law or Law Enforcement", val: avgLaw  });
        data2.push({ name: "Leisure, Sport & Tourism", val: avgLST  });
        data2.push({ name: "Marketing, Advertising & PR", val: avgMAPR });
        data2.push({ name: "Media & Digital", val: avgMD  });
        data2.push({ name: "Nonprofits", val: avgNonP  });
        data2.push({ name: "Property or Construction", val: avgPC  });
        data2.push({ name: "Recruitment or HR", val: avgRHR  });
        data2.push({ name: "Retail", val: avgRetail });
        data2.push({ name: "Sales", val: avgSales });
        data2.push({ name: "Social Work", val: avgSW });
        data2.push({ name: "Transport or Logistics", val: avgTL  });
        data2.push({ name: "Utilities & Telecommunications", val: avgUT });
        data2.push({ name: "Publishing", val: avgPUB });
        data2.push({ name: "Research", val: avgRES });
        data2.push({ name: "Aerospace", val: avgAER});
        data2.push({ name: "Library", val: avgLIB});
        data2.push({ name: "Food", val: avgFOOD });
        data2.push({ name: "Accounting, Banking & Finance", val: avgABF  });
        data2.push({ name: "Environment", val: avgENV});
        data2.push({ name: "Auto Repair", val: avgAR });
        data2.push({ name: "Other", val: avgO });

        data3.push({ name: "High School", val: highSchool, fill: "#009900" });
        data3.push({ name: "Some College", val: someCollege, fill: "#CCCC00" });
        data3.push({ name: "College Degree", val: college, fill: "#FF0000" });
        data3.push({ name: "Master's Degree", val: masters, fill: "#3333FF" });
        data3.push({ name: "PhD", val: PhD, fill: "#00CCCC" });
        data3.push({ name: "Professional degree (MD, JD, etc.)", val: profD, fill: "#FF00FF" });
        
        data4.push({ age: "under 18", val: avg18});
        data4.push({ age: "18-24", val: avg18t24});
        data4.push({ age: "25-34", val: avg25t34});
        data4.push({ age: "35-44", val: avg35t44});
        data4.push({ age: "45-54", val: avg45t54});
        data4.push({ age: "55-64", val: avg55t64});
        data4.push({ age: "65 or over", val: avg65});
        // setIsLoaded(true);
      });
    }, []);

    var response = await axios.get('http://localhost:5000/api/salary_data/numALL')
    test1 = response.data;
    setIsLoaded(true);
  })();
  if (isLoaded) {
    console.log(test1);
    // console.log(test2.length);
    // console.log(data1);
  }
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
                      innerRadius={100}
                      outerRadius={270}
                      width={1000}
                      height={600}
                      data={test1}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" fontSize = {12} />
                      <PolarRadiusAxis angle={30} domain={[0, 4500]} />
                      <Radar
                        name="People"
                        dataKey="val"
                        fill={colors[2]}
                        fillOpacity={0.5}
                      >
                        <LabelList dataKey = "val" position = "insideStart" angle = {0} />
                      </Radar>
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
                    <XAxis dataKey = "name"/>
                    <YAxis 
                      label = {{value: "Salary ($k)", angle: -90, position: "insideLeft"}}
                      domain = {[0, 150]}
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
                      <XAxis dataKey="age" padding={{ left: 10, right: 10 }}>
                        <Label value = "Age" offset={-15} position="insideBottom" />
                      </XAxis>
                      <Tooltip />
                      <YAxis label = {{value: "Salary $k", angle: -90, position: "insideLeft"}} 
                      domain = {[0, 120]}/>
                      <Line type="monotone" dataKey="val" fill = {colors[0]} />
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
