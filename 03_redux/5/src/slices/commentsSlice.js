// BEGIN (write your solution here)
import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: { comments: [] },
  reducers: {
    setComments(state, { payload }) { state.comments = payload; },
  },
});
export const { actions } = commentsSlice;
export default commentsSlice.reducer;
// END
