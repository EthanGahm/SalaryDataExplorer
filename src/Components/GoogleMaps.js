import React, { useState, useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react'
import isEmpty from 'lodash.isempty';


const mapContainerStyle = {
  width: "40vw",
  height: "40vh",
}

export default function MarkerMap({ pinLocations }) {
  //const [markers, setMarkers] = useState([]);
  //const [infowindow, setInfowindows] = useState([]);

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


  // Display a set of pins on the map represented by the values currently in the pinLocations array
  const renderMarkers = (map, maps) => {

    // Clear out old markers
    for (const marker of markers.current) {
      marker.setMap(null);
    }
    markers.current = [];

    var infowindows = []
    pinLocations.map((pinLocation) => {
      let marker = new maps.Marker({
        position: { lat: parseFloat(pinLocation[0]), lng: parseFloat(pinLocation[1]) },
        map,
      })
      infowindows.push(new maps.InfoWindow({
        content: pinLocation[2],
      }));
      markers.current.push(marker)

    })

    markers.current.forEach((marker, i) => {
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
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAPS_ID }}
            defaultZoom={3}
            defaultCenter={{ lat: 37.09024, lng: -95.712891 }}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => {
              setMap(map)
              setMaps(maps)
            }}
          >

          </GoogleMapReact>
        )}
      </div>


    </>
  )
};