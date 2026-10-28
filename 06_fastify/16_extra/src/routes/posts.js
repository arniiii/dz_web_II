import generateId from "../utils.js";

export default (app) => {
  const posts = [];

  app.get("/posts/new", (req, res) => res.view("src/views/posts/new"));

  app.get("/posts/:id", (req, res) => {
    const post = posts.find(({ id }) => id === req.params.id);

    if (!post) {
      res.status(404).send("Post not found");
      return;
    }
    res.view("src/views/posts/show", { post });
  });

  // BEGIN (write your solution here)
  app.get('/posts', (req, res) => {
    return res.view('src/views/posts/index', { posts, flash: res.flash() });
  });
  app.post('/posts', (req, res) => {
    if (!req.body.title || req.body.title.length < 2) {
      req.flash('warning', 'Ошибка создания поста!');
      return res.redirect('/posts');
    }
    posts.push({ id: generateId(), title: req.body.title, body: req.body.body });
    req.flash('success', 'Пост был успешно создан!');
    return res.redirect('/posts');
  });
  // END
};
