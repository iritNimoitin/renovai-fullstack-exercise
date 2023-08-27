import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AssignmentsGrid from "./components/AssignmentsGrid";
import DriversGrid from "./components/DriversGrid";
import { tasksSelector, driversSelector } from "./store/selectors";
import { getDrivers, incCounter, setDrivers, setTasks } from "./store/actions/actions";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const { drivers } = useSelector(driversSelector);
  const { tasks } = useSelector(tasksSelector);

  const fetchDrivers = async () => {
    const res = await axios.get(
      "http://localhost:3001/api/drivers/getDrivers"
    );
    dispatch(setDrivers(res.data));
  };

  const fetchTasks = async () => {
    const res = await axios.get(
      "http://localhost:3001/api/tasks/getTasks"
    );
    dispatch(setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
    fetchDrivers();
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="App">
      <DriversGrid />
      <AssignmentsGrid />
    </div>
  );
}

export default App;
