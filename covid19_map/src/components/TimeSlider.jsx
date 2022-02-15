import React, {Component} from "react";
import ReactDOM from "react-dom";
import Slider, { createSliderWithTooltip, Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const style = { width: 600, margin: 50 };

// First date w/ data CSSE dataset
const date_of_first_record = new Date("01/22/2020");
const date_of_last_record= new Date("02/03/2021");

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear().toString();

  return [month, day, year].join('/');
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default class TimeSlider extends Component {
    constructor(props) {
        super(props);
        // this.handleDateChange = this.handleDateChange.bind(this);
        // this.handleChange = this.handleChange.bind(this);

        this.state = {
          value: 0
        };
      }

      handleDateChange(selectedDate) {
        this.setState({ "date": selectedDate });
      };

    handleChange = (event,newValue) => {
        var result = new Date("01/22/2020");
        result.setDate(result.getDate() + newValue);
        this.props.handleDateChange(formatDate(result));
    }

    onSliderChange = value => {
        var result = new Date("01/22/2020");
        result.setDate(result.getDate() + value);

        this.setState(
          {
            value
          },
        );
        this.props.handlerSliderDate(formatDate(result));  
    };

    render() {

      const difference_in_time = date_of_last_record.getTime() - date_of_first_record.getTime();
      const difference_in_days = Math.floor(difference_in_time / (1000 * 3600 * 24)) ;

        return (

            <div className='SliderDate' style={{ margin: 20 }}>   
                
                <div>
                    <button onClick={()=> {this.setState({value:this.state.value-1})}} class='date'> - </button>
                    <p class='date'>Current date: {formatDate(addDays(date_of_first_record,this.state.value))}</p>
                    <button onClick={()=> {this.setState({value:this.state.value+1})}} class='date'> + </button>
                </div>

                <Slider
                  min={0}
                  max={difference_in_days}
                  value={this.state.value}
                  onChange={this.onSliderChange}
                  railStyle={{
                  height: 2
                  }}
          
                  handleStyle={{
                  height: 14,
                  width: 14,
                  marginLeft: -14,
                  marginTop: -14,
                  backgroundColor: "red",
                  border: 0
                  }}

                  trackStyle={{
                  background: "none"
                  }}
                />
            </div>
        )
    }
}

