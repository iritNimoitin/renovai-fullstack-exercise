import React, { useCallback, useMemo, useRef } from "react";
import CreateTable from "./CreateTable";
import config from "../configuration/config.json";
import { getAllDrivers } from "../apiRequests/driversApi";
import { useDispatch, useSelector } from "react-redux";
import store from "../store/store";
import SelectBasic from "./Select";
import { trigerChoosingDriver } from "../store/actions/actions";
import { driversSelector, tasksSelector } from "../store/selectors";

export default function DriversGrid() {
  const dispatch = useDispatch();
  const { drivers } = useSelector(driversSelector);
  const { tasks } = useSelector(tasksSelector);
  const options = useMemo(
    () =>
      tasks.map((task) => ({
        id: task.lineId,
        label: task.lineDisplayId,
        value: task,
      })),
    [tasks]
  );
  const columns = config.driversColumns;
  const actionsColumn =
    columns.find((column) => column.field === "actions") || {};
  actionsColumn.renderCell = useCallback(
    (params) => (
      <SelectBasic
        label={"Add Task"}
        options={options}
        dispatchSelectAction={(newValue) => {}}
        dispatchUelectAction={(newValue) => {}}
      />
    ),
    [tasks]
  );

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
