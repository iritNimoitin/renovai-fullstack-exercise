import React from 'react';
import CreateTable from './CreateTable';
import config from '../configuration/config.json';
import { getAllAssignments } from '../apiRequests/assignmentsApi';
import { Box, Button, Modal, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { selectedAssignment, selectedDriver, trigerChoosingDriver } from '../store/actions/actions';
import store from '../store/store';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function AssignmentsGrid() {
    // const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [selectedAssignmentRow, setSelectedAssignmentRow] = React.useState({});
    const unsubscribe = store.subscribe(() =>{
        const selection = store.getState().selection;
        if(Object.keys(selection.selectedDriver).length !== 0 && Object.keys(selectedAssignmentRow).length !== 0) {
            console.log(selectedAssignmentRow,"2222")
            setSelectedAssignmentRow({...selectedAssignmentRow,row:{...selectedAssignmentRow.row, driver: selection.selectedDriver}});
            dispatch(selectedDriver({}));
        }
        if(Object.keys(selection.selectedDriver).length === 0 && Object.keys(selection.selectedAssignment).length === 0 && selection.choosingDriverMode) {
            dispatch(trigerChoosingDriver(false));
        }
      })
    const [rows, setRows] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => 
        setOpen(true);
    const handleClose = () => 
        setOpen(false)
    const columns = config.assignmentsColumns;
    const driverColumn = columns.find(column => column.field === "driver") || {};
    driverColumn.renderCell = (params) => (
         <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => {
                handleOpen();
                setSelectedAssignmentRow({...params});
            }}>
            Driver
        </Button>
    )
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
        <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Pickup driver from the driver list above.
                </Typography>
                <Button variant="contained" endIcon={<CheckIcon />} onClick={() => {
                    handleClose();
                    dispatch(trigerChoosingDriver(true));
                    dispatch(selectedAssignment({...selectedAssignmentRow.row}));
                }}>
                    Accept
                </Button>
                <Button variant="contained" color='secondary' endIcon={<CloseIcon />} onClick={() => {
                    handleClose();
                    setSelectedAssignmentRow({});
                }}>
                    Decline
                </Button>
            </Box>
        </Modal>
    </div>
  );
};