import DAO2021 from "../dao/DAO2021.js";

export default class Controller2021 {
  static async apiGetAllData(req, res, next) {
    const rowsPerPage = req.query.rowsPerPage
      ? parseInt(req.query.rowsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    const { rowsList, totalNumRows } = await DAO2021.getAllData({
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
}
