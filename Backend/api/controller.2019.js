import DAO2019 from "../dao/DAO2019.js";

/**
 * 
  This class holds methods that allows to use aggregation methods defined in DAO2019.js to return JSON objects to our API endpoint routes.
 */
export default class Controller20219 {
  /**
   *
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
   * Returns all documents in 2019 collection
   */
  static async apiGetCollection2019(req, res, next) {
    try {
      let dataset = await DAO2019.getCollection2019();
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
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    const { rowsList, totalNumRows } = await DAO2019.getAllData({
      page,
      rowsPerPage,
    });

    let response = {
      rows: rowsList,
      page: page,
      entries_per_page: rowsPerPage,
      total_results: totalNumRows,
    };
    res.json(response);
  }
  /**
   * 
   * @param {*} req - request
   * @param {*} res - result
   * @param {*} next - unused
    This method uses an aggregation which retrieves the coutn of repsonses for each industry in the data and returns it as a JSON object
    @returns a JSON object containing the name of the industry and the amount of people who answered in the survey
   */
  static async apiGetNumALL(req, res, next) {
    try {
      let industries = await DAO2019.getNumALL();
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
  This method return the top 3 median salaries from the 2019 dataset as a JSON object
  @returns top 3 highest median salaries as a JSON object
 */
  static async apiGet2019Salaries(req, res, next) {
    try {
      let salaries = await DAO2019.getTop3Salaries2019();
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
   This method returns the aggregation that returns the overall median salary from the entire 2019 database
   @returns a JSON object with the overall median salary.

   */
  static async apiGetMedianSalary(req, res, next) {
    try {
      let salaries = await DAO2019.getMedianSalary2019();
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
  This method returns the median salary by age group from the 2019 dataset.
  @returns a JSON object with the age group and its corresponding median salary.
   */
  static async apiGetAgesMedSal(req, res, next) {
    try {
      let salaries = await DAO2019.getMedianByAge2019();
      res.json(salaries);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
