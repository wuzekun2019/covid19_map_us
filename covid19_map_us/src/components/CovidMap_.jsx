import React, { Component, useEffect, useRef } from 'react';
import {MapContainer, GeoJSON, TileLayer, Marker, Popup, Circle, useMap} from 'react-leaflet';
// import { Tracker } from 'react-tracker';
import "leaflet/dist/leaflet.css"
import './CovidMap.css'
import ColorBar from './ColorBar';

const mapStyle = {
    fillColor: "green",
    weight: 1,
    color:'white',
    fillOpacity:1,
}

function findValue(arr, key){
    return arr.find(function(o){ return o.key===key }).value;
}

// const colors = {
//     new Color(0f, 0.407f, 0.215f, 1.0f),
//     new Color(0.101f, 0.596f, 0.313f, 1.0f),
//     new Color(0.4f, 0.741f, 0.388f, 1.0f),
//     new Color(0.650f, 0.850f, 0.415f, 1.0f),
//     new Color(0.850f, 0.937f, 0.545f, 1.0f),
//     new Color(1f, 1f, 0.749f, 1.0f),
//     new Color(0.996f, 0.878f, 0.545f, 1.0f),
//     new Color(0.992f, 0.682f, 0.380f, 1.0f),
//     new Color(0.956f, 0.427f, 0.262f, 1.0f),
//     new Color(0.843f, 0.188f, 0.152f, 1.0f),
//     new Color(0.647f, 0.0f, 0.149f, 1.0f)
// };

// // Start is called before the first frame update
// void Start()
// {
//     drawLegend();
// }

// public Color GetColor(float value)
// {
//     if (value < 0) value = 0;
//     else if (value > 1) value = 1;

//     int length = colors.Length - 1;
//     int index0 = (int)(value * length);
//     int index1 = index0 + 1;
//     if (index1 > length) index1 = length;

//     float Range = (value - 1.0f * index0 / length) * length;

//     Color clr = new Color32();
//     float Newr = (1 - Range) * colors[index0].r + Range * colors[index1].r;
//     float Newg = (1 - Range) * colors[index0].g + Range * colors[index1].g;
//     float Newb = (1 - Range) * colors[index0].b + Range * colors[index1].b;
//     clr = new Color(Newr, Newg, Newb, 1.0f);
//     return (clr);
// }

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getColor_(d){
    const reds = [0.0,0.101,0.4,0.650,0.850,1.0,0.996,0.992,0.956,0.843,0.647]
    const greens = [0.407,0.596,0.741,0.850,0.937,1.0,0.878,0.682,0.427,0.188,0.0]
    const blues = [0.215,0.313,0.388,0.415,0.545,0.749,0.545,0.380,0.262,0.152,0.149]
    let index0 = parseInt(10*d);
    let index1 = index0+1;
    if (index1 > 10) index1 = 10;

    let range = (d - index0*1.0/ 10) * 10.0;

    let r = parseInt(((1-range)*reds[index0]+range*reds[index1])*255)
    let g = parseInt(((1-range)*greens[index0]+range*greens[index1])*255)
    let b = parseInt(((1-range)*blues[index0]+range*blues[index1])*255)
    if(r<0||g<0||b<0){
        r=0
        g=0
        b=0
    }
    else if(r>255||g>255||b>255){
        r=255
        g=255
        b=255
    }
    console.log(rgbToHex(r, g, b))
    return rgbToHex(r, g, b)
}

function getColor(d) {
    return d > 0.95 ? '#a50026' :
           d > 0.9  ? '#d73027' :
           d > 0.8  ? '#fdae61' :
           d > 0.7  ? '#fdae61' :
           d > 0.6  ? '#fee08b' :
           d > 0.5  ? '#ffffbf' :
           d > 0.4  ? '#d9ef8b' :
           d > 0.3  ? '#a6d96a' :
           d > 0.2  ? '#66bd63' :
           d > 0.1  ? '#1a9850' :
                      '#006837';
}

function formatDate_(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear().toString().substring(2);;
  
    return [month, day, year].join('/');
  }
  
