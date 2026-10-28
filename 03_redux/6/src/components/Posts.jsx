import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post.jsx';

const Posts = () => {
  // BEGIN (write your solution here)
  const posts = useSelector((state) => state.postsReducer);
  return <div className="mt-3">{posts.ids.map((id) => <Post key={id} post={posts.entities[id]} />)}</div>;
  // END
};

export default Posts;
