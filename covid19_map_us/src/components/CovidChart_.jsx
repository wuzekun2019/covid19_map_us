import React, { Component } from 'react'
import fs from 'fs'
import { Line } from "react-chartjs-2";

import './CovidMap.css'

var resultConfirmed, resultDeath, resultRecovered;

var statelist = []
var chartset = []

var start_dates = ['1/24/2020','6/11/2020','10/28/2020','3/16/2021','8/2/2021']
var end_dates = ['6/8/20','10/25/20','3/13/2020','7/30/2021','12/16/2021']
// var repeated_click = 0
// var dataset;

var space_task_no = Array(54 - 28 + 1).fill().map((_, idx) => 27 + idx)

function formatDate_(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear().toString().substring(2);;
  
    return [month, day, year].join('/');
  }


export default class CovidChart_ extends Component {

    constructor(props) {
        super(props);
        this.chartReference = React.createRef();
        this.state = {
            chartData: [],
            data: [],
            stateList:[],
            state:[],
            timeInterval:0,
            repeated:0,
            taskNo:-100,
            end_date:[]
          };
    }

    shouldComponentUpdate(props, state) {
        if (props.state !== this.state.state || this.state.data.length==0 || props.taskNo!=this.state.taskNo || props.timeInterval!=this.state.timeInterval) {
          return true;
        }
        else {
          return false;
        }
      }

    reset= () =>{
        this.setState({data:[],chartData:[],state:this.props.state});statelist=[];chartset=[];
    }

    componentWillReceiveProps({state,timeInterval,dataset,dataset_,dataset__,taskNo}) {


        if(timeInterval.length==0){
            this.setState(
                {timeInterval:0,
                 end_date:end_dates[0]
            })
        }
        else{
            this.setState({
                timeInterval:timeInterval,
                end_date:end_dates[timeInterval]
            })
        }

        var resultConfirmed = dataset
        var resultDeath =  dataset_
        var resultRecovered = dataset__

        let end_date = end_dates[timeInterval]

        if(this.props.state!=this.state.state && !space_task_no.includes(this.props.taskNo)){
            this.setState({state:state})
            this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
        }
        else if(statelist.length>0 && !space_task_no.includes(this.props.taskNo) && state!=this.state.state){
            // this.setState({state:[]})
            this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist)         
        }

        if(taskNo!=this.state.taskNo){

            if(!space_task_no.includes(this.props.taskNo)){
                this.reset();
                this.setState({taskNo:this.props.taskNo})
            }
            else{
                console.log(this.props.taskNo)
                if (this.props.taskNo == 27){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Florida'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 28){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Virginia'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 29){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Massachusetts'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 30){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Washington'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 31){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Washington'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 32){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Washington'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 33){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Florida'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 34){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Florida'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 35){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Florida'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 36){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'New York'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 37){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'New York'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 38){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'New York'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 39){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Texas'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 40){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Texas'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 41){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Texas'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 42){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'California'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 43){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Massachusetts'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 44){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'North Carolina'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 45){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Washington'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 46){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'New York'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 47){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Florida'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 48){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'California'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 49){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Texas'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 50){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'North Carolina'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 51){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Arizona'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 52){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'New Jersey'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }
                else if (this.props.taskNo == 53){
                    this.reset();
                    this.setState({taskNo:this.props.taskNo});
                    let state = 'Florida'
                    this.updateData(resultConfirmed,resultDeath,resultRecovered,state,end_date,statelist);
                }

            }
        }
    }

    updateData(resultConfirmed, resultDeath, resultRecovered, state, date, statelist) {

        let include = false; 

        for (let i=0;i<statelist.length;i++){
            if(statelist[i]===state){
                include =true;
                break;
            }
        }

        if (statelist.length<4 && !include && state.length!=0 ){

            statelist.push(state)
            this.setState({stateList:statelist})
            this.props.handlerClickStates(statelist);  

            let confirmed_data = [], death_data = [], recovered_data = [];
            let labels = []
            // let resultConfirmed = result1.data, resultDeath = result2.data,resultRecovered = result3.data

            let dataset

            if( resultConfirmed || resultDeath || resultRecovered ){

                let confirmed_data = Object.values(resultConfirmed.filter(d=>d.Province_State==state)[0]).slice(1,-1)
                let death_data = Object.values(resultDeath.filter(d=>d.Province_State==state)[0]).slice(1,-1)
                let recovered_data = Object.values(resultRecovered.filter(d=>d.Province_State==state)[0]).slice(1,-1)
                let labels = Object.keys(resultConfirmed.filter(d=>d.Province_State==state)[0]).slice(1,confirmed_data.length+1)


                dataset = {
                    labels: labels,
                    datasets: [
                    {
                        label: 'Confirmed',
                        data: confirmed_data,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "rgba(75,192,192,1)"
                    },
                    {
                        label: 'Death',
                        data: death_data,
                        fill: true,
                        backgroundColor: "rgba(245,39,39,0.2)",
                        borderColor: "rgba(245,39,39,1)"
                    },
                    {
                        label: 'Recovered',
                        data: recovered_data,
                        fill: true,
                        backgroundColor: "rgba(39,245,86,0.2)",
                        borderColor: "rgba(39,245,86,1)"
                    }
                    ],
                };

                chartset.push(dataset)

                this.setState({
                    data:dataset,
                    chartData:chartset
                })
            }
        }  
    }


    render() {

        // console.log("statelist:",statelist)
        // console.log("chartset",this.state.chartData)
        // console.log("repeated",this.state.repeated)

        const options = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: true // Hide legend
            },
            scales: {
                y: {
                    display: true // Hide Y axis labels
                },
                x: {
                    display: false // Hide X axis labels
                }
            },
            elements: {
                point:{
                    radius: 0
                }
            } 
        }

        return (
            <div className='CovidChart'>
                {chartset.map((n, index) => {
                    
                var ds=[]
                var l = n.labels;
                var d0 = [n.datasets[0]]

                ds = {
                    labels: l,
                    datasets: d0
                };

                return (
                    <div class={index}>
                        <h3> {statelist[index]} </h3>,
                            <Line options= {options} key={index} data={n}/>
                    </div>
                )})}
                <div id="reset">
                    <button onClick={()=> {this.reset()}}>Clear All</button>
                </div>
            </div>
        )
    }
}
