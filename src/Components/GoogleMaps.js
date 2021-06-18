/* global google */
import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'
//import {formatRelative} from "date-fns";
//import "@reach/combobox/styles.css";

import { withScriptjs, withGoogleMap, InfoWindow } from 'react-google-maps';
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import '../map.css'


const mapContainerStyle = {
  width: "50vw",
  height: "50vh",
}

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

const GoogleMaps = ({ location, zoomLevel }) => {
  return(
  <div className="map">

    <div className="google-map" style={mapContainerStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAPS_ID }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
        
      >
      <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
        />
      </GoogleMapReact>
    </div>
  </div>
  )
}

export default GoogleMaps