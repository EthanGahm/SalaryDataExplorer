import data from "@iconify/icons-mdi/map-marker";
import $ from "jquery";


export default function GetCoords(){
    var list = ["Colorado United States of America","district of columbia United States of America","rio de janeiro brazil","paris france"]
    var coordsList = [];
    
    for (var i =0; i<list.length;i++){
        var lat;
        var long;
        var temp;
        //loop through each elem in list, and making them connect with + to build html response
        list[i] = list[i].replaceAll(" ", "+")
        var x ="https://maps.googleapis.com/maps/api/place/textsearch/json?query="+list[i]+"&key="+ process.env.REACT_APP_GOOGLEMAPS_ID
      //used this StackOverflow link  https://stackoverflow.com/questions/1739800/variables-set-during-getjson-function-only-accessible-within-function
        var jsonIssues = {};
       $.ajax({
        url: x,
        async: false,
        dataType: 'json',
        success: function(data) {
               lat = JSON.stringify(data.results[0].geometry.location.lat);
        
         long = JSON.stringify(data.results[0].geometry.location.lng);

        temp  = [lat,long];
        coordsList.push(temp);
        }
    });
     
    }
    

return (
  
  <div >
    <h3>Coordinates for {list[0]}: {coordsList[0][0]}, {coordsList[0][1]} </h3>
     <h3></h3>

      <h3> Coordinates for {list[1]}: {coordsList[1][0]}, {coordsList[1][1]}</h3>
     <h3></h3>
     <h3> Coordinates for {list[2]}: {coordsList[2][0]}, {coordsList[2][1]}</h3>
     <h3></h3>
     <h3>  Coordinates for {list[3]}: {coordsList[3][0]},  {coordsList[3][1]}</h3>
  </div>
);
 }

