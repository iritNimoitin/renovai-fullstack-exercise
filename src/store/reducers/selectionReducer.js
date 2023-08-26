import { SELECTED_DRIVER, SELECTED_ASSIGNMENT, TRIGER_CHOOSING_DRIVER, TRIGER_CHOOSING_ASSIGNMENT } from "../actions/actionTypes";

const initialState = {
  choosingDriverMode: false,
  choosingAssignmentMode: false,
  selectedDriver: {},
  selectedAssignment: {},
};

export default function selectionReducer (state = initialState, action) {
  switch (action.type) {
    case SELECTED_DRIVER:
      return {
        ...state,
        selectedDriver: action.payload,
      };

    case TRIGER_CHOOSING_DRIVER:
      return {
        ...state,
        choosingDriverMode: action.payload,
      };

    case SELECTED_ASSIGNMENT:
      return {
        ...state,
        selectedAssignment: action.payload,
      };

    case TRIGER_CHOOSING_ASSIGNMENT:
      return {
        ...state,
        choosingAssignmentMode: action.payload,
      };

    default:
      return state;
  }
};
