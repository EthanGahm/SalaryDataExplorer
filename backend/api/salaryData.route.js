import express from "express";
import Ctrl2021 from "./controller.2021.js";

const router = express.Router();

router.route("/").get((req, res) => res.send("hello world"));

router.route("/all_2021").get(Ctrl2021.apiGetAllData);

export default router;
