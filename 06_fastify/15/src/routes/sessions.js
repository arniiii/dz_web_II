import generateUsers, { decrypt } from "../utils.js";

export default (app) => {
  const users = generateUsers();

  // BEGIN (write your solution here)
  app.get('/sessions/new', (req, res) => res.view('src/views/sessions/new', { error: null }));
  app.post('/sessions', (req, res) => {
    const user = users.find((item) => item.username === req.body.username);
    if (!user || decrypt(user.password) !== req.body.password) {
      return res.view('src/views/sessions/new', { error: 'Wrong username or password' });
    }
    req.session.username = user.username;
    return res.redirect('/');
  });
  app.post('/sessions/delete', async (req, res) => {
    await req.session.destroy();
    return res.redirect('/');
  });
  // END
};
