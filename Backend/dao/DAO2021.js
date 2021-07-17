import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;
import median from "../helperMethods/median.js";
import compareSecondColumn from "../helperMethods/lists.js";
import dotenv from "dotenv";
import fs from "fs";

let salaryData;

export default class DAO2021 {
  /**
   *
   * @param {*} conn - used to establish a connection to the MongoDB database our team is using.
   * @returns if successfull, a connection to the specified database using our credentials stored in a .env file
   */
  static async injectDB(conn) {
    if (salaryData) {
      return;
    }

    try {
      salaryData = await conn
        .db(process.env.SALARYDATA_NS)
        .collection("Data_2021");
    } catch (e) {
      console.error(`Unable to establish a collection handle in DAO2021: ${e}`);
    }
  }

  /**
   *  This method gathers all of the data from our database and displays it. It is meant to be read in on our frontend as a JSON object
   *  to be used in acquiring data to display in a table.
   *  @returns all of the data from our database
   */

  static async getAllData({ filters, page, rowsPerPage } = {}) {
    let query;
    var filtered = [];

    if (
      filters &&
      Object.keys(filters).length === 0 &&
      filters.constructor === Object
    ) {
      query;
    } else {
      if ("Industry" in filters) {
        filtered.push({ Industry: { $eq: filters["Industry"] } });
      }
      if ("Gender" in filters) {
        filtered.push({ Gender: { $eq: filters["Gender"] } });
      }
      if ("Country" in filters) {
        filtered.push({ Country: { $eq: filters["Country"] } });
      }
      if ("City" in filters) {
        filtered.push({ City: { $eq: filters["City"] } });
      }
      if ("Age" in filters) {
        filtered.push({ Age: { $eq: filters["Age"] } });
      }
      if ("State" in filters) {
        filtered.push({ State: { $eq: filters["State"] } });
      }
      if ("Race" in filters) {
        var raceList = filters["Race"].split(",");
        for (const race of raceList) {
          filtered.push({ Race: { $regex: race } });
        }
      }
      if ("Work_Experience" in filters) {
        filtered.push({ Work_Experience: { $eq: filters["Work_Experience"] } });
      }
      if ("Highest_Level_of_Education" in filters) {
        filtered.push({
          Highest_Level_of_Education: {
            $eq: filters["Highest_Level_of_Education"],
          },
        });
      }
      query = { $and: filtered };
    }

    let cursor;

    try {
      cursor = await salaryData.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { rowsList: [], totalNumRows: 0 };
    }

    const displayCursor = cursor.limit(rowsPerPage).skip(rowsPerPage * page);

    try {
      const rowsList = await displayCursor.toArray();
      const totalNumRows = await cursor.count();
      return { rowsList, totalNumRows };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { rowsList: [], totalNumRows: 0 };
    }
  }
  /**
   *  This method gathers all of the raw data from our database and displays it. It is meant to be read in on our frontend as a JSON object
   *  to be used in acquiring data for analysis.
   *  @returns all of the data from our database
   */
  static async getAllSummaryData({ filters } = {}) {
    let query;
    var filtered = [];

    if (
      filters &&
      Object.keys(filters).length === 0 &&
      filters.constructor === Object
    ) {
      query;
    } else {
      if ("Industry" in filters) {
        filtered.push({ Industry: { $eq: filters["Industry"] } });
      }
      if ("Gender" in filters) {
        filtered.push({ Gender: { $eq: filters["Gender"] } });
      }
      if ("Country" in filters) {
        filtered.push({ Country: { $eq: filters["Country"] } });
      }
      if ("City" in filters) {
        filtered.push({ City: { $eq: filters["City"] } });
      }
      if ("Age" in filters) {
        filtered.push({ Age: { $eq: filters["Age"] } });
      }
      if ("State" in filters) {
        filtered.push({ State: { $eq: filters["State"] } });
      }
      if ("Race" in filters) {
        var raceList = filters["Race"].split(",");
        for (const race of raceList) {
          filtered.push({ Race: { $regex: race } });
        }
      }
      if ("Work_Experience" in filters) {
        filtered.push({ Work_Experience: { $eq: filters["Work_Experience"] } });
      }
      if ("Highest_Level_of_Education" in filters) {
        filtered.push({
          Highest_Level_of_Education: {
            $eq: filters["Highest_Level_of_Education"],
          },
        });
      }
      query = { $and: filtered };
    }

    let cursor;

    try {
      cursor = await salaryData.find(query);

      var salary = [
        {
          $match: query,
        },
        {
          $group: {
            _id: "$Industry",
            salary: {
              $avg: "$Annual_Salary",
            },
          },
        },
        {
          $sort: {
            salary: -1,
          },
        },
        {
          $limit: 3,
        },
      ];
      var agg1 = salaryData.aggregate(salary);
      var salaries = [];
      await agg1.forEach((ind) => {
        ind.salary /= 1000;
        ind.salary = ind.salary.toFixed(2);
        salaries.push(ind);
      });

      var count = [
        {
          $match: query,
        },
        {
          $group: {
            _id: "$Industry",
            val: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            val: -1,
          },
        },
        {
          $limit: 3,
        },
      ];
      var agg2 = salaryData.aggregate(count);
      var popular = [];
      await agg2.forEach((ind) => {
        popular.push(ind);
      });

      var degree = [
        {
          $match: query,
        },
        {
          $group: {
            _id: "$Highest_Level_of_Education",
            val: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            val: -1,
          },
        },
        {
          $limit: 1,
        },
      ];
      var agg3 = salaryData.aggregate(degree);
      var common = [];
      await agg3.forEach((ind) => {
        common.push(ind);
      });

      const rowsList = await cursor.toArray();
      const totalNumRows = await cursor.count();
      const salaryList = [];
      const pinLocations = [];
      const ages = [];

      for (var i = 0; i < totalNumRows; i++) {
        // Gathers location string from each selected row of the database for city, state, and country variables
        var tempAges = rowsList[i].Age;

        // Gathers address string from each selected row of the database
        var tempAddress = rowsList[i].address;
        var latlngPair = [];
        // Gathers lat and lng value from selected row of the database
        var lat = parseFloat(rowsList[i].Lat);
        var lng = parseFloat(rowsList[i].Lng);
        // Checks for undefined values within database and replaces them with an empty string

        // removes Nan values and whitespace from the address
        var newAddress = String(tempAddress);
        var cleanAddress = newAddress.replace("Nan", "");
        cleanAddress = cleanAddress.replace(/\s+/g, " ").trim();

        if (
          cleanAddress != "Null" &&
          lat != String(null) &&
          lng != String(null)
        ) {
          latlngPair.push(lat);
          latlngPair.push(lng);
          latlngPair.push(cleanAddress);
        }

        pinLocations.push(latlngPair);

        if (tempAges == "under 18") {
          tempAges = 16;
        }
        if (tempAges == "18-24") {
          tempAges = 21;
        }
        if (tempAges == "25-34") {
          tempAges = 29.5;
        }
        if (tempAges == "35-44") {
          tempAges = 39.5;
        }
        if (tempAges == "45-54") {
          tempAges = 49.5;
        }
        if (tempAges == "55-64") {
          tempAges = 59.5;
        }
        if (tempAges == "65 or over") {
          tempAges = 72;
        }
        ages.push(tempAges);

        // Gather salary from each selected row of the database
        const tempSalary = parseFloat(rowsList[i].Annual_Salary);
        salaryList.push(tempSalary);
      }

      // Calculates sum of selected rows
      var sum = 0.0;
      for (let i = 0; i < salaryList.length; i++) {
        if (salaryList[i] != null) {
          sum += salaryList[i];
        }
      }

      const meanSalary = (sum / salaryList.length).toFixed(2);
      const medianSalary = median(salaryList).toFixed(2);
      const topSalary = Math.max.apply(Math, salaryList).toFixed(2);
      const botSalary = Math.min.apply(Math, salaryList).toFixed(2);
      var sumAge = 0.0;
      for (let i = 0; i < ages.length; i++) {
        sumAge += ages[i];
      }
      const avgAge = (sumAge / ages.length).toFixed(2);

      return {
        meanSalary,
        medianSalary,
        pinLocations,
        topSalary,
        botSalary,
        avgAge,
        salaries,
        popular,
        common,
      };
    } catch (e) {
      // When no filter is selected, no match is pipeline stage is needed
      cursor = await salaryData.find(query);
      var salary = [
        {
          $group: {
            _id: "$Industry",
            salary: {
              $avg: "$Annual_Salary",
            },
          },
        },
        {
          $sort: {
            salary: -1,
          },
        },
        {
          $limit: 3,
        },
      ];
      var agg = salaryData.aggregate(salary);
      var salaries = [];
      await agg.forEach((ind) => {
        ind.salary /= 1000;
        ind.salary = ind.salary.toFixed(2);
        salaries.push(ind);
      });

      var count = [
        {
          $group: {
            _id: "$Industry",
            val: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            val: -1,
          },
        },
        {
          $limit: 3,
        },
      ];
      var agg2 = salaryData.aggregate(count);
      var popular = [];
      await agg2.forEach((ind) => {
        popular.push(ind);
      });

      var degree = [
        {
          $group: {
            _id: "$Highest_Level_of_Education",
            val: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            val: -1,
          },
        },
        {
          $limit: 1,
        },
      ];
      var agg3 = salaryData.aggregate(degree);
      var common = [];
      await agg3.forEach((ind) => {
        common.push(ind);
      });

      const rowsList = await cursor.toArray();
      const totalNumRows = await cursor.count();
      const salaryList = [];
      const pinLocations = [];
      const ages = [];

      for (var i = 0; i < totalNumRows; i++) {
        // Gathers location string from each selected row of the database for city, state, and country variables
        var tempAges = rowsList[i].Age;

        // Gathers address string from each selected row of the database
        var tempAddress = rowsList[i].address;
        var latlngPair = [];
        // Gathers lat and lng value from selected row of the database
        var lat = parseFloat(rowsList[i].Lat);
        var lng = parseFloat(rowsList[i].Lng);
        // Checks for undefined values within database and replaces them with an empty string
        if (lat == undefined) {
          lat = "";
        }
        if (lng == undefined) {
          lng = "";
        }

        // removes Nan values and whitespace from the address
        let newAddress = String(tempAddress);
        var cleanAddress = newAddress.replace("Nan", "");
        cleanAddress = cleanAddress.replace(/\s+/g, " ").trim();

        latlngPair.push(lat);
        latlngPair.push(lng);
        latlngPair.push(cleanAddress);
        pinLocations.push(latlngPair);

        if (tempAges == "under 18") {
          tempAges = 16;
        }
        if (tempAges == "18-24") {
          tempAges = 21;
        }
        if (tempAges == "25-34") {
          tempAges = 29.5;
        }
        if (tempAges == "35-44") {
          tempAges = 39.5;
        }
        if (tempAges == "45-54") {
          tempAges = 49.5;
        }
        if (tempAges == "55-64") {
          tempAges = 59.5;
        }
        if (tempAges == "65 or over") {
          tempAges = 72;
        }
        ages.push(tempAges);

        // Gather salary from each selected row of the database
        const tempSalary = parseFloat(rowsList[i].Annual_Salary);
        salaryList.push(tempSalary);
      }

      // Calculates sum of selected rows
      var sum = 0.0;
      for (let i = 0; i < salaryList.length; i++) {
        if (salaryList[i] != null) {
          sum += salaryList[i];
        }
      }

      const meanSalary = (sum / salaryList.length).toFixed(2);
      const medianSalary = median(salaryList).toFixed(2);
      const topSalary = Math.max.apply(Math, salaryList).toFixed(2);
      const botSalary = Math.min.apply(Math, salaryList).toFixed(2);
      var sumAge = 0.0;
      for (let i = 0; i < ages.length; i++) {
        sumAge += ages[i];
      }
      const avgAge = (sumAge / ages.length).toFixed(2);
      return {
        meanSalary,
        medianSalary,
        pinLocations,
        topSalary,
        botSalary,
        avgAge,
        salaries,
        popular,
        common,
      };
    }
  }

