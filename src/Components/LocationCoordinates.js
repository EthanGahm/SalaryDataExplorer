import data from "@iconify/icons-mdi/map-marker";
import $ from "jquery";
//import google from "google-maps"
import axios from "axios";
import { ArrowRight } from "@material-ui/icons";


export default async function getData(){   
  
  
    var coordsList = [];   
    var list= ["united states of america"]
    for (var i =0; i<list.length;i++){
      try {
      var temp =  await getRes(list[i]);

       // console.log("temp: "+temp)
        coordsList.push(temp);
        console.log(coordsList)
        
      }catch (error){
        console.log(error)
        return error
      }
     
        
      
      
    }
   
    return coordsList;
  }
   
 async function getRes(str){
        var loc =str.replace(/\s+/g, '+')
        const url = "https://maps.googleapis.com/maps/api/geocode/json?address="+loc+"&key="+process.env.REACT_APP_GOOGLEMAPS_ID;
      //  console.log(url)
      
       
        var res = await axios.get(url);
            
        // console.log(res)
        
          // console.log("Latitude: " + res.data.results[0].geometry.location.lat);
          // console.log("Longitude: " + res.data.results[0].geometry.location.lng);
          // console.log("Location: " + res.data.results[0].formatted_address);
          var arr = [];
          arr.push(JSON.stringify(res.data.results[0].geometry.location.lat));
          arr.push(JSON.stringify(res.data.results[0].geometry.location.lng));
          arr.push(JSON.stringify(res.data.results[0].formatted_address));
          return arr;


    
       


      }
 
      //  var lat = results[0].geometry.location.lat;
      //       var long = results[0].geometry.location.lng;
      //       var name = results[0].formatted_address
      //       var temp = [lat,long,temp]
      //       coordsList.push(temp)

   
      // console.log(g.latlng)

      // var sydney = new google.maps.LatLng(-33.867, 151.195);
      
       
      // var map = new google.maps.Map(
      //     document.getElementById('map'), {center: sydney, zoom: 15});
      
      // var request = {
      //   query: list[i],
      //   fields: ['name', 'lat', 'lng'],
      // };
      // var service = new google.maps.places.PlacesService(map);
      
      // service.findPlaceFromQuery(request, function(results, status) {
      //   if (status === google.maps.places.PlacesServiceStatus.OK) {
          
      //       var lat = results[0].geometry.location.lat;
      //       var long = results[0].geometry.location.lng;
      //       var name = results[0].formatted_address
      //       var temp = [lat,long,temp]
      //       coordsList.push(temp)
      //     }
     
       
      //   console.log(coordsList)
      // });
    
    
    // return coordsList;
  // }
      





//
 
// var x ="https://maps.googleapis.com/maps/api/place/textsearch/json?query="+list[i]+"&key="+ process.env.REACT_APP_GOOGLEMAPS_ID
// var result = axios.get(x)
// result.then((result) =>{
//   var lat = result.data.results[0].geometry.location.lat;
//   lat = lat.toString();
//   const location =result.data.results[0].formatted_address
//   var long =result.data.results[0].geometry.location.lng;
//   long = long.toString()
//   // console.log("Name: "+ list[i])
//   // console.log("Lat: "+lat)
//   // console.log("Long: "+long)
//    var res = [lat,long,location]
//   //  console.log(res)
//   // console.log("Return val: "+ res)
//    coordsList.push(res);
   
//   // console.log(res)
// })
// var headers = new Headers();
    
// function loadScript() {
// var script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = process.env.REACT_APP_URL;
// document.body.appendChild(script);
// }
// window.onload = loadScript;
// for (var i =0; i<list.length;i++){
//   let x = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+list[i]+"&key="+ process.env.REACT_APP_GOOGLEMAPS_ID;
//   fetch(x)
//     .then(response => response.json())
   
//     .then(data => {
//       console.log(data);
//       let lat = data.results[0].geometry.location.lat;
//       let long = data.results[0].geometry.location.lng;
//       let name = data.results[0].formatted_address;
//       let temp = [lat,long,name]
//       coordsList.push(temp)


