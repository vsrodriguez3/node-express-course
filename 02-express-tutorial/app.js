const express = require('express');
const { products, people } = require("./data");
const peopleRouter = require('./routes/people');
const app = express();
app.use(express.static('./methods-public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const logger = (req, res, next) => {
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: true });
  console.log(`Time: ${currentTime}\nMethod: ${req.method}\nURL: ${req.url}`);
  next(); 
};

app.use(logger);

app.get('/api/v1/test', (req, res) => {
  res.json({ message: "It worked!" });
});  

app.get('/api/v1/products', (req, res) => { 
  res.json(products);
});

// app.get('/api/v1/people', (req, res) => {
//   res.json(people);
// });

// app.post('/api/v1/people', (req, res) => {
//   const { name } = req.body;
//   if (!name) {
//     return res.status(400).json({ success: false, message: "Please provide a name." });
//   }
//   const newPerson = { id: people.length + 1, name };
//   people.push(newPerson);
//   res.status(201).json({ success: true, name });
// });
app.use("/api/v1/people", peopleRouter);

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