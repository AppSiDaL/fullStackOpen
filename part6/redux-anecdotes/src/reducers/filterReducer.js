import { createSlice } from "@reduxjs/toolkit";
const filterSlice = createSlice({
  name: "filter",
  initialState: "ALL",
  reducers: {
    filterChange(state,action) {
      return state=action.payload;
    },
  },
});
export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
