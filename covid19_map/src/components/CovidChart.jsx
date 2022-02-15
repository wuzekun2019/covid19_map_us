import Papa from "papaparse"
import csvConfirmed from '../data/CSVConfirmedglobal.csv'
import csvDeath from '../data/CSVDeathglobal.csv'
import csvRecovery from '../data/CSVRecoveredglobal.csv'
import React, { Component } from 'react'
import fs from 'fs'
import { Line } from "react-chartjs-2";

var urls = [csvConfirmed,csvDeath,csvRecovery]

var resultConfirmed, resultDeath, resultRecovery;
var dataset;

var files = [csvConfirmed,csvDeath,csvRecovery]

var resultConfirmed, resultDeath, resultRecovery;
var dataset;


export default class CovidChart_ extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps({country,date, countrylist}) {
        if (country && date){
            this.updateData(resultConfirmed,resultDeath,resultRecovery,country,date)
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
            function (results) {
                resultConfirmed=results[0];
                resultDeath=results[1];
                resultRecovery=results[2]
                this.updateData(resultConfirmed.data,resultDeath.data,resultRecovery.data,this.props.country,this.props.date)
            }
          )
          .catch(//log the error
            err=>console.warn("Something went wrong:",err)
          )
    }

    updateData( result1, result2, result3, country, date ) {

        
        let confirmed_data = [],death_data = [], recovery_data=[];
        let labels= []
        let resultConfirmed=result1.data, resultDeath=result2.data, resultRecovery=result3.data

        if(resultConfirmed || resultDeath || resultRecovery){
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
        }
    }

    render() {
        const options = {
            maintainAspectRatio: false,
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
                <Line options = {options} data={dataset}/>
            </div>
        )
    }
}
