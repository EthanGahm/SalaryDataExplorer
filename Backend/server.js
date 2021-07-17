import express from "express";
import cors from "cors";
import router from "./api/salaryData.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/salary_data", router);
app.use("*", (req, res) =>
  res.status(404).json({ error: "not valid address" })
);

export default app;
