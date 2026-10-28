import _ from "lodash";
import fastify from "fastify";
import getUsers from "./utils.js";

export default () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.get('/users', (req) => {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const per = Math.max(1, Number.parseInt(req.query.per, 10) || 5);
    return users.slice((page - 1) * per, page * per);
  });
  // END

  return app;
};