  /*
   * This method grabs the unique entries for industry from the 2021 collection
   * @returns the list of industries from the dataset
   */

  static async getIndustries() {
    let industries = [];
    try {
      industries = await salaryData.distinct("Industry");
      return industries;
    } catch (e) {
      console.error(`Unable to get industries, ${e}`);
      return industries;
    }
  }
  /**
   * This method grabs the distinct entries for countries in the 2021 dataset
   * @returns the list of countries from the dataset
   */
  static async getCountries() {
    let countries = [];
    try {
      countries = await salaryData.distinct("Country");
      return countries;
    } catch (e) {
      console.error(`Unable to get countries, ${e}`);
      return countries;
    }
  }
  /**
   * This method grabs the distinct entries for race in the 2021 dataset
   * @returns the list of races from the dataset
   */
  static async getRaces() {
    let races = [];
    try {
      races = await salaryData.distinct("Race");
      return races;
    } catch (e) {
      console.error(`Unable to get cities, ${e}`);
      return races;
    }
  }

  /**
   * This method grabs the distinct entries for work experience in the 2021 dataset
   * @returns the list of work experience from the dataset
   */
  static async getWorkExp() {
    let work_exp = [];
    try {
      work_exp = await salaryData.distinct("Work_Experience");
      return work_exp;
    } catch (e) {
      console.error(`Unable to get cities, ${e}`);
      return work_exp;
    }
  }

