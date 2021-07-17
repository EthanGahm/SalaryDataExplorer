import DAO2021 from "../dao/DAO2021.js";
import dotenv from "dotenv";
// import axios from "axios";
/**
 * 
  This class holds methods that allows to use aggregation methods defined in DAO2021.js to return JSON objects to our API endpoint routes.
 */
export default class Controller2021 {
  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
   * Returns all documents in 2021 collection
   */
  static async apiGetCollection2021(req, res, next) {
    try {
      let dataset = await DAO2021.getCollection2021();
      res.json(dataset);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  /**
   * 
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused

  This method grabs entire datapoints and displays them as a JSON object. 
  @returns a JSON object with all the data from the dataset
   */
  static async apiGetAllData(req, res, next) {
    const rowsPerPage = req.query.rowsPerPage
      ? parseInt(req.query.rowsPerPage, 10)
      : 5;

    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    let filters = {};

    if (req.query.Industry) {
      filters.Industry = req.query.Industry;
    }
    if (req.query.Age) {
      filters.Age = req.query.Age;
    }
    if (req.query.Gender) {
      filters.Gender = req.query.Gender;
    }
    if (req.query.Country) {
      filters.Country = req.query.Country;
    }
    if (req.query.City) {
      filters.City = req.query.City;
    }
    if (req.query.State) {
      filters.State = req.query.State;
    }
    if (req.query.Race) {
      filters.Race = req.query.Race;
    }
    if (req.query.Work_Experience) {
      filters.Work_Experience = req.query.Work_Experience;
    }
    if (req.query.Highest_Level_of_Education) {
      filters.Highest_Level_of_Education = req.query.Highest_Level_of_Education;
    }

    const { rowsList } = await DAO2021.getAllData({
      page,
      rowsPerPage,
      filters,
    });

    let response = {
      rows: rowsList,
      page: page,
      filters: filters,
      total_results: rowsPerPage,
    };
    res.json(response);
  }

  static async apiGetAllSummaryData(req, res, next) {
    let filters = {};

    if (req.query.Industry) {
      filters.Industry = req.query.Industry
    } if (req.query.Age) {
      filters.Age = req.query.Age
    } if (req.query.Gender) {
      filters.Gender = req.query.Gender
    } if (req.query.Country) {
      filters.Country = req.query.Country
    } if (req.query.City) {
      filters.City = req.query.City
    } if (req.query.State) {
      filters.State = req.query.State
    } if (req.query.Race) {
      filters.Race = req.query.Race
    } if (req.query.Work_Experience) {
      filters.Work_Experience = req.query.Work_Experience
    } if (req.query.Highest_Level_of_Education) {
      filters.Highest_Level_of_Education = req.query.Highest_Level_of_Education
    }

    var {
      meanSalary,
      medianSalary,
      pinLocations,
      topSalary, botSalary,
      avgAge,
      salaries,
      popular,
      common,
    } = await DAO2021.getAllSummaryData({
      filters,
    });

    if (medianSalary === '0.00') {
      meanSalary = 'Not Found';
      medianSalary = 'Not Found';
      topSalary = 'Not Found';
      botSalary = 'Not Found';
      avgAge = 'Not Found'
    }

    var topInd = [];
    salaries.forEach(element => {
      topInd.push(element._id + " ($" + element.salary + "k)" + " | ");
    });
    if (topInd.length != 0) {
      topInd[topInd.length - 1] = topInd[topInd.length - 1].slice(0, -3)
    }

    var popInd = [];
    popular.forEach(element => {
      popInd.push(element._id + " | ");
    });
    if (popInd.length != 0) {
      popInd[popInd.length - 1] = popInd[popInd.length - 1].slice(0, -3)
    }

    var common_degree = []
    common.forEach(element => {
      common_degree.push(element._id);
    })

    var search = Object.values(filters);
    for (let i = 0; i < search.length; i++) {
      search[i] = search[i] + ", ";
    }
    if (search.length != 0) {
      search[search.length - 1] = search[search.length - 1].slice(0, -2)
    }

    if (topInd.length === 0) {
      topInd = 'Not Found';
      popInd = 'Not Found';
      common_degree = 'Not Found';
    }

    let response = {
      pin_locations: pinLocations,
      mean_salary: meanSalary,
      median_salary: medianSalary,
      search_param: search,
      top_salary: topSalary,
      bot_salary: botSalary,
      avg_age: avgAge,
      high_ind: topInd,
      pop_ind: popInd,
      com_deg: common_degree,
    };
    res.json(response);
  }

  /**
 * 
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
  This method gets the aggregation of the unique industries in the 2021 dataset.
  @returns a JSON object with all the industries in the 2021 collection
 */

  static async apiGetIndustries(req, res, next) {
    try {
      let industries = await DAO2021.getIndustries();
      res.json(industries);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method gets the aggregation of the unique entries for countries in the 2021 dataset
    @returns a JSON object with all the countries in the 2021 collection
   */
  static async apiGetCountries(req, res, next) {
    try {
      let countries = await DAO2021.getCountries();
      res.json(countries);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method gets the aggregation of the unique entries for cities in the 2021 dataset
    @returns a JSON object with all the cities in the 2021 collection
   */
  static async apiGetCities(req, res, next) {
    try {
      let cities = await DAO2021.getCities();
      res.json(cities);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  /**
 * 
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
  This method gets the aggregation of the unique races in the 2021 dataset.
  @returns a JSON object with all the races in the 2021 collection
 */

  static async apiGetRaces(req, res, next) {
    try {
      let races = await DAO2021.getRaces();
      res.json(races);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  /**
* 
 * @param {*} req - request
 * @param {*} res - result
 * @param {*} next - unused
This method gets the aggregation of the unique education in the 2021 dataset.
@returns a JSON object with all the education in the 2021 collection
*/

  static async apiGetEducation(req, res, next) {
    try {
      let education = await DAO2021.getEducation();
      res.json(education);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  /**
* 
 * @param {*} req - request
 * @param {*} res - result
 * @param {*} next - unused
This method gets the aggregation of the unique work experience in the 2021 dataset.
@returns a JSON object with all the work experience in the 2021 collection
*/

  static async apiGetWorkExp(req, res, next) {
    try {
      let work_exp = await DAO2021.getWorkExp();
      res.json(work_exp);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method gets the aggregation of the unique entries for states in the 2021 dataset
    @returns a JSON object with all the states in the 2021 collection
   */
  static async apiGetStates(req, res, next) {
    try {
      let states = await DAO2021.getStates();
      res.json(states);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method gets the aggregation of the overall count and count by gender of entries in the 2021 collection
    @returns a JSON object with all the overall count and count by gender
   */
  static async apiGetNumALL(req, res, next) {
    try {
      let industries = await DAO2021.getNumALL();
      res.json(industries);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method gets the aggregation of the average salary by industries in the 2021 collection
    @returns a JSON object with the average salary by industries in the 2021 collection
   */
  static async apiGetSalaries(req, res, next) {
    try {
      let salaries = await DAO2021.getSalaries();
      res.json(salaries);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method gets the aggregation of the average salary by degree/level of education in the 2021 collection
    @returns a JSON object with the average salary by degree in the 2021 collection
   */
  static async apiGetDegrees(req, res, next) {
    try {
      let degrees = await DAO2021.getDegrees();
      res.json(degrees);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method gets the aggregation of the count by industries in the 2021 collection
    @returns a JSON object with the count by industries in the 2021 collection
   */
  static async apiGetDisDegrees(req, res, next) {
    try {
      let disDegrees = await DAO2021.getDisDegrees();
      res.json(disDegrees);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method gets the aggregation of the average salary by ages in the 2021 collection
    @returns a JSON object with the average salary by age group in the 2021 collection
   */
  static async apiGetAge(req, res, next) {
    try {
      let ages = await DAO2021.getAge();
      res.json(ages);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method gets the aggregation of the count by age in the 2021 collection
    @returns a JSON object with the count by age in the 2021 collection
   */
  static async apiGetDisAge(req, res, next) {
    try {
      let disAge = await DAO2021.getDisAge();
      res.json(disAge);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method gets the aggregation of the count by gender in the 2021 collection
    @returns a JSON object with the count by gender in the 2021 collection
   */
  static async apiGetGender(req, res, next) {
    try {
      let genders = await DAO2021.getGender();
      res.json(genders);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetWork(req, res, next) {
    try {
      let works = await DAO2021.getWork();
      res.json(works);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method gets the aggregation of top 3 highest median salary industries in the 2021 collection
    @returns a JSON object with the top 3 industries with highest median salaries in the 2021 collection
   */
  static async apiGetTop3Salaries(req, res, next) {
    try {
      let salaries = await DAO2021.getTop3Salaries2021();
      res.json(salaries);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method gets the aggregation of the overall median salary in the 2021 collection
    @returns a JSON object with the overall median salary in the 2021 collection
   */
  static async apiGetMedianSalary(req, res, next) {
    try {
      let salaries = await DAO2021.getMedianSalary2021();
      res.json(salaries);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method gets the aggregation of the median salary by age in the 2021 collection
    @returns a JSON object with the median salary by age in the 2021 collection
   */

  static async apiGetRace(req, res, next) {
    try {
      let races = await DAO2021.getRace();
      res.json(races);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetDisRace(req, res, next) {
    try {
      let disRaces = await DAO2021.getDisRace();
      res.json(disRaces);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetTopCountries(req, res, next) {
    try {
      let countries = await DAO2021.getTopCountries();
      res.json(countries);
    } catch (e) {
      console.log(`api, ${e}`);
    }
  }

  static async apiGetAgesMedSal(req, res, next) {
    try {
      let salaries = await DAO2021.getMedianByAge2021();
      res.json(salaries);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method gets the aggregation of adding response to db
    @returns a JSON with info to add to db
   */
  static async apiAddResponse(req, res, next) {
    try {
      const age = req.body.age;
      const ind = req.body.industry;
      const job = req.body.job_title;
      const sal = req.body.annual_salary;
      const curr = req.body.currency;
      const w_exp = req.body.work_experience;
      const cont_job = req.body.job_context;
      const oth_com = req.body.other_compensation;
      const cont = req.body.other_con;
      const coun = req.body.country;
      const st = req.body.state;
      const cty = req.body.city;
      const edu = req.body.Highest_Level_of_Education;
      const gen = req.body.gender;
      const race = req.body.race;
      const address = req.body.address;
      const lat = req.body.lat;
      const lng = req.body.lng;

      const surveyResponse = await DAO2021.addResponse(
        age,
        ind,
        job,
        sal,
        curr,
        w_exp,
        cont_job,
        oth_com,
        cont,
        coun,
        st,
        cty,
        edu,
        gen,
        race,
        address,
        lat,
        lng
      );

      res.json({ status: "success!" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
