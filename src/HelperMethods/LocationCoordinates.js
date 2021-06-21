import React from "react";
import axios from "axios";

/**
 * This method takes in a list of location strings, and then iterates through them to collect their coordinates
 * (latitude,longitude) and a cleaned-up string of the location name.
 * @param {*} list : list of Strings representing locations
 * @returns a 2d array with each array element being structured [latitude,longitude,cleaned up name]
 */
export default async function getCoordinates(list) {
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
  return coordsList;
}
/**
 * This is a helper method to getCoordinates(). Given a String representing a location of an entry,
 * the method will use an API call to Google's Geocoder and retrieve the coordinates and cleaned up
 * location name. This is what will be returned in the getCoordinates method.
 *
 * @param {*} str : String representing a location
 * @returns  the latitude, longitude, and cleaned up location name of the given String input
 */
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
