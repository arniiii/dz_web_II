import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// BEGIN (write your solution here)
const adapter = createEntityAdapter();
const slice = createSlice({
  name: 'comments',
  initialState: adapter.getInitialState(),
  reducers: { addComment: adapter.addOne, addComments: adapter.addMany, },
});
export const { actions } = slice;
export const selectors = adapter.getSelectors((state) => state.comments);
export default slice.reducer;
// END
