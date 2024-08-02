const express = require('express');
const { products } = require("./data");

const app = express();

app.use(express.static('./public'));

app.get('/api/v1/test', (req, res) => {
    res.json({ message: "It worked!" });
});  

app.get('/api/v1/products', (req, res) => { 
    res.json(products);
});

app.get('/api/v1/query', (req, res) => {
  const { search, limit } = req.query;
  let filteredProducts = [...products];
  
  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );  
  }
  
  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }
  
  res.json(filteredProducts);
});

app.get('/api/v1/filter', (req, res) => {
  const { maxPrice } = req.query;
  let filteredProducts = [...products];

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price < parseFloat(maxPrice)
    );
  }

  res.json(filteredProducts);
});

app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((p) => p.id === idToFind);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.all('*', (req, res) => {
  res.status(404).send('Page not found');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});