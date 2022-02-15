import React, {Component} from "react";
import ReactDOM from "react-dom";
import Slider, { createSliderWithTooltip, Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './CovidMap.css'

const style = { width: 600, margin: 50 };

var start_dates = ['1/22/20','6/9/20','10/26/20','3/14/21','7/31/21']
var end_dates = ['6/8/20','10/25/20','3/13/21','7/30/21','12/16/21']

var time_task_no = Array.from(Array(28).keys())


// First date w/ data CSSE dataset
// const date_of_first_record = new Date("01/22/2020");
// const date_of_last_record= new Date("02/03/2021");

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

        this.state = {
          value: 0,
          timeInterval:0,
          taskNo:[],
        };

      }


    componentDidMount() {
        this.setState({timeInterval:0})
        // this.props.handlerTimeInterval(0)
    }

    componentWillReceiveProps() {
      let random_value = Math.random() * (100 - 80) + 80;
      if(time_task_no.includes(this.props.taskNo)){
        if(this.props.taskNo.length!=0 && this.state.timeInterval != this.props.timeInterval){
          console.log(0)
          this.setState({value:random_value})
          this.setState({taskNo:this.props.taskNo})
          this.setState({timeInterval:this.props.timeInterval})
          this.onSliderChange(random_value)
          var result = new Date(start_dates[this.props.timeInterval]);
          result.setDate(result.getDate() + random_value);
          this.props.handlerSliderDate(formatDate(result)); 
          // this.onSliderChange(50)
          // var result = new Date(start_dates[this.state.timeInterval]);
          // result.setDate(result.getDate() + this.state.value);
          // this.props.handlerSliderDate(formatDate(result))
          // console.log(formatDate(result))
        }
      }
      else{
        if(this.state.timeInterval != this.props.timeInterval){
          this.setState({value:random_value})
          // console.log(this.state.value)
          this.setState({taskNo:this.props.taskNo})
          this.setState({timeInterval:this.props.timeInterval})
          this.onSliderChange(0)
        }
      }  
    }

    onSliderChange = (value) => {
        var result = new Date(start_dates[this.props.timeInterval]);
        result.setDate(result.getDate() + value);

        this.setState(
          {
            value
          },
        );
        this.props.handlerSliderDate(formatDate(result)); 
    };

    render() {

      const date_of_first_record = new Date(start_dates[this.state.timeInterval]);
      const date_of_last_record= new Date(end_dates[this.state.timeInterval]);

      const difference_in_time = date_of_last_record.getTime() - date_of_first_record.getTime();
      const difference_in_days = Math.floor(difference_in_time / (1000 * 3600 * 24)) ;

      console.log(this.props)

      return (

          <div className='SliderDate'>   

                {/* <div id="button-wrapper_">
                      <input type="button" id="Btn_" value="1/22/20~6/8/20" onClick={ this.handleClick1 }/>
                      <input type="button" id="Btn_" value="6/9/20~10/25/20" onClick={this.handleClick2}/> 
                      <input type="button" id="Btn_" value="10/26/20~3/13/21" onClick={this.handleClick3}/>
                      <input type="button" id="Btn_" value="3/14/21~7/30/21" onClick={this.handleClick4}/> 
                      <input type="button" id="Btn_" value="7/31/21~12/16/21" onClick={this.handleClick5}/>
                  </div> */}
              
              <div>
                  {/* <button onClick={()=> {this.setState({value:this.state.value-1})}} class='date'> - </button> */}
                  <p class='date'>Current date: {formatDate(addDays(date_of_first_record,this.state.value))} ({((this.state.value/difference_in_days).toFixed(2)*100).toFixed(0)}%)</p>
                  {/* <button onClick={()=> {this.setState({value:this.state.value+1})}} class='date'> + </button> */}
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
                marginLeft: 0,
                marginTop: -10,
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

