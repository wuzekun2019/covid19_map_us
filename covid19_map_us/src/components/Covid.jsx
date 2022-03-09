import React, { useState, useEffect } from "react";
import CovidMap_ from "./CovidMap_";
// import Legend from "./Legend";
import TimeSlider from "./TimeSlider";
import CovidChart_ from "./CovidChart_";
// import Loadcountrytask from "../tasks/Loadcountrytask";
import DataTracker from "./DataTracker";
import Loadstatetask from "../tasks/Loadstatetask";
import Title from "./Title";
import UserTask from "./UserTask";
import './Covid.css'

const Covid=() => {

    const [timeInterval_,setTimeInterval_] = useState([])

    const [taskNo,setTaskNo] = useState([])
    const [userNo,setUserNo] = useState([])
    const [startTask,setTaskStart] = useState(false)

    const [date, setDate] = useState([])
    const [dataset, setDataset] = useState([])
    const [dataset_, setDataset_] = useState([])
    const [dataset__, setDataset__] = useState([])
    const [buttonchoice, setButtonchoice] = useState([])

    const [states, setStates] = useState([])
    const [state,setState] = useState([])
    const [clickstates,setClickStates] = useState([])

    const [cood,setCood] =  useState([]) 
    const [click_cood,setClickCood] =  useState([]) 

    const handlerTimeInterval_ = (timeInterval_) =>{
        setTimeInterval_(timeInterval_)
    }

    const handlerTaskNo = (taskNo) =>{
        setTaskNo(taskNo)
    }

    const handlerUserNo = (userNo) =>{
        setUserNo(userNo)
    }

    const handlerTaskStart = (startTask) =>{
        setTaskStart(startTask)
    }

    const handlerCood= (cood) =>{
        setCood(cood)
    }   

    const handlerClickCood= (click_cood) =>{
        setClickCood(click_cood)
    }   

    const handlerSliderDate = (date) =>{
        setDate(date)    
    }

    const handlerClickState = (state) =>{
        setState(state)
    }

    const handlerClickStates = (clickstates) =>{
        setClickStates(clickstates)
    }

    const handlerDataset = (dataset) =>{
        setDataset(dataset)
    }

    const handlerDataset_ = (dataset_) =>{
        setDataset_(dataset_)
    }

    const handlerDataset__ = (dataset__) =>{
        setDataset__(dataset__)
    }

    const handlerButtonChoice = (buttonchoice) =>{
        setButtonchoice(buttonchoice)
    }

    const load = ()=>{
        // const loadcountrytask = new Loadcountrytask(date);
        // loadcountrytask.load(setCountries,date);

        const loadstatetask = new Loadstatetask(date);
        loadstatetask.load(setStates,date);
        
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }


    useEffect(load,[]);//page load 


    return (


    <div>{
    states.length ===0?
    <div>Loading</div>:
    <div>
        <Title/>
        <UserTask handlerTimeInterval_={handlerTimeInterval_} handlerTaskNo = {handlerTaskNo} handlerUserNo = {handlerUserNo} handlerTaskStart = {handlerTaskStart} handlerDataset={handlerDataset} handlerDataset_={handlerDataset_} handlerDataset__={handlerDataset__}/>
        <div className ='rowC'>
                <CovidChart_ timeInterval={timeInterval_} state={state} dataset={dataset} dataset_={dataset_} dataset__={dataset__}  handlerClickStates={handlerClickStates} taskNo={taskNo}/>
            <div className='CovidMap'>
                <CovidMap_ timeInterval={timeInterval_} states={states} date={date} dataset={dataset} dataset_={dataset_} dataset__={dataset__} handlerClickState={handlerClickState} handlerButtonChoice={handlerButtonChoice} handlerCood={handlerCood} handlerClickCood={handlerClickCood} />
                <TimeSlider timeInterval={timeInterval_}  taskNo={taskNo} handlerSliderDate = {handlerSliderDate} />
            </div>
         </div>
         <DataTracker startTask={startTask} timeInterval={timeInterval_} userNo={userNo} taskNo={taskNo} date={date} dataset={dataset} dataset_={dataset_} dataset__={dataset__} buttonchoice={buttonchoice} cood={cood} click_cood={click_cood} clickstates={clickstates} clickstate={state}/>
        </div>}
    </div>)
}

export default Covid;