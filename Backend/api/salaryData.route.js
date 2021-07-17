import express from "express";
import Ctrl2021 from "./controller.2021.js";
import Controller2019 from "./controller.2019.js";

/**
 * This file contains all the routes to the endpoints for our API.
 There are two controllers,one from the 2021 collection and one from
  the 2019 collection in our SalaryData database on MongoDB.
 */

const router = express.Router();

//default route
router.route("/").get((req, res) => res.send("hello world"));
// all 2021 values
router.route("/collection_2021").get(Ctrl2021.apiGetCollection2021);
// this route returns all the values from the 2021 collection
router.route("/all_2021").get(Ctrl2021.apiGetAllData);
// this route gets all of the summary stats needed from the 2021 collection
router.route("/allRaw_2021").get(Ctrl2021.apiGetAllSummaryData);

// this route returns the list of industries from the 2021 collection

router.route("/industries").get(Ctrl2021.apiGetIndustries);
// this route returns the list of countries from the 2021 collection
router.route("/countries").get(Ctrl2021.apiGetCountries);
// this route returns the list of cities from the 2021 collection
router.route("/cities").get(Ctrl2021.apiGetCities);
// this route returns the list of states from the 2021 collection
router.route("/states").get(Ctrl2021.apiGetStates);
// this route returns the list of races from the 2021 dataset
router.route("/races").get(Ctrl2021.apiGetRaces);
// this route returns the list of work experience from the 2021 dataset
router.route("/work_exp").get(Ctrl2021.apiGetWorkExp);
// this route returns the list of education from the 2021 dataset
router.route("/education").get(Ctrl2021.apiGetEducation);
// returns the overall count and count by gender for each industry in the 2021 dataset
router.route("/numALL").get(Ctrl2021.apiGetNumALL);
// returns the average salary by degree/ highest level of education in the 2021 collection
router.route("/degrees").get(Ctrl2021.apiGetDegrees);
// returns the count by level of education in the 2021 collection
router.route("/disDegrees").get(Ctrl2021.apiGetDisDegrees);
// returns the average salary by each industry in the 2021 collection
router.route("/salaries").get(Ctrl2021.apiGetSalaries);
// returns the average salary by age group in the 2021 collection
router.route("/ages").get(Ctrl2021.apiGetAge);
// returns the top three industries with the highest median salaries from the 2021 collection
router.route("/top_salaries").get(Ctrl2021.apiGetTop3Salaries);
// returns the median salary by age group in the 2021 collection
router.route("/median_ages").get(Ctrl2021.apiGetAgesMedSal);
// returns the median salary by age group in the 2021 collection
router.route("/median_salary").get(Ctrl2021.apiGetMedianSalary);
// returns the count of people by age in the 2021 collection
router.route("/disAge").get(Ctrl2021.apiGetDisAge);
// returns the count of people by gender in the 2021 collection
router.route("/gender").get(Ctrl2021.apiGetGender);
// returns the distinct races in the 2021 collection
router.route("/race").get(Ctrl2021.apiGetRace);
// returns the distribution of salaries by race in the 2021 collection
router.route("/disRace").get(Ctrl2021.apiGetDisRace);
// returns the distinct work experience ranges  in the 2021 collection
router.route("/work").get(Ctrl2021.apiGetWork);
// returns the top / most listed countries in the 2021 collection
router.route("/topCountries").get(Ctrl2021.apiGetTopCountries);
// adds a new document/response to the 2021 collection
router.route("/addResponse").post(Ctrl2021.apiAddResponse);
// all 2019 values
router.route("/collection_2019").get(Controller2019.apiGetCollection2019);
// this route returns all the values from the 2019 collection
router.route("/all_2019").get(Controller2019.apiGetAllData);
// returns the count by industry of entries in the 2019 collection
router.route("/2019_numALL").get(Controller2019.apiGetNumALL);
// returns the top three industries with the highest median salaries from the 2019 collection
router.route("/2019_top_salaries").get(Controller2019.apiGet2019Salaries);
// returns the overall median from the 2019 collection
router.route("/2019_median_salary").get(Controller2019.apiGetMedianSalary);
// returns the median salary by age group in the 2019 collection
router.route("/2019_median_ages").get(Controller2019.apiGetAgesMedSal);

export default router;
