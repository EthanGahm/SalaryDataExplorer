import React from "react";
import axios from "axios";

async function getCoordinates(list) {
  var coordsList = [];
  
  for (var i = 0; i < list.length; i++) {
    try {
      var temp = await getRes(list[i]);
    } catch (error) {
      console.error(error);
      return error;
    }
    coordsList.push(temp);
  }

  console.log(coordsList);
  return coordsList;
}

async function getRes(str) {
  var loc = str.replace(/\s+/g, "+");
  const url =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    loc +
    "&key=" +
    process.env.REACT_APP_GOOGLEMAPS_ID;


  var res = await axios.get(url);


  var arr = [];
  arr.push(JSON.stringify(res.data.results[0].geometry.location.lat));
  arr.push(JSON.stringify(res.data.results[0].geometry.location.lng));
  arr.push(JSON.stringify(res.data.results[0].formatted_address));
  return arr;
}

