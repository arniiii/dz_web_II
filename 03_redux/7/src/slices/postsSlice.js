import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// BEGIN (write your solution here)
const adapter = createEntityAdapter();
const slice = createSlice({
  name: 'posts',
  initialState: adapter.getInitialState(),
  reducers: { addPost: adapter.addOne, addPosts: adapter.addMany, updatePost: adapter.updateOne, },
});
export const { actions } = slice;
export const selectors = adapter.getSelectors((state) => state.posts);
export default slice.reducer;
// END
