import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setStoreFilter: {
      reducer(state, action) {
        return action.payload;
      },
      prepare(value) {
        return {
          payload: value,
        };
      },
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { setStoreFilter } = filterSlice.actions;
