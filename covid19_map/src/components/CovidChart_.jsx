import Papa from "papaparse"
import csvConfirmed from '../data/CSVConfirmedglobal.csv'
import csvDeath from '../data/CSVDeathglobal.csv'
import csvRecovery from '../data/CSVRecoveredglobal.csv'
import React, { Component } from 'react'
import fs from 'fs'
import { Line } from "react-chartjs-2";

var urls = [csvConfirmed,csvDeath,csvRecovery]

var resultConfirmed, resultDeath, resultRecovery;
var files = [csvConfirmed,csvDeath,csvRecovery]

var countrylist = []
var chartset = []

// var dataset;


export default class CovidChart_ extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            data: []
          };
    }

    componentWillReceiveProps({country,date}) {
        if (country && date){
            this.updateData(resultConfirmed,resultDeath,resultRecovery,country,date,countrylist);
        }
    }

    componentWillMount() {
        Promise.all(//pass array of promises to Promise.all
            urls//you have an array of urls
            .map(//map urls to promises created with parse
              url=>
                new Promise(//create one promise
                  (resolve,reject)=>
                    Papa.parse(
                      url,
                      {
                        header: true,
                        download: true,
                        dynamicTyping: true,
                        complete:resolve,//resolve the promise when complete
                        error:reject//reject the promise if there is an error
                      }
                    )
                )
            )
          )
          .then(
            (results) => {
                resultConfirmed=results[0];
                resultDeath=results[1];
                resultRecovery=results[2]
                this.updateData(resultConfirmed.data,resultDeath.data,resultRecovery.data,this.props.country,this.props.date, countrylist)
            }
          )
          .catch(//log the error
            err=>console.warn("Something went wrong:",err)
          )
    }

    updateData(result1, result2, result3, country, date, countrylist) {

        let include = false; 

        for (let i=0;i<countrylist.length;i++){
            if(countrylist[i]===country){
                include =true;
                break;
            }
        }

        if (date!==this.props.date){
            chartset=[]
            let dataset
            let confirmed_data = [], death_data = [], recovery_data = [];
            let labels = []
            let resultConfirmed = result1.data, resultDeath = result2.data, resultRecovery = result3.data 

            // #processCovidData = (covidCountries) => {

            //     for (let i = 0; i < this.mapCountries.length; i++){
            //         const mapCountry = this.mapCountries[i];
        
            //         mapCountry.properties.confirmed = 0;
            //         mapCountry.properties.confirmedText = "0";
        
            //     }
            //     this.setState(this.mapCountries)
            // }

            this.props.handlerChartDateset(resultConfirmed)

            for (let i=0;i<countrylist.length;i++){

                let country = countrylist[i]

                if( resultConfirmed || resultDeath || resultRecovery){

                    resultConfirmed.filter(d=>d.Country==country).map((filter_d)=>{
                        for (const d of Object.keys(filter_d).slice(1,-1)) {
                            if (d==date){
                                break;
                            }
                            confirmed_data.push(filter_d[d])
                        }

                        labels= Object.keys(filter_d).slice(1,confirmed_data.length+1)
                    })
    
                    resultDeath.filter(d=>d.Country==country).map((filter_d)=>{
                        for (const d of Object.keys(filter_d).slice(1,-1)) {
                            if (d==date){
                                break;
                            }
                            death_data.push(filter_d[d])
                        }
                    })
    
                    resultRecovery.filter(d=>d.Country==country).map((filter_d)=>{
                        for (const d of Object.keys(filter_d).slice(1,-1)) {
                            if (d==date){
                                break;
                            }
                            recovery_data.push(filter_d[d])
                        }
                    })
    
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
                            label: 'Recovery',
                            data: recovery_data,
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


        if (countrylist.length<4 && !include && country.length!==0){
            countrylist.push(country)
            let confirmed_data = [], death_data = [], recovery_data = [];
            let labels = []
            let resultConfirmed = result1.data, resultDeath = result2.data, resultRecovery = result3.data

            let dataset

            if( resultConfirmed || resultDeath || resultRecovery){

                resultConfirmed.filter(d=>d.Country==country).map((filter_d)=>{
                    for (const d of Object.keys(filter_d).slice(1,-1)) {
                        if (d==date){
                            break;
                        }
                        confirmed_data.push(filter_d[d])
                    }

                    labels= Object.keys(filter_d).slice(1,confirmed_data.length+1)
                })

                resultDeath.filter(d=>d.Country==country).map((filter_d)=>{
                    for (const d of Object.keys(filter_d).slice(1,-1)) {
                        if (d==date){
                            break;
                        }
                        death_data.push(filter_d[d])
                    }
                })

                resultRecovery.filter(d=>d.Country==country).map((filter_d)=>{
                    for (const d of Object.keys(filter_d).slice(1,-1)) {
                        if (d==date){
                            break;
                        }
                        recovery_data.push(filter_d[d])
                    }
                })

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
                        label: 'Recovery',
                        data: recovery_data,
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

        const options = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                // title: {
                //     display: true,
                //     text: this.props.country,
                //     padding: {
                //         top: 10,
                //         // bottom: 30
                //         }
                //     },
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
                {this.state.chartData.map((n, index) => {
                    
                var ds=[]
                var l = n.labels;
                var d0 = [n.datasets[0]]

                ds = {
                    labels: l,
                    datasets: d0
                };

                console.log(ds)
                console.log(n)

                return (
                    <div class={index}>
                        <h3> {countrylist[index]} </h3>,
                            <Line options= {options} key={index} data={n}/>
                    </div>
                )})}
            <div class="fixed_button">
                <button onClick={()=> {this.setState({data:[],chartData:[]});countrylist=[];chartset=[]}}>Clear All</button>
            </div>
            </div>
        )
    }
}
