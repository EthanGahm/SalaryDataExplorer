import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;
import median from "../helperMethods/median.js";
import compareSecondColumn from "../helperMethods/lists.js";
let salaryData;

export default class DAO2019 {
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

      salaryData = await conn.db(process.env.SALARYDATA_NS).collection("Data_2019");

    } catch (e) {
      console.error(`Unable to establish a collection handle in DAO2019: ${e}`);
    }
  }
  /**
   * This method grabs all documents in the 2019 dataset
   * @returns the list of documents from the dataset
   */
  static async getCollection2019() {
    let collection = [];
    try {
      collection = await salaryData.find().toArray();

      return collection;
    } catch (e) {
      console.error(`Unable to get countries, ${e}`);
      return collection;
    }
  }
  /**
   *  This method gathers all of the data from our database and displays it. It is meant to be read in on our frontend as a JSON object
   *  to be used in acquiring data for analysis.
   *  @returns all of the data from our database
   */

  static async getAllData({ page = 0, rowsPerPage = 20 } = {}) {
    let cursor;

    try {
      cursor = await salaryData.find();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { rowsList: [], totalNumRows: 0 };
    }

    const displayCursor = cursor.limit(rowsPerPage).skip(rowsPerPage * page);

    try {
      const rowsList = await displayCursor.toArray();
      const totalNumRows = await salaryData.countDocuments();
      console.log(rowsList);
      return { rowsList, totalNumRows };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { rowsList: [], totalNumRows: 0 };
    }
  }
  /**
   * Uses the distinct method to grab unique entries for industry and then iterates through the dataset to collection counts for each industry
   * @returns the numbers/counts of people in each industry
   */
  static async getNumALL() {
    let industries = [];
    let numbers = [];
    try {
      industries = await salaryData.distinct("Industry");
      for (let i = 0; i < industries.length; i++) {
        numbers.push({
          name: industries[i],
          val: await salaryData.countDocuments({ Industry: industries[i] }),
        });
      }
      return numbers;
    } catch (e) {
      console.error(`Unable to get industries, ${e}`);
      return numbers;
    }
  }
  /**
   * This method groups the industries with all the salaries of people working in them and then calculates their medians.
   * @returns The top three highest median values and their respective industries
   */

  static async getTop3Salaries2019() {
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
      console.error(`Unable to get average salaries, ${e}`);
    }
  }
  /**
   * This method returns the overall median salary for the entire 2019 collection using aggregation
   * @returns a single value which represents the overall median salary for the dataset
   */
  // used this website for the aggregation code for median : https://www.compose.com/articles/mongo-metrics-finding-a-happy-median/
  static async getMedianSalary2019() {
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

      return res;
    } catch (e) {
      console.error(`Unable to get average salaries, ${e}`);
    }
  }
  /**
   * This method gets the salaries by each age group and then calculates the median values for each respective age group in the 2019 collection
   * @returns each age group and its median salary
   */
  static async getMedianByAge2019() {
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
}
