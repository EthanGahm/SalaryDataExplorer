import React, { useState, useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";
import CircularProgress from "@material-ui/core/CircularProgress";

const mapContainerStyle = {
  width: "32vw",
  height: "60vh",
};

const getInfoWindowString = (place, count) => `
    <div>
      <div style="font-size: 12px;">
        ${place}
      </div>
      <div style="font-size: 12px; color: red;">
        Number of people: ${count}
      </div>
    </div>`;

export default function MarkerMap({ pinLocations, loading }) {
  // Used to store a list of references to all markers currently on the map.
  // When the filters change, this list is emptied (markers are deleted) and then rebuilt with a new set of markers.
  const markers = useRef([]);

  // State variables used to store the "maps" module and the particular "map" object returned from the Google Maps Javascript API.
  // maps allows us to directly call Google Maps Javascript API methods (instead of working through the google-map-react library)
  // Values of these state variables are set in the onGoogleAPILoaded method of the GoogleMapReact component.
  const [map, setMap] = useState();
  const [maps, setMaps] = useState();

  // UseEffect runs whenever pinLocations changes, allowing us to render a new set of pins on the map, by re-calling the renderMarkers() function
  useEffect(() => {
    // Only call the renderMarkers function if map and maps have already had their values set by the GoogleMapReact component's onGoogleAPILoaded method.
    if (map !== undefined && maps !== undefined) {
      renderMarkers(map, maps);
    }
  }, [map, maps, pinLocations]);

  // renderMarkers creates an array of markers and corresponding infowindows using map and maps objects
  const renderMarkers = (map, maps) => {
    for (const marker of markers.current) {
      marker.setMap(null);
    }
    markers.current = [];
    var infowindows = [];
    // Counts the number of pins that share the same name from location data
    var counts = {};
    pinLocations.forEach(function (x) {
      counts[x[2]] = (counts[x[2]] || 0) + 1;
    });

    pinLocations.map((pinLocation) => {
      // Sets pinCount to the counted number of same pins
      for (let i in counts) {
        if (i == pinLocation[2]) {
          var pinCount = counts[i];
        }
      }
      // Creates map markers with an infowindow
      let marker = new maps.Marker({
        position: {
          lat: parseFloat(pinLocation[0]),
          lng: parseFloat(pinLocation[1]),
        },
        map,
      });

      infowindows.push(
        new maps.InfoWindow({
          content: getInfoWindowString(pinLocation[2], pinCount),
        })
      );
      markers.current.push(marker);
    });

    markers.current.forEach((marker, i) => {
      marker.addListener("click", () => {
        infowindows[i].open(map, marker);
      });
    });
  };
  if (loading) {
    console.log(loading);
  }
  return (
    <>
      <div className="google-map" style={mapContainerStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAPS_ID }}
          defaultZoom={3}
          options={{
            fullscreenControl: false,
            minZoom: 2,
          }}
          defaultCenter={{ lat: 37.09024, lng: -95.712891 }}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => {
            setMap(map);
            setMaps(maps);
          }}
        >
          {loading ? <CircularProgress size={80} /> : <></>}
        </GoogleMapReact>
      </div>
    </>
  );
}
