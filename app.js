const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', async (req, res) => {
  const marca = req.query.marca || '';
  const modelo = req.query.modelo || '';
  const anio = req.query.anio || '';
  const query = marca + ' ' + modelo + ' ' + anio;
  const url = 'https://api.mercadolibre.com/sites/MLA/search?q=' + encodeURIComponent(query) + '&condition=used&limit=30';
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch(e) {
    res.json({ error: e.message, results: [] });
  }
});

app.listen(process.env.PORT || 3000);
