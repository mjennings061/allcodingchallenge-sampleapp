import React, { useState, useEffect } from 'react';
import './App.css';
import { BasicTable } from './components/table'
import { ButtonAppBar } from "./components//navbar"
import { Example } from "./components//charts"
import { CustomizedTimeline } from './components/timeline'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { PieChart } from 'react-minimal-pie-chart';
import { Button, ButtonGroup, TextField } from "@material-ui/core/"

function App() {
  // const [data, setData] = useState([{"id": 1, "employee_id": 6298, "month": "January", "exercise_time": 224, "social_interaction_time": 60, "work_time": 2220, "sleep_time": 2100}, {"id": 2, "employee_id": 6299, "month": "January", "exercise_time": 224, "social_interaction_time": 60, "work_time": 2220, "sleep_time": 2100}]);
  const [selectedMonth, setSelectedMonth] = useState(0)
  console.log(selectedMonth)

  const months = function () {
      const arrMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
          "November", "December"]
      return arrMonths.map((name, index) => {
          let selectedColor = index != selectedMonth ? "#3f51b5" : "#DC143C"
          return (
              <Button style={{ color: selectedColor }} onClick={() => { setSelectedMonth(index) }} >{name}</Button>
          )
      })
  }

  const useStyles = makeStyles({
    root: { width: '80%', overflowY: "auto" },
    table: {
      minWidth: 650,
      height: '500px',
      overflowY: "hidden",
      top: "100px"
    },
  });

  const classes = useStyles();


  const [data, setData] = useState([])
  const [dataLoad, setDataLoad] = useState(false)
  const url = 'http://localhost:5000/'
  useEffect(async () => {
    const result = await axios({
      url: url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      responseType: 'json',
    })

    setData(result.data)
    console.log(data)
    setDataLoad(true);
  }, [dataLoad]);



  return (
    <div className="App">

      <ButtonAppBar />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} className={classes.table}>
          <BasicTable data={data} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">
            Progress Chart
      </Typography>
          <Example />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>

    <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
            {months()}
          </ButtonGroup>
        </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={16} sm={4}>
            <Typography variant="h4">
              Work Life Balance Over a Year
      </Typography>
            <PieChart
              data={[
                { title: 'Work Time', value: 12390, color: '#DC143C' },
                { title: 'Exercise Time', value: 2297, color: '#8884d8' },
                { title: 'Sleep Time', value: 12727.5, color: '#82ca9d' },
                { title: 'Social Time', value: 947, color: '#3f51b5' },
              ]}
              viewBoxSize={[100, 100]}
              paddingAngle={[5]}
              radius={[40]}
            />;
    </Grid>
          <Grid item xs={16} sm={4}>
            <Typography variant="h4">
              Work Life Balance for 6299
      </Typography>
            <PieChart
              data={[
                { title: 'Work Time', value: 12088, color: '#DC143C' },
                { title: 'Exercise Time', value: 3180, color: '#8884d8' },
                { title: 'Sleep Time', value: 12434, color: '#82ca9d' },
                { title: 'Social Time', value: 895, color: '#3f51b5' },
              ]}
              viewBoxSize={[100, 100]}
              paddingAngle={[5]}
              radius={[40]}
            />;
    </Grid>
          <Grid item xs={16} sm={4}>
            <Typography variant="h4">
              Work Life Balance Target
      </Typography>
            <PieChart
              data={[
                { title: 'Work Time', value: 40, color: '#DC143C' },
                { title: 'Exercise Time', value: 22, color: '#8884d8' },
                { title: 'Sleep Time', value: 45, color: '#82ca9d' },
                { title: 'Social Time', value: 22, color: '#3f51b5' },
              ]}
              viewBoxSize={[100, 100]}
              paddingAngle={[5]}
              radius={[40]}
            />;
    </Grid>
        </Grid>

        <CustomizedTimeline />
    </div>
  );
}

export default App;
