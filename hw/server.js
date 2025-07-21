
const express = require('express');
const app = express();


app.get('/greetings/:username', (req, res) => {
  const { username } = req.params;
  res.send(`Welcome, ${username}!`);
});


app.get('/roll/:number', (req, res) => {
  const max = Number(req.params.number);

  if (isNaN(max)) {
    return res.send('You must specify a number.');
  }

  const result = Math.floor(Math.random() * (max + 1));
  res.send(`You rolled a ${result}.`);
});


const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 },
];


app.get('/collectibles/:index', (req, res) => {
  const index = Number(req.params.index);
  const item = collectibles[index];

  if (!item) {
    return res.send('This item is not yet in stock. Check back soon!');
  }

  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});


const shoes = [
  { name: 'Birkenstocks', price: 50, type: 'sandal' },
  { name: 'Air Jordans', price: 500, type: 'sneaker' },
  { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
  { name: 'Utility Boots', price: 20, type: 'boot' },
  { name: 'Velcro Sandals', price: 15, type: 'sandal' },
  { name: 'Jet Boots', price: 1000, type: 'boot' },
  { name: 'Fifty-Inch Heels', price: 175, type: 'heel' },
];


app.get('/shoes', (req, res) => {
  let results = [...shoes];
  const { type, 'min-price': minPrice, 'max-price': maxPrice } = req.query;

  if (!isNaN(parseFloat(minPrice))) {
    results = results.filter(shoe => shoe.price >= parseFloat(minPrice));
  }

  if (!isNaN(parseFloat(maxPrice))) {
    results = results.filter(shoe => shoe.price <= parseFloat(maxPrice));
  }

  if (type) {
    results = results.filter(shoe => shoe.type === type);
  }

  res.json(results);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
