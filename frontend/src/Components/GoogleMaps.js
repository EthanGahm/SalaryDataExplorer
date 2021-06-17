import React, { useState, Component } from 'react'
import GoogleMapReact from 'google-map-react'
import isEmpty from 'lodash.isempty';
import getCoordinates from '../HelperMethods/LocationCoordinates'

const mapContainerStyle = {
  width: "50vw",
  height: "50vh",
}



export default function MarkerMap({pinLocations}) {

  const [coordinates, setCoordinates] = React.useState([])
  React.useEffect(() => {
    let data = getCoordinates(pinLocations)
    data.then((data) => setCoordinates(data))
   },[pinLocations])
   const handleApiLoaded = (map, maps, coordinates) => {
    const markers = [];
    const infowindows = [];
    
    coordinates.map((coordinate) => {
      console.log(coordinate[0])
      markers.push(new maps.Marker({
        position: {
          lat: parseFloat(coordinate[0]),
          lng: parseFloat(coordinate[1]),
        },
        map,
      }));
      infowindows.push(new maps.InfoWindow({
        content: coordinate[2],
      }));
    });
  
    markers.forEach((marker, i) => {
      marker.addListener('click', () => {
        infowindows[i].open(map, marker);
      });
    });
  };
  
   return (
   <>
   
   {!isEmpty(coordinates) && (
   <div className="google-map" style={mapContainerStyle}>
   <GoogleMapReact
      bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLEMAPS_ID}}
      defaultZoom={5}
      defaultCenter={{lat: 39.5500507, lng: -105.7820}}
      yesIWantToUseGoogleMapApiInternals={true}
      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, coordinates)}
    >
      
   </GoogleMapReact>
   </div>
   )}
   
   </>
   )}

