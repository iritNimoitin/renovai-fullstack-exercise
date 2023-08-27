import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CreateTable from "./CreateTable";
import config from "../configuration/config.json";
import { getAllDrivers } from "../apiRequests/driversApi";
import { useDispatch, useSelector } from "react-redux";
import store from "../store/store";
import SelectBasic from "./Select";
import { setConnections, trigerChoosingDriver } from "../store/actions/actions";
import {
  connectionsSelector,
  driversSelector,
  tasksSelector,
} from "../store/selectors";
import axios from "axios";

export default function DriversGrid() {
  const dispatch = useDispatch();
  const { drivers } = useSelector(driversSelector);
  const { tasks } = useSelector(tasksSelector);
  const { connections } = useSelector(connectionsSelector);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(drivers);
  }, [drivers]);

  useEffect(() => {
    setColumns([
      ...columns.filter((column) => column.field !== "actions"),
      {
        ...columns.find((column) => column.field === "actions"),
        renderCell: (params) => {
          let defaultValue = null;
          for (const [key, value] of Object.entries(connections)) {
            if (value === params.id ) {
              defaultValue = tasks.find((task) => task.lineDisplayId === key);
            }
          }
          return (
            <SelectBasic
              label={"Add Task"}
              params={params}
              defaultValue={defaultValue}
              options={buildOptions()}
              dispatchSelectAction={requestToassignDriverToTask}
            />
          );
        },
      },
    ]);
  }, [connections]);

  const requestToassignDriverToTask = async (driverId, task, callback) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/connections/assignDriverToTask",
        { taskId: task?.lineDisplayId, driverId }
      );
      const newMap = res.data;
      dispatch(setConnections(newMap));
      callback(task);
    } catch (error) {
      console.error(error);
    }
  };

  const buildOptions = () => {
    const options = [];
    for (const task of tasks) {
      const option = {
        id: task.lineId,
        label: task.lineDisplayId,
        value: task,
      };
      options.push(option);
    }
    return options;
  };

  useEffect(() => {
    const options = buildOptions();
    const driversColumns = config.driversColumns;
    setColumns([
      ...driversColumns.filter((column) => column.field !== "actions"),
      {
        ...driversColumns.find((column) => column.field === "actions"),
        renderCell: (params) => (
          <SelectBasic
            label={"Add Task"}
            params={params}
            options={options}
            dispatchSelectAction={requestToassignDriverToTask}
          />
        ),
      },
    ]);
  }, [tasks]);

  return (
    <div>
      <h2>Drivers</h2>
      <CreateTable getRowId={(row) => row.id} columns={columns} rows={rows} />
    </div>
  );
}