  /**
   * This method grabs the distinct entries for education in the 2021 dataset
   * @returns the list of educationfrom the dataset
   */
  static async getEducation() {
    let education = [];
    try {
      education = await salaryData.distinct("Highest_Level_of_Education");
      return education;
    } catch (e) {
      console.error(`Unable to get cities, ${e}`);
      return education;
    }
  }

  /**
   * This method grabs the distinct entries for cities in the 2021 dataset
   * @returns the list of cities from the dataset
   */
  static async getCities() {
    let cities = [];
    try {
      cities = await salaryData.distinct("City");
      return cities;
    } catch (e) {
      console.error(`Unable to get cities, ${e}`);
      return cities;
    }
  }
  /**
   * This method grabs the distinct entries for states in the 2021 dataset
   * @returns the list of states from the dataset
   */
  static async getStates() {
    let states = [];
    try {
      states = await salaryData.distinct("State");
      return states;
    } catch (e) {
      console.error(`Unable to get industries, ${e}`);
      return industries;
    }
  }
  /**
   * This method gets all the distinct industries and then for each industry find the overall count and the count by gender in the 2021 colleciton.
   * @returns overall counts and count by gender for each industry in the datset.
   */
  static async getNumALL() {
    let industries = [];
    let numbers = [];
    try {
      industries = await salaryData.distinct("Industry");
      for (let i = 0; i < industries.length; i++) {
        numbers.push({
          name: industries[i],
          all: await salaryData.countDocuments({ Industry: industries[i] }),
          man: await salaryData.countDocuments({
            Gender: "Man",
            Industry: industries[i],
          }),
          woman: await salaryData.countDocuments({
            Gender: "Woman",
            Industry: industries[i],
          }),
          non_binary: await salaryData.countDocuments({
            Gender: "Non-binary",
            Industry: industries[i],
          }),
          other: await salaryData.countDocuments({
            Gender: "Other or prefer not to answer",
            Industry: industries[i],
          }),
        });
      }
      return numbers;
    } catch (e) {
      console.error(`Unable to get industries, ${e}`);
      return numbers;
    }
  }
  /**
   * This method gets the average salary by industry in the 2021 dataset
   * @returns average industry by industry in the dataset
   */
  static async getSalaries() {
    try {
      var salary = [
        {
          $group: {
            _id: "$Industry",
            salary: {
              $avg: "$Annual_Salary",
            },
          },
        },
      ];
      var agg = await salaryData.aggregate(salary);
      var salaries = [];
      await agg.forEach((ind) => {
        ind.salary /= 1000;
        ind.salary = ind.salary.toFixed(2);
        salaries.push(ind);
      });
      return salaries;
    } catch (e) {
      console.error(`Unable to get average salaries, ${e}`);
    }
  }
  /**
   * Gets the average salary for each type of education level in the 2021 collection
   * @returns average salary per age group
   */
  static async getDegrees() {
    try {
      var degree = [
        {
          $group: {
            _id: "$Highest_Level_of_Education",
            salary: {
              $avg: "$Annual_Salary",
            },
          },
        },
      ];
      var agg = await salaryData.aggregate(degree);
      var degrees = [];
      await agg.forEach((ind) => {
        ind.salary /= 1000;
        ind.salary = ind.salary.toFixed(2);
        degrees.push(ind);
      });
      for (let i = 0; i < degrees.length; i++) {
        if (degrees[i]._id === "") {
          degrees[i]._id = "Other";
        }
      }
      return degrees;
    } catch (e) {
      console.error(`Unable to get degrees, ${e}`);
    }
  }
  /**
   * This method returns the count of people that have received the type of degree from the 2021 collection
   * @returns degree types and the respective count of people
   */
  static async getDisDegrees() {
    let degrees = [];
    let numbers = [];
    try {
      degrees = await salaryData.distinct("Highest_Level_of_Education");
      for (let i = 0; i < degrees.length; i++) {
        numbers.push({
          _id: degrees[i],
          val: await salaryData.countDocuments({
            Highest_Level_of_Education: degrees[i],
          }),
        });
      }
      for (let i = 0; i < numbers.length; i++) {
        if (numbers[i]._id === "") {
          numbers[i]._id = "Other";
        }
      }
      return numbers;
    } catch (e) {
      console.error(`Unable to get distribution of degrees, ${e}`);
      return numbers;
    }
  }
  /**
   * This method returns the average salary per age group in the 2021 collection
   * @returns each age group and its respective average salary
   */
  static async getAge() {
    try {
      var age = [
        {
          $group: {
            _id: "$Age",
            salary: {
              $avg: "$Annual_Salary",
            },
          },
        },
      ];
      var agg = await salaryData.aggregate(age);
      var ages = [];
      await agg.forEach((ind) => {
        ind.salary /= 1000;
        ind.salary = ind.salary.toFixed(2);
        ages.push(ind);
      });
      return ages;
    } catch (e) {
      console.error(`Unable to get ages, ${e}`);
    }
  }
  /**
   * This method gets the counts of each age group in the 2021 collection
   * @returns age groups and the respective counts
   */
  static async getDisAge() {
    try {
      var disAge = [
        {
          $group: {
            _id: "$Age",
            val: {
              $sum: 1,
            },
          },
        },
      ];
      var agg = await salaryData.aggregate(disAge);
      var disAges = [];
      await agg.forEach((ind) => {
        disAges.push(ind);
      });
      return disAges;
    } catch (e) {
      console.error(`Unable to get the distribution of ages, ${e}`);
    }
  }
  /**
   * This method gets the average salary by gender in the 2021 collection
   * @returns each gender group and its average salary
   */
  static async getGender() {
    try {
      var gender = [
        {
          $group: {
            _id: "$Gender",
            salary: {
              $avg: "$Annual_Salary",
            },
            val: {
              $sum: 1,
            },
          },
        },
      ];
      var agg = await salaryData.aggregate(gender);
      var genders = [];
      await agg.forEach((ind) => {
        ind.salary /= 1000;
        ind.salary = ind.salary.toFixed(2);
        genders.push(ind);
      });
      return genders;
    } catch (e) {
      console.error(`Unable to get gender salary data, ${e}`);
    }
  }

