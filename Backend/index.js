import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import DAO2021 from "./dao/DAO2021.js";
import DAO2019 from "./dao/DAO2019.js";
dotenv.config();
const MongoClient = mongodb.MongoClient;



//creates the connections and injections into the MongoDB our team is using.

const port = process.env.PORT || 5000;

MongoClient.connect(process.env.SALARYDATA_DB_URI, {
  poolSize: 50,
  wtimeout: 250,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await DAO2021.injectDB(client);
    await DAO2019.injectDB(client);

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
