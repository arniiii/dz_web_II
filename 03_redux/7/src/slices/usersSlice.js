import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// BEGIN (write your solution here)
const adapter = createEntityAdapter();
const slice = createSlice({
  name: 'users',
  initialState: adapter.getInitialState(),
  reducers: { addUsers: adapter.addMany, },
});
export const { actions } = slice;
export const selectors = adapter.getSelectors((state) => state.users);
export default slice.reducer;
// END