  static async getRace() {
    try {
      var race = [
        {
          $project: {
            races: {
              $split: ["$Race", ", "],
            },
            salary: "$Annual_Salary",
          },
        },
        {
          $unwind: "$races",
        },
        {
          $group: {
            _id: "$races",
            salary: {
              $avg: "$salary",
            },
            val: {
              $sum: 1,
            },
          },
        },
      ];
      var agg = await salaryData.aggregate(race);
      var races = [];

      await agg.forEach((ind) => {
        if (
          ind._id === "Another option not listed here or prefer not to answer"
        ) {
          ind._id = "Other or prefer not to answer";
        }

        ind.salary /= 1000;
        ind.salary = ind.salary.toFixed(2);
        races.push(ind);
      });
      return races;
    } catch (e) {
      console.error(`Unable to get race data, ${e}`);
    }
  }

  static async getDisRace() {
    try {
      var disRace = [
        {
          $group: {
            _id: "$Race",
            val: {
              $sum: 1,
            },
          },
        },
      ];
      var agg = await salaryData.aggregate(disRace);
      var disRaces = [];
      await agg.forEach((ind) => {
        disRaces.push(ind);
      });
      return disRaces;
    } catch (e) {
      console.error(`Unable to get distribution of race, ${e}`);
    }
  }

