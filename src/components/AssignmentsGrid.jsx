import React,{useEffect,useState} from 'react';
import CreateTable from './CreateTable';
import config from '../configuration/config.json';
import { getAllAssignments } from '../apiRequests/assignmentsApi';
import { useDispatch, useSelector } from "react-redux";
import SelectBasic from './Select';
import store from '../store/store';
import { tasksSelector } from '../store/selectors';

export default function AssignmentsGrid() {
    const dispatch = useDispatch();
    const { tasks } = useSelector(tasksSelector);
    const [rows, setRows] = useState([]);

    // React.useEffect(() => {
        const buildOptions = () => {
            const drivers = [];//redux
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
        const columns = config.assignmentsColumns;
        const driverColumn = columns.find(column => column.field === "driver") || {};
        driverColumn.renderCell = (params) => (
            <SelectBasic label={"Add Driver"} options={options} dispatchSelectAction={(newValue) => {}} dispatchUnselectAction={(newValue) => {}}/>
        )
    // }, [])

    useEffect(() => {
        const buildRawsFromAssignments = () => {
            const currentRows = [];
            for (const sevenDaysAssignments of tasks) {
                const row = {};
                row.id = sevenDaysAssignments.lineDisplayId;
                for (let i = 0; i < sevenDaysAssignments?.tasks?.length; i++) {
                    row[`day${i+1}`] = sevenDaysAssignments.tasks[i].type;
                }
                currentRows.push(row); 
            }
            setRows(currentRows);
        }
        buildRawsFromAssignments();
    }, [tasks]);
    
  return (
    <div>
        <h2>Assignments</h2>
        <CreateTable columns={columns} rows={rows} />
    </div>
  );
};