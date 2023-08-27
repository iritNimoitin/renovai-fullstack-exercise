import { createSelector } from "reselect";

export const counterSelector = createSelector(
  (state) => state.counter,
  (val) => ({
    val,
  })
);

export const driversSelector = createSelector(
  (state) => state.drivers,
  (drivers) => ({
      drivers,
  })
);
