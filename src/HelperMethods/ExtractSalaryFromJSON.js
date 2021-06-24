import React, { useEffect } from "react";
import axios from "axios";
/**
 * This method will be used to gather JSON objects from API calls made to the database.
 * It will then extract the city, state, and country (if provided) for each entry of
 * the API JSON object result, and be used to place pins on a Google Map.
 *
 * @param {*} url - JSON object to parse and extract location information from
 * @returns a list of locations extracted from a JSON object
 */


export default async function getSalaryFromJSON(url) {
  var salaryList = []
  try {
    var jsonInfo = await axios.get(url);
  } catch (error) {
    console.log(error);
    return error;
  }
  for (var i = 0; i < jsonInfo.data.rows.length; i++) {
    var tempSalary = jsonInfo.data.rows[i].Annual_Salary;
    if (tempSalary == undefined) {
      tempSalary = "";
    }
    

   
    salaryList.push(tempSalary)
  }
  return salaryList;
}
