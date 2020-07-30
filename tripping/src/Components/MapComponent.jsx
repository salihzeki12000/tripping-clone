import React, { Component } from 'react';
import {
    InfoWindow,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

export class MapComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            zoom: 10,
            height: 700,
            mapPosition: {
                lat: 0,
                lng: 0
            },
            markerPosition: {
                lat: 0,
                long: 0
            }
        }
    }

    onMarkerDrag = (e) => {
        let { lat } = this.statemarkerPosition;
        let newLat = e.latLng.lat();
        let newLon = e.latLng.lng();
        // this.setState({
        //     lat=newLat
        // })
    }

    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                <Marker
                    draggable={true}
                    onDragEnd={this.onMarkerDrag}
                    position={{ lat: -34.397, lng: 150.644 }}
                />
            </GoogleMap>
        ));
        return (
            <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCcS0j7hDpSs-F4xDi2q6AkTD_sWqECR9M&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `1000px`, width: '1000px' }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}

export default MapComponent
