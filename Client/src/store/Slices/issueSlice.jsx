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
  },
});

export const { addIssue } = issueSlice.actions;
export default issueSlice.reducer;