export default class CovidMap_ extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            mapData: {},
            myStyle:{},
            dataType:0,
            timeInterval:0,
            x:0,
            y:0,
            cx:0,
            cy:0,
            date:[]
          };
        this.handleClick = this.handleClick.bind(this)
        this.handleClick_ = this.handleClick_.bind(this)
        this.handleClick__ = this.handleClick__.bind(this)
    }

    handleClick(){
        // Changing state
        let mapset={}
        this.setState({dataType:0})
        this.props.handlerButtonChoice(0)
        for (let i=0;i<this.props.dataset.length;i++){
            let data = this.props.dataset[i]
            // mapset[data["Country"]]=data[this.props.date]
            mapset[data["Province_State"]]=data[formatDate_(this.props.date)]
            this.setState({mapData: mapset})
        }
      }
    
    handleClick_(){
        // Changing state
        let mapset={}
        this.setState({dataType:1})
        this.props.handlerButtonChoice(1)
        for (let i=0;i<this.props.dataset_.length;i++){
            let data = this.props.dataset_[i]
            // mapset[data["Country"]]=data[this.props.date]
            mapset[data["Province_State"]]=data[formatDate_(this.props.date)]
            this.setState({mapData: mapset})
        }
      }

    handleClick__(){
        // Changing state
        let mapset={}
        this.setState({dataType:2})
        this.props.handlerButtonChoice(2)
        for (let i=0;i<this.props.dataset__.length;i++){
            let data = this.props.dataset__[i]
            // mapset[data["Country"]]=data[this.props.date]
            mapset[data["Province_State"]]=data[formatDate_(this.props.date)]
            this.setState({mapData: mapset})
        }
    }

    logMousePosition = e => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        });
        this.props.handlerCood([this.state.x,this.state.y])
    };

    fgetClickPosition = e => {
        this.setState({
            cx: e.clientX,
            cy: e.clientY
        });
        this.props.handlerClickCood([this.state.cx,this.state.cy])
    }

    componentDidMount() {
        window.addEventListener("click", this.fgetClickPosition);
    }

    componentWillReceiveProps() {

        this.setState({timeInterval:this.props.timeInterval,
                        date:this.props.date})
        
        let mapset={}
        let dataset

        if ( this.state.dataType == 0 ){
            dataset = this.props.dataset
        }
        else if( this.state.dataType == 1 ){
            dataset = this.props.dataset_
        }
        else{
            dataset = this.props.dataset__
        }
        
        for (let i=0;i<dataset.length;i++){
            let data = dataset[i]
            mapset[data["Province_State"]]=data[formatDate_(this.props.date)]
        }
        this.setState({mapData: mapset})
    }

    onMapClick = (e) => {
        let state= e.sourceTarget.feature.properties.NAME
        this.props.handlerClickState(state)
    }

    onEachState = (state,layer)=>{
        // layer.options.fillColor = "green";
        const name = state.properties.NAME;
        // console.log(layer.defaultOptions.style)
        if (name){
            layer.bindPopup(`${name}`)
        }
        layer.on({
            click:this.onMapClick
        })
    }

    renderStates= (stateGeoJson, mapData) => {

        return stateGeoJson.map(state => {
            // let style = () => { color: 'green' };  
            let name = state.properties.NAME;
            let d = mapData[name] 

            let color = getColor_(d)

            let style = {
                fillColor: color,
                weight: 1,
                color:'white',
                fillOpacity:1};
            return (
                <GeoJSON key={name} data={state} style={style} onEachFeature={this.onEachState}/>
              );
        });
      }
    

    render() {
        if(this.props.date!=this.state.date){
            this.componentWillReceiveProps()
        }

        return (

            <div className='Map'>
                <div  id="MapContainer">
                    <MapContainer style={{ width:"45vw", height:"55vh"}} center ={[38,-95]} zoom = {4} scrollWheelZoom={false}  dragging={false} doubleClickZoom={false} scrollWheelZoom={false} attributionControl={false} zoomControl={false}>
                        {this.renderStates(this.props.states,this.state.mapData)}
                    </MapContainer>
                    {/* <ColorBar/> */}
                </div>
                <div id="button-wrapper">
                        <input type="button" id="Btn1" value="Confirmed" onClick={ this.handleClick }/>
                        <input type="button" id="Btn2" value="Death" onClick={this.handleClick_}/> 
                        <input type="button" id="Btn3" value="Recovered" onClick={this.handleClick__}/>
                </div>
            </div>
            
        )
    }
}
