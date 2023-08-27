import React, { useRef } from 'react';
import CreateTable from './CreateTable';
import config from '../configuration/config.json';
import { getAllDrivers } from '../apiRequests/driversApi';
import { useDispatch, useSelector } from 'react-redux';
import store from '../store/store';
import { selectedAssignment, selectedDriver, trigerChoosingDriver } from '../store/actions/actions';
import { useGridApiRef } from '@mui/x-data-grid';

export default function DriversGrid () {
  const dispatch = useDispatch();
  const selection = useSelector(state => state.selection);
  const [choosingDriverMode, setChoosingDriverMode] = React.useState(false);
  const [selectedDriverRow, setSelectedDriverRow] = React.useState({});
  const [rows, setRows] = React.useState([]);

  

  React.useEffect(() => {
    const handleSubscriptionUpdate = () => {
      const selection = store.getState().selection;
      if (choosingDriverMode !== selection.choosingDriverMode) {
        setChoosingDriverMode(selection.choosingDriverMode);
      }
      if(Object.keys(selection.selectedAssignment).length !== 0 && Object.keys(selection.selectedDriver).length !== 0) {
        setRows([...rows, {...rows.find(row => row.id === selection.selectedDriver.id), actions: selection.selectedAssignment.id}])
        dispatch(selectedAssignment({}));
        setSelectedDriverRow({});
      }
      if(Object.keys(selectedDriverRow).length === 0 && Object.keys(selection.selectedAssignment).length === 0 && selection.choosingDriverMode) {
        dispatch(trigerChoosingDriver(false));
      }
    };
    const unsubscribe = store.subscribe(handleSubscriptionUpdate);
    return () => {
      unsubscribe();
    }
  }, [choosingDriverMode])

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
    const handleChoosingDriver = (params) => {
      if (choosingDriverMode) {
        setSelectedDriverRow(params.row);
        dispatch(selectedDriver(params.row));
      }
    };
  return (
    <div>
      <h2>Drivers</h2>
      <CreateTable
        getRowId={(row) => row.id}
        columns={config.driversColumns}
        rows={rows}
        onCellClick={handleChoosingDriver}
      />
    </div>
  );
};