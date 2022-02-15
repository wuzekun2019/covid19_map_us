import React, { useState, useEffect, Component} from "react";
import Tasks from './Tasks';
import './Covid.css'

import Confirmedus1 from '../data/Confirmedus1.json'
import Confirmedus2 from '../data/Confirmedus2.json'
import Confirmedus3 from '../data/Confirmedus3.json'
import Confirmedus4 from '../data/Confirmedus4.json'
import Confirmedus5 from '../data/Confirmedus5.json'

import Deathus1 from '../data/Deathus1.json'
import Deathus2 from '../data/Deathus2.json'
import Deathus3 from '../data/Deathus3.json'
import Deathus4 from '../data/Deathus4.json'
import Deathus5 from '../data/Deathus5.json'

import Recoveredus1 from '../data/Recoveredus1.json'
import Recoveredus2 from '../data/Recoveredus2.json'
import Recoveredus3 from '../data/Recoveredus3.json'
import Recoveredus4 from '../data/Recoveredus4.json'
import Recoveredus5 from '../data/Recoveredus5.json'

var confirmeds = [Confirmedus1,Confirmedus2,Confirmedus3,Confirmedus4,Confirmedus5]
var deaths = [Deathus1,Deathus2,Deathus3,Deathus4,Deathus5]
var recovereds = [Recoveredus1,Recoveredus2,Recoveredus3,Recoveredus4,Recoveredus5]

export default class UserTask extends Component {

    constructor(props){
        super(props);
        this.state = { 
            value:'',
            timeInterval:0
    };
        // this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    updateTimeInterval = t => {
        this.setState({timeInterval: t})
    }

    componentDidUpdate() {
        var resultConfirmed = confirmeds[this.state.timeInterval]
        var resultDeath =  deaths[this.state.timeInterval]
        var resultRecovered = recovereds[this.state.timeInterval]

        this.props.handlerDataset(resultConfirmed)
        this.props.handlerDataset_(resultDeath)
        this.props.handlerDataset__(resultRecovered)
        this.props.handlerTimeInterval_(this.state.timeInterval)
    }

    componentWillMount() {
        var resultConfirmed = confirmeds[0]
        var resultDeath =  deaths[0]
        var resultRecovered = recovereds[0]

        this.props.handlerDataset(resultConfirmed)
        this.props.handlerDataset_(resultDeath)
        this.props.handlerDataset__(resultRecovered)
    }

    handleSubmit = event =>{
        event.preventDefault()
        let username = document.getElementById("username").value
        this.setState({value:{username}});
        this.props.handlerUserNo(username)
        this.props.handlerTaskNo(1)
        this.props.handlerTaskStart(true)
        this.props.handlerTimeInterval_(0)
    };

    render() {
        return <div>{
            this.state.value == ''?
            <form onSubmit={this.handleSubmit} class = 'userSubmit'>
                UserNo:
                    <input
                    type="text"
                    id="username"
                    value={this.state.username}
                    // onChange={this.handleChange}
                    />
                <input
                type="submit"
                value='Submit'
                />
        </form>:<Tasks handlerTaskNo = {this.props.handlerTaskNo} updateTimeInterval={this.updateTimeInterval}/>}
        </div>;
    }
}
