import React, { useCallback, useEffect, useState, useMemo } from "react";
import CreateTable from "./CreateTable";
import config from "../configuration/config.json";
import { getAllAssignments } from "../apiRequests/assignmentsApi";
import { useDispatch, useSelector } from "react-redux";
import SelectBasic from "./Select";
import store from "../store/store";
import { driversSelector, tasksSelector } from "../store/selectors";

export default function AssignmentsGrid() {
  const dispatch = useDispatch();
  const { tasks } = useSelector(tasksSelector);
  const { drivers } = useSelector(driversSelector);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  
  useEffect(() => {
    const buildOptions = () => {
      const options = [];
      for (const driver of drivers){
          const option = {
              id: driver.id,
              label: driver.name,
              value: driver
          }
          options.push(option);
      }
      return options;
  }
  const options = buildOptions();
  const assignmentsColumns = config.assignmentsColumns
  setColumns([...assignmentsColumns, {...assignmentsColumns.find(column => column.field === "driver"), renderCell: (params) => (
    <SelectBasic label={"Add Driver"} options={options} dispatchSelectAction={(newValue) => {}} dispatchUnselectAction={(newValue) => {}}/>
)}]);
  // const driverColumn = columns.find(column => column.field === "driver") || {};
  // driverColumn.renderCell = (params) => (
  //     <SelectBasic label={"Add Driver"} options={options} dispatchSelectAction={(newValue) => {}} dispatchUnselectAction={(newValue) => {}}/>
  // )
  }, [drivers])
  

  // const options = useMemo(
  //   () =>
  //     drivers.map((driver) => ({
  //       id: driver.id,
  //       label: driver.name,
  //       value: driver,
  //     })),
  //   [drivers]
  // );

  // const columns = config.assignmentsColumns;
  // const driverColumn =
  //   columns.find((column) => column.field === "driver") || {};


  //   useEffect(()=>{
  //     driverColumn.renderCell = (params) => (
  //       <SelectBasic
  //         label={"Add Driver"}
  //         options={options}
  //         dispatchSelectAction={(newValue) => {}}
  //         dispatchUnselectAction={(newValue) => {}}
  //       />
  //     );
  //   },[options])

  // driverColumn.renderCell = useCallback(
  //   (params) => (
  //     <SelectBasic
  //       label={"Add Driver"}
  //       options={options}
  //       dispatchSelectAction={(newValue) => {}}
  //       dispatchUnselectAction={(newValue) => {}}
  //     />
  //   ),
  //   [options]
  // );
  // }, [])

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
