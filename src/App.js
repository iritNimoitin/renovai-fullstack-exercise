import { useDispatch } from "react-redux";
import "./App.css";
import AssignmentsGrid from "./components/AssignmentsGrid";
import DriversGrid from "./components/DriversGrid";
import { setConnections, setDrivers, setTasks } from "./store/actions/actions";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    const res = await axios.get(
      "http://localhost:3001/api/connections/getConnections"
    );
    dispatch(setConnections(res.data));
  };

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
    fetchConnections();
  }, []);

  return (
    <div className="App">
      <DriversGrid />
      <AssignmentsGrid />
    </div>
  );
}

export default App;
