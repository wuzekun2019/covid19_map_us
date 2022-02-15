import React, { useEffect, useRef } from 'react';
import {MapContainer, GeoJSON, TileLayer, Marker, Popup, Circle, useMap} from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import './CovidMap.css'

var countrylist=[]

const CovidMap=({countries, date, handlerClickCountry})=>{

    console.log(countries)
    console.log(date)

    const mapStyle = {
        fillColor: "green",
        weight: 1,
        color:'white',
        fillOpacity:1,
    }

    function onMapClick(e) {
        let country = e.sourceTarget.feature.properties.ADMIN
        handlerClickCountry(country)
        // if (countrylist.length<4 && !countrylist.includes(country)){
        //     countrylist.push(country)
        // }
        // console.log(countrylist)
        // handlerClickCountryList(countrylist);
    }

    const onEachCountry = (country,layer)=>{
        layer.options.fillColor = country.properties.color;
        const name = country.properties.ADMIN;
        layer.bindPopup(`${name}`);
        layer.on({
            click:onMapClick
        })
    }

    const { getCode, getName } = require('country-list');

    return <MapContainer style={{ width:"45vw", height:"80vh"}} center ={[0,0]} zoom = {1} scrollWheelZoom={false}  dragging={false} doubleClickZoom={false} scrollWheelZoom={false} attributionControl={false} zoomControl={false}>
    <GeoJSON data={countries} style={mapStyle} onEachFeature={onEachCountry}></GeoJSON>
    </MapContainer>
}

export default CovidMap;


