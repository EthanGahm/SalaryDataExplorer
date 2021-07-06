import React, { useState, Component, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import isEmpty from 'lodash.isempty';


const mapContainerStyle = {
  width: "40vw",
  height: "40vh",
}

export default function MarkerMap({pinLocations}) {
  //const [markers, setMarkers] = useState([]);
  //const [infowindow, setInfowindows] = useState([]);
  
    
    
   
  
  
   const renderMarkers = (map, maps) => {
    var markers = []

    var infowindows = []
    pinLocations.map((pinLocation) => {
    let marker = new maps.Marker({
      position: {lat: parseFloat(pinLocation[0]), lng: parseFloat(pinLocation[1])},
      map,
      })
      infowindows.push(new maps.InfoWindow({
        content: pinLocation[2],
      }));
      markers.push(marker)
      
    })

    markers.forEach((marker, i) => {
      marker.addListener('click', () => {
        infowindows[i].open(map, marker);
      });
    });
    
/*
    componentWillReceiveProps = () => {
      markersList = []
      infowindows = []
      pinLocations.map((pinLocation) => {
        let marker = new maps.Marker({
          position: {lat: parseFloat(pinLocation[0]), lng: parseFloat(pinLocation[1])},
          map,
          })
          infowindows.push(new maps.InfoWindow({
            content: pinLocation[2],
          }));
          markers.push(marker)
          
        })
    
        markers.forEach((marker, i) => {
          marker.addListener('click', () => {
            infowindows[i].open(map, marker);
          });
        });
        setMarkers(markersList)
        setInfowindows(infowindows)
      }
    }
    */
   
    
    
   //}
      /*
      const markers = [];
      const infowindows = [];
      
    
      pinLocations.map((pinLocation) => {
        
        markers.push(new maps.Marker({
          position: {
            lat: parseFloat(pinLocation[0]),
            lng: parseFloat(pinLocation[1]),
          },
          map,
        }));
        infowindows.push(new maps.InfoWindow({
          content: pinLocation[2],
        }));
      });
      markers.forEach((marker, i) => {
        marker.addListener('click', () => {
          infowindows[i].open(map, marker);
        });
      });
      
    
   };
*/
  };
   return (
   <>
   
   
   <div className="google-map" style={mapContainerStyle}>
   {!isEmpty(pinLocations) && (
   <GoogleMapReact
      bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLEMAPS_ID}}
      defaultZoom={3}
      defaultCenter={{lat: 37.09024, lng: -95.712891}}
      yesIWantToUseGoogleMapApiInternals={true}
      onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
    >
      
   </GoogleMapReact>
   )}
   </div>
   
   
   </>
   )};