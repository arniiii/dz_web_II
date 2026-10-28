import fastify from "fastify";

export default () => {
  const app = fastify();
  // BEGIN (write your solution here)
  app.get("/", () => "Welcome to Fastify!");
  // END
  return app;
};
