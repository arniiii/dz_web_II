import fastify from "fastify";

const API_KEY = "1234asdf";

export default async () => {
  const app = fastify();

  app.server.keepAliveTimeout = 1;

  app.get("/", (req, res) => {
    res.send("Server is running!");
  });

  app.get("/private", (req, res) => {
    if (req.headers["x-api-key"] !== API_KEY) {
      return res.code(401).send("Unauthorized\n");
    }

    return res.send("Access granted\n");
  });

  return app;
};
