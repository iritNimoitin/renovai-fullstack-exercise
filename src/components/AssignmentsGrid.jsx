import React from 'react';
import CreateTable from './CreateTable';
import config from '../configuration/config.json';
import { getAllAssignments } from '../apiRequests/assignmentsApi';
import { useDispatch, useSelector } from "react-redux";
import SelectBasic from './Select';
import store from '../store/store';

export default function AssignmentsGrid() {
    const dispatch = useDispatch();
    const [rows, setRows] = React.useState([]);
    const columns = config.assignmentsColumns;
    const driverColumn = columns.find(column => column.field === "driver") || {};
    driverColumn.renderCell = (params) => (
        <SelectBasic label={"Add Driver"} options={["a","b","c"]}/>
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
        const getAssignments = async () => {
            const allAssignments = await getAllAssignments();
            
            if (allAssignments) {
                buildRawsFromAssignments(allAssignments);
            }
        }
        const buildRawsFromAssignments = (allAssignments) => {
            const currentRows = [];
            for (const sevenDaysAssignments of allAssignments) {
                const row = {};
                row.id = sevenDaysAssignments.lineDisplayId;
                for (let i = 0; i < sevenDaysAssignments?.tasks?.length; i++) {
                    row[`day${i+1}`] = sevenDaysAssignments.tasks[i].type;
                }
                currentRows.push(row); 
            }
            setRows(currentRows);
        }
        getAssignments();
    }, []);
    
  return (
    <div>
        <h2>Assignments</h2>
        <CreateTable columns={columns} rows={rows} />
    </div>
  );
};