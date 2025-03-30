import { createSlice } from "@reduxjs/toolkit";
const issueSlice = createSlice({
  name: "issues",
  initialState: {
    issues: [],
  },
  reducers: {
    addIssue: (state, action) => {
      state.issues.push(action.payload);
    },
    updateIssue: (state, action) => {
      state.issues[0].unshift(action.payload);
    },
    clearIssue: (state, action) => {
      state.issues = [];
    },
  },
});

export const { addIssue, clearIssue, updateIssue } = issueSlice.actions;
export default issueSlice.reducer;
