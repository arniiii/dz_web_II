import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import formbody from "@fastify/formbody";
import yup from "yup";
import { generateId } from "./utils.js";

export default async () => {
  const app = fastify();

  const articles = [];

  await app.register(view, { engine: { pug } });
  await app.register(formbody);

  app.get("/", (req, res) => res.view("src/views/index"));

  app.get("/articles", (req, res) => {
    res.view("src/views/articles/index", { articles });
  });

  // BEGIN (write your solution here)
  app.get('/articles/new', (req, res) => res.view('src/views/articles/new', { article: {}, errors: [] }));
  const schema = yup.object({
    title: yup.string().min(2, 'Название не должно быть короче двух символов')
      .test('unique', 'Статья с таким названием уже существует', (title) => !articles.some((article) => article.title === title)),
    text: yup.string().min(10, 'Статья должна быть не короче 10 символов'),
  });
  app.post('/articles', async (req, res) => {
    const article = { title: req.body.title ?? '', text: req.body.text ?? '' };
    try {
      await schema.validate(article, { abortEarly: false });
    } catch (error) {
      return res.view('src/views/articles/new', { article, errors: error.errors });
    }
    articles.push({ ...article, id: generateId() });
    return res.redirect('/articles');
  });
  // END

  app.get("/articles/:id", (req, res) => {
    const article = articles.find(({ id }) => id === req.params.id);

    if (!article) {
      return res.status(404).send("article not found");
    }

    return res.view("src/views/articles/show", { article });
  });

  return app;
};
