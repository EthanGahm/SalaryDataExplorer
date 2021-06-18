import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let salaryData;

export default class DAO2021 {
  static async injectDB(conn) {
    if (salaryData) {
      return;
    }

    try {
      salaryData = await conn.db(process.env.SALARYDATA_NS).collection("2021");
    } catch (e) {
      console.error(`Unable to establish a collection handle in DAO2021: ${e}`);
    }
  }

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

  static async getNumALL() {
    let industries = [];
    let numbers = [];
    try {
      industries = await salaryData.distinct("Industry");
      for (let i = 0; i < industries.length; i++) {
        numbers.push({ name: industries[i], 
        val: await salaryData.countDocuments({"Industry": industries[i]})});
      }
      return numbers;
    }
    catch (e) {
      console.error(`Unable to get industries, ${e}`);
      return numbers;
    }
  }
}
