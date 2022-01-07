import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './App.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Centers from './Centers';




const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: "aquamarine",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2),
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 275,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

let today = new Date();

function App() {
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [centers, setCenters] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(`${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`)
  }, [])

  const classes = useStyles();

  function handleChange(e) {
    setState(e.target.value)
    console.log(state);
  }

  function handleDistrictChange(e) {
    setDistrictId(e.target.value);
    console.log(districtId);
  }

  useEffect(() => {
    axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then((response) => {
        setStates(response.data.states);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])

  useEffect(() => {
    async function fetchDistrict() {
      try {
        let districtData = await axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state}`);
        setDistricts(districtData.data.districts)
      } catch (error) {
        console.error(error);
      }
    }

    fetchDistrict();
  }, [state])

  useEffect(() => {
    async function getCenters() {
      try {
        const response = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`)
        setCenters(response.data.sessions)
        // console.log(response)
      } catch (error) {
        console.log(error)
      }

    }

    getCenters();
  }, [districtId, date]);

  return (
    <div className="App">
      <div className="forms">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">States</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={state}
            onChange={handleChange}
            label="States"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              states.map((s) => {
                return <MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>
              })
            }
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Districts</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={districtId}
            onChange={handleDistrictChange}
            label="District"
          >
            {
              districts.map((d) => {
                return <MenuItem key={d.district_id} value={d.district_id}>{d.district_name}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </div>


      {centers.length === 0 ? <div></div> : <div styles={{ width: "90vw"}}>
        <Centers centers={centers} />
      </div>}
    </div>
  );
}

export default App;
