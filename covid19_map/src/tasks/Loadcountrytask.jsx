import Papa from "papaparse"
import csvConfirmed from '../data/CSVConfirmedglobal.csv'
import {features} from "../data/countries.json"

class Loadcountrytask{

    constructor(date){
        this.date = date;
    }

    mapCountries = features;
    setState = null;


    load = (setState,date)=>{

        this.setState = setState;
        Papa.parse(csvConfirmed, {
            download: true,
            header:true,
            complete: (input)=>{
                 const records = input.data;
                //  this.#processCovidData(records)
                 this.setState(this.mapCountries)
            }
        });
    }

    #processCovidData = (covidCountries) => {

        for (let i = 0; i < this.mapCountries.length; i++){
            const mapCountry = this.mapCountries[i];

            mapCountry.properties.confirmed = 0;
            mapCountry.properties.confirmedText = "0";

        }
        this.setState(this.mapCountries)
    }

}

export default Loadcountrytask;