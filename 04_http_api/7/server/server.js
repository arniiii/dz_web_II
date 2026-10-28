import fastify from "fastify";

const TOKEN = "hexlet-jwt-token";

export default async () => {
  const app = fastify();

  app.server.keepAliveTimeout = 1;

  app.get("/", (req, res) => {
    res.send("Server is running!");
  });

  app.post("/login", (req, res) => {
    const { username, password } = req.body ?? {};

    if (username === "admin" && password === "admin") {
      return res.send({ token: TOKEN });
    }

    return res.code(401).send({ error: "Invalid credentials" });
  });

  app.get("/private", (req, res) => {
    if (req.headers.authorization !== `Bearer ${TOKEN}`) {
      return res.code(401).send("Unauthorized\n");
    }

    return res.send("Secret data\n");
  });

  return app;
};
