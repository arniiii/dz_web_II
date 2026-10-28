import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const products = [
  { name: "Хлеб", id: 1, price: 25, count: 0 },
  { name: "Молоко", id: 2, price: 45, count: 0 },
  { name: "Чай", id: 3, price: 150, count: 0 },
];

export default defineConfig({
  plugins: [
    react(),
    {
      name: "mock-products",
      configureServer(server) {
        server.middlewares.use("/products.json", (req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(products));
        });
      },
    },
  ],
  server: {
    port: 8080,
    open: true,
    host: "localhost",
  },
});
