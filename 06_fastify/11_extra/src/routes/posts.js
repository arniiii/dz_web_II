import _ from "lodash";
import generatePosts from "../utils.js";

export default (app) => {
  const posts = generatePosts();

  // BEGIN (write your solution here)
  app.get('/posts', (req, res) => {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const pages = Math.ceil(posts.length / 5);
    return res.view('src/views/posts/index', {
      posts: posts.slice((page - 1) * 5, page * 5),
      page,
      previousPage: Math.max(1, page - 1),
      nextPage: page < pages ? page + 1 : page,
    });
  });
  app.get('/posts/:id', (req, res) => {
    const post = posts.find(({ id }) => id === req.params.id);
    if (!post) return res.code(404).send('Page not found');
    return res.view('src/views/posts/show', { post });
  });
  // END
};
