


import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        className="mapContainerWrapper"
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
        >
      <style jsx>{`
        .mapContainerWrapper{
          position:relative !important;
        }

        .mapContainerWrapper div:first-child{
          position:relative !important;
        }
     `}
      </style>
      </Map>
    );
  }
}

const LoadingContainer = (props) => <div>Fancy loading container!</div>;
const GoogleMap = GoogleApiWrapper({
    apiKey: process.env.IzaSyAnZQwVoXesbnraomD4khtk79ftuZThgo,
    LoadingContainer: LoadingContainer,
  })(MapContainer);
  
  export default GoogleMap;


