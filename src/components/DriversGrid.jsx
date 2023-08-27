import React, { useRef } from 'react';
import CreateTable from './CreateTable';
import config from '../configuration/config.json';
import { getAllDrivers } from '../apiRequests/driversApi';
import { useDispatch, useSelector } from 'react-redux';
import store from '../store/store';
import SelectBasic from './Select';
import { trigerChoosingDriver } from '../store/actions/actions';
import { driversSelector } from '../store/selectors';

export default function DriversGrid () {
  const dispatch = useDispatch();
  const { drivers } = useSelector(driversSelector);

  // React.useEffect(() => {
    const buildOptions = () => {
      const tasks = [];
      const options = [];
      for (const task of tasks){
          const option = {
              id: task.lineId,
              label: task.lineDisplayId,
              value: task
          }
          options.push(option);
      }
      return options;
    }
    const options = buildOptions();
    const columns = config.driversColumns;
    const actionsColumn = columns.find(column => column.field === "actions") || {};
    actionsColumn.renderCell = (params) => (
        <SelectBasic label={"Add Task"} options={[{id: "a", label: "a", value:{}},{ id: "b", label: "b", value:{}}]} dispatchSelectAction={(newValue) => {}} dispatchUelectAction={(newValue) => {}}/>
    )
  // }, [])

  // React.useEffect(() => {
  //   const getAndBuildDrivers = async () => {
  //     const allDrivers = await getAllDrivers();

  //     if (allDrivers) {
  //       const newRows = allDrivers.map(driver => ({
  //         id: driver.id,
  //         name: driver.name,
  //         actions: undefined,
  //       }));
  //       setRows(newRows);
  //     }
  //   };

  //   getAndBuildDrivers();
  // }, []);

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
};