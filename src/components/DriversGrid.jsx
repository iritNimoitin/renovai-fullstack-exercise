import React, { useRef } from 'react';
import CreateTable from './CreateTable';
import config from '../configuration/config.json';
import { getAllDrivers } from '../apiRequests/driversApi';
import { useDispatch, useSelector } from 'react-redux';
import store from '../store/store';
import { selectedAssignment, selectedDriver, trigerChoosingDriver } from '../store/actions/actions';
import { useGridApiRef } from '@mui/x-data-grid';
import SelectBasic from './Select';

export default function DriversGrid () {
  const dispatch = useDispatch();
  const selection = useSelector(state => state.selection);
  const [rows, setRows] = React.useState([]);
  const columns = config.driversColumns;
  const actionsColumn = columns.find(column => column.field === "actions") || {};
  actionsColumn.renderCell = (params) => (
      <SelectBasic label={"Add Task"} options={["a","b","c"]}/>
  )

  const handleSubscriptionUpdate = () => {
    
  }

  React.useEffect(() => {
    const unsubscribe = store.subscribe(handleSubscriptionUpdate)
    return () => {
        unsubscribe();
    }
}, [])

  React.useEffect(() => {
    const getAndBuildDrivers = async () => {
      const allDrivers = await getAllDrivers();

      if (allDrivers) {
        const newRows = allDrivers.map(driver => ({
          id: driver.id,
          name: driver.name,
          actions: undefined,
        }));
        setRows(newRows);
      }
    };

    getAndBuildDrivers();
  }, []);

  return (
    <div>
      <h2>Drivers</h2>
      <CreateTable
        getRowId={(row) => row.id}
        columns={config.driversColumns}
        rows={rows}
      />
    </div>
  );
};