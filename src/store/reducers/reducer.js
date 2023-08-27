import ActionTypes from "../actions/actionTypes";

export const initialState = {
  counter: 1,
  drivers: [],
  tasks: [],
  connections: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.counter.inc:
      return { ...state, counter: state.counter + 1 };
    case ActionTypes.drivers.setDrivers:
      return { ...state, drivers: action.payload };
    case ActionTypes.tasks.setTasks:
      return { ...state, tasks: action.payload };
      case ActionTypes.connections.setConnections:
        return { ...state, connections: action.payload };
    default:
      return state;
  }
};

export default reducer;
