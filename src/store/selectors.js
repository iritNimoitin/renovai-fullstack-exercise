import { createSelector } from "reselect";

export const driversSelector = createSelector(
  (state) => state.drivers,
  (drivers) => ({
    drivers,
  })
);

export const tasksSelector = createSelector(
  (state) => state.tasks,
  (tasks) => ({
    tasks,
  })
);

export const connectionsSelector = createSelector(
  (state) => state.connections,
  (connections) => ({
    connections,
  })
);