  static async getWork() {
    try {
      var work = [
        {
          $group: {
            _id: "$Work_Experience",
            salary: {
              $avg: "$Annual_Salary",
            },
            val: {
              $sum: 1,
            },
          },
        },
      ];
      var agg = await salaryData.aggregate(work);
      var works = [];
      await agg.forEach((ind) => {
        ind.salary /= 1000;
        ind.salary = ind.salary.toFixed(2);
        works.push(ind);
      });
      return works;
    } catch (e) {
      console.error(`Unable to get work experience, ${e}`);
    }
  }

  static async getTopCountries() {
    try {
      var country = [
        {
          $group: {
            _id: "$Country",
            val: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            val: -1,
          },
        },
        {
          $limit: 10,
        },
      ];
      var agg = await salaryData.aggregate(country);
      var countries = [];
      await agg.forEach((ind) => {
        countries.push(ind);
      });
      return countries;
    } catch (e) {
      console.error(`Unable to get top countries, ${e}`);
    }
  }

  /**
   * This method returns the top 3 median salaries by industry for the entire 2021 collection using aggregation
   * @returns the top 3 median salaries and their corresponding industries
   */
  // used this website for the aggregation code for median : https://www.compose.com/articles/mongo-metrics-finding-a-happy-median/
  static async getTop3Salaries2021() {
    try {
      var salaries = await salaryData.aggregate([
        {
          $group: {
            _id: "$Industry",
            salary: {
              $push: "$Annual_Salary",
            },
          },
        },
      ]);

      var s = [];
      await salaries.forEach((ind) => {
        var x = median(ind.salary);
        x = Math.round(x);
        s.push([ind._id, x]);
      });
      s.sort(compareSecondColumn);
      s = s.slice(0, 3);
      return s;
    } catch (e) {
      console.error(`Unable to get top 3 salaries, ${e}`);
    }
  }
  /**
   * This method returns the overall median salary for the entire 2021 collection using aggregation
   * @returns a single value which represents the overall median salary for the dataset
   */

