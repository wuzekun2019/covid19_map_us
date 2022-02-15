import React, { Component, useEffect, useRef } from 'react';
import {MapContainer, GeoJSON, TileLayer, Marker, Popup, Circle, useMap} from 'react-leaflet';
import csvConfirmed from '../data/CSVConfirmedglobal.csv'
import "leaflet/dist/leaflet.css"
import './CovidMap.css'

const mapStyle = {
    fillColor: "green",
    weight: 1,
    color:'white',
    fillOpacity:1,
}

const { getCode, getName } = require('country-list');

function findValue(arr, key){
    return arr.find(function(o){ return o.key===key }).value;
}

// Color[] colors = {
//     new Color(0f, 0.407f, 0.215f, 1.0f),  #006837
//     new Color(0.101f, 0.596f, 0.313f, 1.0f), #1a9850
//     new Color(0.4f, 0.741f, 0.388f, 1.0f), #66bd63
//     new Color(0.650f, 0.850f, 0.415f, 1.0f), #a6d96a
//     new Color(0.850f, 0.937f, 0.545f, 1.0f), #d9ef8b
//     new Color(1f, 1f, 0.749f, 1.0f), #ffffbf
//     new Color(0.996f, 0.878f, 0.545f, 1.0f),#fee08b
//     new Color(0.992f, 0.682f, 0.380f, 1.0f),#fdae61
//     new Color(0.956f, 0.427f, 0.262f, 1.0f),#f46d43
//     new Color(0.843f, 0.188f, 0.152f, 1.0f),#d73027
//     new Color(0.647f, 0.0f, 0.149f, 1.0f),#a50026
// };

function getColor(d) {
    return d > 100000 ? '#a50026':
           d > 50000 ? '#d73027':  
           d > 40000 ? '#f46d43' :
           d > 30000 ? '#fdae61' :
           d > 20000  ? '#fee08b' :
           d > 10000  ? '#ffffbf' :
           d > 8000  ? '#d9ef8b' :
           d > 5000   ? '#a6d96a' :
           d > 2000   ? '#66bd63' :
           d > 1000   ? '#1a9850' :
                      '#006837';
}

export default class CovidMap_ extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            mapData: {},
            myStyle:{}
          };
    }

    componentWillReceiveProps() {

        let mapset={}

        let dataset = this.props.dataset

        for (let i=0;i<dataset.length;i++){
            let data = dataset[i]
            mapset[data["Country"]]=data[this.props.date]
        }

        this.setState({mapData: mapset})

    }

    onMapClick = (e) => {
        let country = e.sourceTarget.feature.properties.ADMIN
        this.props.handlerClickCountry(country)
        // if (countrylist.length<4 && !countrylist.includes(country)){
        //     countrylist.push(country)
        // }
        // console.log(countrylist)
        // handlerClickCountryList(countrylist);
    }

    onEachCountry = (country,layer)=>{
        // layer.options.fillColor = "green";
        const name = country.properties.ADMIN;
        // console.log(layer.defaultOptions.style)
        if (name){
            layer.bindPopup(`${name}`)
        }
        layer.on({
            click:this.onMapClick
        })
    }

    renderCountries = (countryGeoJson, mapData) => {

        return countryGeoJson.map(country => {
            // let style = () => { color: 'green' };     
            let name = country.properties.ADMIN;
            let d = mapData[name] 
            let color = getColor(d)
            let style = {
                fillColor: color,
                weight: 1,
                color:'white',
                fillOpacity:1};
            return (
                <GeoJSON key={name} data={country} style={style} onEachFeature={this.onEachCountry}/>
              );
        });
      }
    

    render() {

        return (
            <div>
                <div>
                <MapContainer style={{ width:"50vw", height:"80vh"}} center ={[0,0]} zoom = {1} scrollWheelZoom={false}  dragging={false} doubleClickZoom={false} scrollWheelZoom={false} attributionControl={false} zoomControl={false}>
                    {/* <GeoJSON data={this.props.countries} style={mapStyle} onEachFeature={this.onEachCountry}></GeoJSON> */}
                    {this.renderCountries(this.props.countries,this.state.mapData)}
                    <div id="button-wrapper">
                        <input type="button" id="Btn1" value="Confirmed"/>
                        <input type="button" id="Btn2" value="Death" /> 
                        <input type="button" id="Btn3" value="Recovered" />
                    </div>
                </MapContainer>
                </div>
            </div>
            
        )
    }
}
