import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
/*const data = [
  {
    name: 'Page A',
    sleep: 4000,
    exercise: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    sleep: 3000,
    exercise: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    sleep: 2000,
    exercise: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    sleep: 2780,
    exercise: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    sleep: 1890,
    exercise: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    sleep: 2390,
    exercise: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    sleep: 3490,
    exercise: 4300,
    amt: 2100,
  },
];*/

export const Example = (data) => {
  // break up data into a list of objects
  const formattedData = [{
    name: "Execise Time",
    time: Math.floor(data["exercise_time"] / 60)
  }, {
    name: "Social Interaction Time",
    time: Math.floor(data["social_interaction_time"] / 60)
  }, {
    name: "Work Time",
    time: Math.floor(data["work_time"] / 60)
  }, {
    name: "Sleep Time",
    time: Math.floor(data["sleep_time"] / 60)
  }]
  console.log(formattedData)

  return (
    <BarChart
      width={800}
      height={300}
      data={formattedData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name">
        <Label value="Activity" offset={-2} position="insideBottom" />
      </XAxis>
      <YAxis label={{ value: 'Time (Hours)', angle: -90, position: 'insideLeft' }}/>
      <Tooltip />
      <Bar dataKey="time" fill="#8884d8"/>
    </BarChart>
  );
}
