import { generateToken, buildIdGenerator } from "../utils.js";

export default (app) => {
  const users = [];

  const generateId = buildIdGenerator();

  app.get("/users/new", (req, res) => res.view("src/views/users/new"));

  // BEGIN (write your solution here)
  app.post('/users', (req, res) => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      id: generateId(),
      token: generateToken(),
    };
    users.push(user);
    return res.setCookie('token', user.token, { path: '/', httpOnly: true }).redirect(`/users/${user.id}`);
  });
  app.get('/users/:id', (req, res) => {
    const user = users.find(({ id, token }) => id === req.params.id && token === req.cookies.token);
    if (!user) return res.code(404).send('User not found');
    return res.view('src/views/users/show', { user });
  });
  // END
};
