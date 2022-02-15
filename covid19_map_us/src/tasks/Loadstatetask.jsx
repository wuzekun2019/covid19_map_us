import Papa from "papaparse"
// import csvConfirmed from '../data/CSVConfirmedglobal.csv'
import csvConfirmed from '../data/CSVConfirmedus.csv'
import {features} from "../data/us.json"

class Loadstatetask{

    constructor(date){
        this.date = date;
    }

    mapStates= features;
    setState = null;


    load = (setState,date)=>{

        this.setState = setState;
        Papa.parse(csvConfirmed, {
            download: true,
            header:true,
            complete: (input)=>{
                 const records = input.data;
                //  this.#processCovidData(records)
                 this.setState(this.mapStates)
            }
        });
    }

    #processCovidData = (covidStates) => {

        for (let i = 0; i < this.mapStates.length; i++){
            const mapState= this.mapStates[i];

            mapState.properties.confirmed = 0;
            mapState.properties.confirmedText = "0";

        }
        this.setState(this.mapStates)
    }

}

export default Loadstatetask;