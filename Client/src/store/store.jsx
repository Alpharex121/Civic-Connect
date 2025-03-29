import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import issueReducer from "./Slices/issueSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    issues: issueReducer,
  },
});

export default appStore;
