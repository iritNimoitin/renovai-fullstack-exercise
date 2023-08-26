import { SELECTED_DRIVER, SELECTED_ASSIGNMENT, TRIGER_CHOOSING_DRIVER, TRIGER_CHOOSING_ASSIGNMENT } from "../actions/actionTypes";

const selectedDriver = (driver) => {
  return {
    type: SELECTED_DRIVER,
    payload: driver
  };
};

const selectedAssignment = (assignment) => {
  return {
    type: SELECTED_ASSIGNMENT,
    payload: assignment
  };
};

const trigerChoosingDriver = (choosingDriverMode) => {
    return {
        type: TRIGER_CHOOSING_DRIVER,
        payload: choosingDriverMode
    };
};

const trigerChoosingAssignment = (choosingAssignmentMode) => {
    return {
        type: TRIGER_CHOOSING_ASSIGNMENT,
        payload: choosingAssignmentMode
    };
};

export { selectedDriver, selectedAssignment, trigerChoosingDriver, trigerChoosingAssignment };