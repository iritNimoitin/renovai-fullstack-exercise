import ActionTypes from "./actionTypes";

export const setDrivers = (drivers) => {
  return {
    type: ActionTypes.drivers.setDrivers,
    payload: drivers,
  };
};

export const getDrivers = () => {
  return {
    type: ActionTypes.drivers.requestDrivers,
  };
};

export const setTasks = (tasks) => {
  return {
    type: ActionTypes.tasks.setTasks,
    payload: tasks,
  };
};

export const setConnections = (connections) => {
  return {
    type: ActionTypes.connections.setConnections,
    payload: connections,
  };
};

export const assignDriverToTask = (driverID, taskID) => {
  return {
    type: ActionTypes.connections.assignDriverToTask,
    payload: { driverID, taskID },
  };
};
