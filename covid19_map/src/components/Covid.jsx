import React, { useState, useEffect } from "react";
import CovidMap_ from "./CovidMap_";
import CovidMap from "./CovidMap";
// import Legend from "./Legend";
import TimeSlider from "./TimeSlider";
import CovidChart_ from "./CovidChart_";
import Loadcountrytask from "../tasks/Loadcountrytask";
import Title from "./Title";
import './Covid.css'

const Covid=() => {

    const [countries, setCountries] = useState([])
    const [country,setCountry] = useState([])
    const [date, setDate] = useState([])
    const [dataset, setDataset] = useState([])
    const [buttonchoice, setButtonchoice] = useState([])

    const handlerSliderDate = (date) =>{
        setDate(date)    
    }

    const handlerClickCountry = (country) =>{
        setCountry(country)
    }

    const handlerChartDateset = (dataset) =>{
        setDataset(dataset)
    }

    const handlerButtonChoice = (dataset) =>{
        setButtonchoice(buttonchoice)
    }

    const load = ()=>{
        const loadcountrytask = new Loadcountrytask(date);
        loadcountrytask.load(setCountries,date);
    }

    useEffect(load,[]);//page load 

    return (

    <div>{
    countries.length ===0?
    <div>Loading</div>:
    <div>
        <Title/>
        <div className ='rowC'>
                <CovidChart_ country={country} date={date} handlerChartDateset={handlerChartDateset}/>
            <div className='CovidMap'>
                <CovidMap_ countries={countries} date={date} dataset={dataset} handlerClickCountry={handlerClickCountry} handlerButtonChoice={handlerButtonChoice}/>
                <TimeSlider handlerSliderDate = {handlerSliderDate}/>
            </div>
         </div>
        </div>}
    </div>)
}

export default Covid;