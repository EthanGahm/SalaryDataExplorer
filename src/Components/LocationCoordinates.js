import data from "@iconify/icons-mdi/map-marker";
import $ from "jquery";
import axios from "axios";


export default function getData(){   
    var coordsList = [];   
    var list= ["united states of america"]
    for (var i =0; i<list.length;i++){
       var x ="https://maps.googleapis.com/maps/api/place/textsearch/json?query="+list[i]+"&key="+ process.env.REACT_APP_GOOGLEMAPS_ID
        var result = axios.get(x)
        result.then((result) =>{
          var lat = result.data.results[0].geometry.location.lat;
          lat = lat.toString();
          const location =result.data.results[0].formatted_address
          var long =result.data.results[0].geometry.location.lng;
          long = long.toString()
          // console.log("Name: "+ list[i])
          // console.log("Lat: "+lat)
          // console.log("Long: "+long)
           var res = [lat,long,location]
          //  console.log(res)
          // console.log("Return val: "+ res)
           coordsList.push(res);
           
          // console.log(res)
        })
        
       
        console.log(coordsList)
    }
   
    return coordsList;
  }





