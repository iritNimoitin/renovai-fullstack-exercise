import ActionTypes from "../actions/actionTypes";
import axios from "axios";

export const initialState = {
  counter: 1,
  drivers: [],
  tasks: [],
  map: [],
};

const getApiUrl = (endpoint) => `http://localhost:3001/${endpoint}`;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.counter.inc:
      return { ...state, counter: state.counter + 1 };
      case ActionTypes.drivers.setDrivers:
        return { ...state, drivers: action.payload };


    default:
      return state;
  }
};

export default reducer;
