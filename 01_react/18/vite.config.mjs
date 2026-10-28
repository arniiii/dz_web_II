import bodyParser from 'body-parser';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const jsonParser = bodyParser.json();

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: 'localhost',
    configureServer(server) {
      const tasks = [
        { id: 2, text: 'task 2', state: 'finished' },
        { id: 1, text: 'task 1', state: 'active' },
      ];

      function generateNewId(items) {
        if (items.length === 0) return 1;
        const ids = items.map((task) => task.id);
        return Math.max(...ids) + 1;
      }

      server.middlewares.use((req, res, next) => {
        const { method, url } = req;

        if (method === 'GET' && url === '/api/tasks') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(tasks));
          return;
        }

        if (method === 'POST' && url === '/api/tasks') {
          jsonParser(req, res, () => {
            const newTaskId = generateNewId(tasks);
            const newTask = {
              id: newTaskId,
              ...req.body,
              state: 'active',
            };

            tasks.push(newTask);
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(newTask));
          });
          return;
        }

        const finishMatch = url?.match(/^\/api\/tasks\/(\d+)\/finish$/);
        if (method === 'PATCH' && finishMatch) {
          const taskId = parseInt(finishMatch[1], 10);
          const task = tasks.find((item) => item.id === taskId);

          if (!task) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Task not found' }));
            return;
          }

          task.state = 'finished';
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(task));
          return;
        }

        const activateMatch = url?.match(/^\/api\/tasks\/(\d+)\/activate$/);
        if (method === 'PATCH' && activateMatch) {
          const taskId = parseInt(activateMatch[1], 10);
          const task = tasks.find((item) => item.id === taskId);

          if (!task) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Task not found' }));
            return;
          }

          task.state = 'active';
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(task));
          return;
        }

        next();
      });
    },
  },
});
