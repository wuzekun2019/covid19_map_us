import React,{ useState, useEffect, Component} from 'react';
import './Covid.css'
import tasks from '../data/tasks'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default class Task extends Component{

    constructor(props){
        super(props);
        this.state = { 
            count:0
         };
    }

    handleNextItem = () => {
        this.setState({
            count:this.state.count+1,
        })
        if (this.state.count+2<=tasks.tasks.length){
            this.props.handlerTaskNo(this.state.count)
            this.props.updateTimeInterval(Math.floor(Math.random()*4))
        }
    };
    

    render() {
        return  this.state.count < tasks.tasks.length ? (
            <div class='activeTask'>
                <button onClick={this.handleNextItem}>Next</button>
                <span class = 'taskName'>{tasks.tasks[this.state.count].title}</span>
            </div>
        ) : <div class='activeTask'> 
                <span class = 'taskName'>End of tasks</span>
            </div>
    }
};

