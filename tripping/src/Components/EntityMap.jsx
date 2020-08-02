import React, { Component } from 'react';
import {
    InfoWindow,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import GeoCode from 'react-geocode';
import { uuid } from 'uuidv4';


GeoCode.setApiKey('AIzaSyCcS0j7hDpSs-F4xDi2q6AkTD_sWqECR9M')
export class MapComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            zoom: 10,
            height: "100%",
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

    getCity = (addressArray) => {
        let city = ''
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && addressArray[i].types[0] === 'administrative_area_level_2') {
                city = addressArray[i].long_name
                return city;
            }
        }
    }

    getArea = (addressArray) => {
        let area = ''
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray.length; j++) {
                    if (addressArray[i][types][j] === 'sublocality_level_1' || addressArray[i][types][j] === 'locality') {
                        area = addressArray[i].types[0]
                        return area
                    }
                }
            }
        }
    }

    getState = (addressArray) => {
        let state = ''
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && addressArray[i].types[0] === 'administrative_area_level_1') {
                state = addressArray[i].long_name
                return state;
            }
        }
    }

    onMarkerDrag = (e) => {
        let newLat = e.latLng.lat();
        let newLng = e.latLng.lng();
        GeoCode.fromLatLng(newLat, newLng)
            .then(response => {
                const address = response.results[0].formated_address,
                    addressArray = response.results[0].address_components
                // city = this.getCity(addressArray),
                // area = this.getArea(addressArray),
                // state = this.getState(addressArray)
                this.setState({
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    }
                })

            })
    }


    render() {
        let { data } = this.props;
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <div>
             
                {
                    data.map(ele =>
                        <GoogleMap
                            key={uuid()}
                            defaultZoom={6}
                            defaultCenter={{ lat: Number(ele.latitude), lng: Number(ele.longitude) }}
                        >
                            <Marker
                                position={{ lat: Number(ele.latitude), lng: Number(ele.longitude) }}
                            >
                                <InfoWindow>
                                    <div>
                                        <h5>{ele.property_name}</h5>
                                    </div>
                                </InfoWindow>
                            </Marker>
                        </GoogleMap>
                    )
                }
            </div>

        ));
        return (
            <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCcS0j7hDpSs-F4xDi2q6AkTD_sWqECR9M&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%`, width: '100%' }} />}
                mapElement={<div style={{ height: `100%`, width: `100%` }} />}
            />
        )
    }
}

export default MapComponent
