export default (app, db) => {
  app.get("/products/new", (req, res) => {
    res.view("src/views/products/new");
  });

  // BEGIN (write your solution here)
  app.get('/products', async (req, res) => {
    const products = await new Promise((resolve, reject) => {
      db.all('SELECT id, title, description, price FROM products ORDER BY id', (error, rows) => error ? reject(error) : resolve(rows));
    });
    return res.view('src/views/products/index', { products });
  });
  app.get('/products/:id', async (req, res) => {
    const product = await new Promise((resolve, reject) => {
      db.get('SELECT id, title, description, price FROM products WHERE id = ?', [req.params.id],
        (error, row) => error ? reject(error) : resolve(row));
    });
    if (!product) return res.code(404).send('Product not found');
    return res.view('src/views/products/show', { product });
  });
  app.post('/products', async (req, res) => {
    const { title, description, price } = req.body;
    await new Promise((resolve, reject) => {
      db.run('INSERT INTO products (title, description, price) VALUES (?, ?, ?)',
        [title, description, Number(price)], (error) => error ? reject(error) : resolve());
    });
    return res.redirect('/products');
  });
  // END
};
