import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CreateTable from "./CreateTable";
import config from "../configuration/config.json";
import { getAllDrivers } from "../apiRequests/driversApi";
import { useDispatch, useSelector } from "react-redux";
import store from "../store/store";
import SelectBasic from "./Select";
import { setConnections, trigerChoosingDriver } from "../store/actions/actions";
import { driversSelector, tasksSelector } from "../store/selectors";
import axios from "axios";

export default function DriversGrid() {
  const dispatch = useDispatch();
  const { drivers } = useSelector(driversSelector);
  const { tasks } = useSelector(tasksSelector);
  const [columns, setColumns] = useState([]);

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

  useEffect(() => {
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
            dispatchUnselectAction={(newValue) => {}}
          />
        ),
      },
    ]);
  }, [tasks]);

  return (
    <div>
      <h2>Drivers</h2>
      <CreateTable
        getRowId={(row) => row.id}
        columns={columns}
        rows={drivers}
      />
    </div>
  );
}
