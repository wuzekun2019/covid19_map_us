import React, { Component } from 'react'
import { CSVLink } from "react-csv";

var TrackData = []

function formatDate_(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear().toString().substring(2);
  
    return [month, day, year].join('/');
  }

var last_click = []
var state_list = []
var last_second = 0

export default class DataTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSet: {},
            seconds:0,
          };
    }

//     update_tracker = () => {
//         if(this.props.startTask){
//             let dataset={}

//             dataset['userNo'] = this.props.userNo
//             dataset['taskNo'] = this.props.taskNo

//             if (this.props.click_cood !=   last_click ){
//                 dataset['mouse_click_cood'] = this.props.click_cood
//                 last_click = this.props.click_cood
//             }
//             else{
//                 dataset['mouse_click_cood'] = [0,0]
//             }

//             dataset['date'] = this.props.date
//             if (this.props.buttonchoice.length == 0){
//                 dataset['buttonchoice'] = 0
//             }
//             else{
//                 dataset['buttonchoice'] = this.props.buttonchoice
//             }
//             this.setState({dataSet: dataset})
//             console.log(this.state.seconds)
//             let dataset_ = this.state.dataSet;
//             this.state.seconds = this.state.seconds + 0.25
//             dataset_['time'] = this.state.seconds;
//             this.setState({dataSet: dataset_})
//             TrackData.push(this.state.dataSet)
//     }
// }

    componentDidMount() {
        this.interval = setInterval(()=>this.setState({seconds: this.state.seconds+0.2}), 200)
    }

    componentWillMount() {
        let dataset={}
        dataset['userNo'] = 'test'
        dataset['taskNo'] =  0
        dataset['mouse_click_cood'] = []
        dataset['date'] = '1/22/20'
        dataset['buttonchoice'] = 0
        this.setState({dataSet: dataset})
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // componentWillReceiveProps() {
    //     if(this.props.startTask){
    //         let dataset={}
    //         // for (let i=0;i<this.props.dataset.length-1;i++){
    //         //     let data = this.props.dataset[i]
    //         //     dataset[data["Province_State"]+'Confirmed']=data[formatDate_(this.props.date)]
    //         // }
    //         // for (let i=0;i<this.props.dataset_.length-1;i++){
    //         //     let data_ = this.props.dataset_[i]
    //         //     dataset[data_["Province_State"]+'Death']=data_[formatDate_(this.props.date)]
    //         // }
    //         // for (let i=0;i<this.props.dataset__.length-1;i++){
    //         //     let data__ = this.props.dataset__[i]
    //         //     dataset[data__["Province_State"]+'Recovered']=data__[formatDate_(this.props.date)]
    //         // }
    //         dataset['userNo'] = this.props.userNo
    //         dataset['taskNo'] = this.props.taskNo

    //         if(this.props.click_cood!=last_click ){
    //             dataset['mouse_click_cood'] = this.props.click_cood
    //             last_click = this.props.click_cood
    //         }
    //         else{
    //             dataset['mouse_click_cood'] = []
    //         }

    //         if (this.props.date.length!=0){
    //             dataset['date'] = this.props.date
    //         }
    //         else{
    //             dataset['date'] = '1/22/20'
    //         }


    //         if (this.props.buttonchoice.length == 0){
    //             dataset['buttonchoice'] = 0
    //         }
    //         else{
    //             dataset['buttonchoice'] = this.props.buttonchoice
    //         }

    //         dataset['selected_states'] = this.props.clickstates
    //         dataset['clicked_state'] = this.props.clickstate
            
    //         dataset['time'] = this.state.seconds

    //         this.setState({dataSet: dataset})

    //         TrackData.push(this.state.dataSet)
    //     }
    // }

    render() {
        if(this.props.startTask){
            if(last_second != this.state.seconds){
                last_second = this.state.seconds
                let dataset={}
                dataset['userNo'] = this.props.userNo
                dataset['taskNo'] = this.props.taskNo

                if(this.props.click_cood!=last_click ){
                        dataset['mouse_click_cood'] = this.props.click_cood
                        last_click = this.props.click_cood
                }
                else{
                    dataset['mouse_click_cood'] = []
                }

                if (this.props.date.length!=0){
                    dataset['date'] = this.props.date
                }
                else{
                    dataset['date'] = '1/22/20'
                }


                if (this.props.buttonchoice.length == 0){
                    dataset['buttonchoice'] = 0
                }
                else{
                    dataset['buttonchoice'] = this.props.buttonchoice
                }

                let selected_states = []
                for (let i=0;i<this.props.clickstates.length;i++){
                    selected_states.push(this.props.clickstates[i])
                }
                dataset['selected_states'] = selected_states
                dataset['clicked_state'] = this.props.clickstate
                dataset['mouse_coodinates'] = this.props.cood
                
                dataset['time'] = this.state.seconds

                this.setState({dataSet: dataset})
                TrackData.push(dataset)
            }
        }

        return (
            <div>
                <CSVLink data={TrackData}>Download me</CSVLink>;
            </div>
        )
    }
}
