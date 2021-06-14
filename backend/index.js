import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import DAO2021 from "./dao/DAO2021.js";
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.SALARYDATA_DB_URI, {
  poolSize: 50,
  wtimeout: 250,
  useNewUrlParse: true,
})
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await DAO2021.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
