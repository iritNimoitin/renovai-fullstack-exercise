import React, { useRef } from 'react';
import CreateTable from './CreateTable';
import config from '../configuration/config.json';
import { getAllDrivers } from '../apiRequests/driversApi';
import { useDispatch, useSelector } from 'react-redux';
import store from '../store/store';
import { selectedAssignment, selectedDriver, trigerChoosingDriver } from '../store/actions/actions';

export default function DriversGrid () {
  const driversGridRef = useRef(null);
  const dispatch = useDispatch();
  const [choosingDriverMode, setChoosingDriverMode] = React.useState(false);
  const [selectedDriverRow, setSelectedDriverRow] = React.useState({});
  const unsubscribe = store.subscribe(() =>{
    const selection = store.getState().selection;
    if(choosingDriverMode !== selection.choosingDriverMode){
      setChoosingDriverMode(selection.choosingDriverMode);
    }
    console.log(selection,"%%%%%%%%%%%%%%%%%%5")
    console.log(driversGridRef,"$$$$$$$$$$$$$$$$$$$$$444")
    if(Object.keys(selection.selectedAssignment).length !== 0 && Object.keys(selection.selectedDriver).length !== 0) {
      console.log(selectedDriverRow,"1111")
      // setSelectedDriverRow({...selectedDriverRow, row:{...selectedDriverRow.row, actions: selection.selectedAssignment}});
      dispatch(selectedAssignment({}));
    }
    if(Object.keys(selection.selectedDriver).length === 0 && Object.keys(selection.selectedAssignment).length === 0 && selection.choosingDriverMode) {
      dispatch(trigerChoosingDriver(false));
    }
  })
  const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        const getDrivers = async () => {
            const allDrivers = await getAllDrivers();
            
            if (allDrivers) {
              buildRawsFromDrivers(allDrivers);
            }
        }
        const buildRawsFromDrivers = (allDrivers) => {
            const currentRows = [];
            for (const driver of allDrivers) {
                const row = {};
                row.name = driver.name;
                row.id = driver.id;
                row.actions = undefined;
                currentRows.push(row); 
            }
            setRows(currentRows);
        }
        getDrivers();
    }, []);
  
  const handleChoosingDriver = (params) => {
    if(choosingDriverMode){
      // setSelectedDriverRow({...params});
      dispatch(selectedDriver({...params.row}));
    }
  } 

  return (
    <div>
      <h2>Drivers</h2>
      <CreateTable ref={driversGridRef} columns={config.driversColumns} rows={rows} onCellClick={handleChoosingDriver} />
    </div>
  );
};