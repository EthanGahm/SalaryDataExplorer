import React from "react";
import axios from "axios";

export default async function getLocationsFromJSON(url) {
  try {
    var jsonInfo = await axios.get(url);
  } catch (error) {
    console.log(error);
    return error;
  }
  for (var i = 0; i < jsonInfo.data.rows.length; i++) {
    var tempCountry = jsonInfo.data.rows[i].Country;
    var tempState = jsonInfo.data.rows[i].State;
    var tempCity = jsonInfo.data.rows[i].tempCity;
    if (tempCountry == undefined) {
      tempCountry = "";
    }
    if (tempState == undefined) {
      tempState = "";
    }
    if (tempCity == undefined) {
      tempCity = "";
    }
    //console.log("Country:" + tempCountry);
    //console.log("State:" + tempState);
    //console.log("City:" + tempCity);
    var combinedLocation = tempCity + " " + tempState + " " + tempCountry;
    console.log(i + ": " + combinedLocation);
  }
  //console.log(jsonInfo.data.rows.length);
}
