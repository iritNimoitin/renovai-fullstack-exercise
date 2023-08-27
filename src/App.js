import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AssignmentsGrid from "./components/AssignmentsGrid";
import DriversGrid from "./components/DriversGrid";
import {counterSelector, driversSelector} from "./store/selectors";
import {getDrivers, incCounter, setDrivers} from "./store/actions/actions";
import {useEffect} from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const { drivers } = useSelector(driversSelector);

  useEffect(()=>{
    const foo= async()=>{const res = await axios.get("http://localhost:3001/api/drivers/getDrivers")
    dispatch(setDrivers(res.data))
  }
  foo()
  },[])

  useEffect(()=>{console.log(drivers)},[drivers])

  return (
    <div className="App">
      <DriversGrid />
      <AssignmentsGrid />
      {/*{drivers}*/}
    </div>
  );
}

export default App;
