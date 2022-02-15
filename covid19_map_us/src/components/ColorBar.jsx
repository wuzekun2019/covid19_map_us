import React, { Component } from 'react';
import { BarChart, Bar } from 'recharts';

// Sample data
const data = [
    {  x: 10, y: 10, z: 10 },
];

export default class ColorBar extends Component {
  render() {
    return 
        <BarChart width={10} hight={55} data = {data}>
            <Bar dataKey={'x'} stackId='a' fill='#006837'></Bar>
        </BarChart>
  }
}