  static async getMedianSalary2021() {
    try {
      var medSal = await salaryData.aggregate([
        {
          $match: {
            Annual_Salary: {
              $exists: true,
            },
          },
        },
        {
          $group: {
            _id: "null",
            count: {
              $sum: 1,
            },
            values: {
              $push: "$Annual_Salary",
            },
          },
        },
        {
          $unwind: "$values",
        },
        {
          $sort: {
            values: 1,
          },
        },
        {
          $project: {
            count: 1,
            values: 1,
            midpoint: {
              $divide: ["$count", 2],
            },
          },
        },
        {
          $project: {
            count: 1,
            values: 1,
            midpoint: 1,
            high: {
              $ceil: "$midpoint",
            },
            low: {
              $floor: "$midpoint",
            },
          },
        },
        {
          $group: {
            _id: null,
            values: {
              $push: "$values",
            },
            high: {
              $avg: "$high",
            },
            low: {
              $avg: "$low",
            },
          },
        },
        {
          $project: {
            beginValue: {
              $arrayElemAt: ["$values", "$high"],
            },
            endValue: {
              $arrayElemAt: ["$values", "$low"],
            },
          },
        },
        {
          $project: {
            median: {
              $avg: ["$beginValue", "$endValue"],
            },
          },
        },
      ]);
      var res = [];
      await medSal.forEach((ind) => {
        res.push(ind);
      });
      console.log(res);
      return res;
    } catch (e) {
      console.error(`Unable to get average salaries, ${e}`);
    }
  }

