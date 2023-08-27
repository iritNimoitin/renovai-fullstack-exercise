import React, { useCallback, useEffect, useState, useMemo } from "react";
import CreateTable from "./CreateTable";
import config from "../configuration/config.json";
import { getAllAssignments } from "../apiRequests/assignmentsApi";
import { useDispatch, useSelector } from "react-redux";
import SelectBasic from "./Select";
import store from "../store/store";
import {
  connectionsSelector,
  driversSelector,
  tasksSelector,
} from "../store/selectors";
import axios from "axios";
import { setConnections } from "../store/actions/actions";

export default function AssignmentsGrid() {
  const dispatch = useDispatch();
  const { tasks } = useSelector(tasksSelector);
  const { drivers } = useSelector(driversSelector);
  const { connections } = useSelector(connectionsSelector);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns([
      {
        ...columns.find((column) => column.field === "driver"),
        renderCell: (params) => {

          let defaultValue;
          if (connections[params.id]) {
            defaultValue = drivers.find((driver) => driver.id === connections[params.id]);
          }
          return (
            <SelectBasic
              label={"Add Driver"}
              params={params}
              defaultValue={defaultValue}
              options={buildOptions()}
              dispatchSelectAction={requestToassignDriverToTask}
            />
          );
        },
      },
      ...columns.filter((column) => column.field !== "driver"),
    ]);
  }, [connections]);

  const requestToassignDriverToTask = async (taskId, driver, callback) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/connections/assignDriverToTask",
        { driverId: driver?.id, taskId }
      );
      const newMap = res.data;
      dispatch(setConnections(newMap));
      callback(driver);
    } catch (error) {
      console.error(error);
    }
  };

  const buildOptions = () => {
    const options = [];
    for (const driver of drivers) {
      const option = {
        id: driver.id,
        label: driver.name,
        value: driver,
      };
      options.push(option);
    }
    return options;
  };

  useEffect(() => {
    const options = buildOptions();
    const assignmentsColumns = config.assignmentsColumns;
    setColumns([
      {
        ...assignmentsColumns.find((column) => column.field === "driver"),
        renderCell: (params) => (
          <SelectBasic
            label={"Add Driver"}
            params={params}
            options={options}
            dispatchSelectAction={requestToassignDriverToTask}
          />
        ),
      },
      ...assignmentsColumns.filter((column) => column.field !== "driver"),
    ]);
  }, [drivers]);

  useEffect(() => {
    const buildRawsFromAssignments = () => {
      const currentRows = [];
      for (const sevenDaysAssignments of tasks) {
        const row = {};
        row.id = sevenDaysAssignments.lineDisplayId;
        for (let i = 0; i < sevenDaysAssignments?.tasks?.length; i++) {
          row[`day${i + 1}`] = sevenDaysAssignments.tasks[i].type;
        }
        currentRows.push(row);
      }
      setRows(currentRows);
    };
    buildRawsFromAssignments();
  }, [tasks]);

  return (
    <div>
      <h2>Assignments</h2>
      <CreateTable columns={columns} rows={rows} />
    </div>
  );
}
