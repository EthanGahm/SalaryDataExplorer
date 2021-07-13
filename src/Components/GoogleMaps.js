import React, { useState, useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react'
import isEmpty from 'lodash.isempty'

const mapContainerStyle = {
  width: "40vw",
  height: "40vh",
}

const getInfoWindowString = (place, count) => `
    <div>
      <div style="font-size: 12px;">
        ${place}
      </div>
      <div style="font-size: 12px; color: red;">
        Number of people: ${count}
      </div>
    </div>`;

export default function MarkerMap({pinLocations}) {
    // Used to store a list of references to all markers currently on the map.
  // When the filters change, this list is emptied (markers are deleted) and then rebuilt with a new set of markers.
  const markers = useRef([]);

  // State variables used to store the "maps" module and the particular "map" object returned from the Google Maps Javascript API.
  // maps allows us to directly call Google Maps Javascript API methods (instead of working through the google-map-react library)
  // Values of these state variables are set in the onGoogleAPILoaded method of the GoogleMapReact component.
  const [map, setMap] = useState()
  const [maps, setMaps] = useState()

  // UseEffect runs whenever pinLocations changes, allowing us to render a new set of pins on the map, by re-calling the renderMarkers() function
  useEffect(() => {
    // Only call the renderMarkers function if map and maps have already had their values set by the GoogleMapReact component's onGoogleAPILoaded method.
    if (map !== undefined && maps !== undefined) {
      renderMarkers(map, maps)
    }
  }, [map, maps, pinLocations])
  
    
   const renderMarkers = (map, maps) => {
    for (const marker of markers.current) {
      marker.setMap(null);
    }
    markers.current = [];

    var infowindows = []
    var counts = {}
    pinLocations.forEach(function(x) {counts[x[2]] = (counts[x[2]] || 0)+1; });

    pinLocations.map((pinLocation) => {
      console.log(pinLocation[2])
      for (let i in counts) {
        if (i == pinLocation[2]) {
          var pinCount = counts[i];
        }
        
        
    }
    let marker = new maps.Marker({
      position: {lat: parseFloat(pinLocation[0]), lng: parseFloat(pinLocation[1])},
      map,
      })

      infowindows.push(new maps.InfoWindow({
        content: getInfoWindowString(pinLocation[2], pinCount),
      }));
      markers.current.push(marker)
    
    })

    markers.current.forEach((marker, i) => {
      marker.addListener('click', () => {
        infowindows[i].open(map, marker);
      });
    });
    
  };
   return (
   <>
   
   
   <div className="google-map" style={mapContainerStyle}>

   <GoogleMapReact
      bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLEMAPS_ID}}
      defaultZoom={3}
      defaultCenter={{lat: 37.09024, lng: -95.712891}}
      yesIWantToUseGoogleMapApiInternals={true}
      onGoogleApiLoaded={({ map, maps }) => {
        setMap(map)
        setMaps(maps)
      }}
    >
      
   </GoogleMapReact>

   </div>
   
   
   </>
   )};