  static async getDegreesByIndustry() {
    try {
      var degree = [
        {
          $match: {
            Industry: "Computing or Tech",
          },
          $group: {
            _id: "$Highest_Level_of_Education",
            salary: {
              $avg: "$Annual_Salary",
            },
          },
        },
      ];
      var agg = await salaryData.aggregate(degree);
      var degrees = [];
      await agg.forEach((ind) => {
        ind.salary /= 1000;
        ind.salary = ind.salary.toFixed(2);
        degrees.push(ind);
      });
      for (let i = 0; i < degrees.length; i++) {
        if (degrees[i]._id === "") {
          degrees[i]._id = "Other";
        }
      }
      return degrees;
    } catch (e) {
      console.error(`Unable to get degrees, ${e}`);
    }
  }

  /**
   * This method gets the salaries by each age group and then calculates the median values for each respective age group in the 2021 collection
   * @returns each age group and its median salary
   */

  static async getMedianByAge2021() {
    try {
      var salaries = await salaryData.aggregate([
        {
          $group: {
            _id: "$Age",
            salary: {
              $push: "$Annual_Salary",
            },
          },
        },
      ]);

      var s = [];
      await salaries.forEach((ind) => {
        var x = median(ind.salary);
        x = Math.round(x);
        s.push([ind._id, x]);
      });

      return s;
    } catch (e) {
      console.error(`Unable to get average salaries, ${e}`);
    }
  }
  /**
   * This method gets a JSON object with information about salary,job,and location of a user and inserts it in the 2021 collection
   * @returns a mongoDB document to put in the 2021 collection of the SalaryData database
   */
  static async addResponse(
    age = "",
    industry = "",
    job_title = "",
    ann_sal = "",
    curr = "",
    work_exp = "",
    job_context = "",
    other_comp = "",
    other_con = "",
    country = "",
    state = "",
    city = "",
    education = "",
    gender = "",
    race = "",
    address = "",
    lat = "",
    lng = ""
  ) {
    try {
      //creating the response Document
      const responseDoc = {
        Timestamp: "",
        Age: age,
        Industry: industry,
        Job_Title: job_title,
        Annual_Salary: ann_sal,
        Currency: curr,
        Work_Experience: work_exp,
        Context_for_Job: job_context,
        Other: "",
        Other_Compensation: other_comp,
        Context: other_con,
        Country: country,
        State: state,
        City: city,
        Highest_Level_of_Education: education,
        Gender: gender,
        Race: race,
        address: address,
        Lat: lat,
        Lng: lng,
      };

      // console.log(JSON.stringify(responseDoc));
      return await salaryData.insertOne(responseDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }
}