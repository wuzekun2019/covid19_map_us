import React, { Component } from 'react';
import colorBar from '../data/colorbar.png';

// Sample data
const data = [
    {  x: 10, y: 10, z: 10 },
];

export default class ColorBar extends Component {
  render() {
    return (
        <img src={colorBar}/>
    )
  }
}
