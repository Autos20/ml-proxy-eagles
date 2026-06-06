const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/exchange', async (req, res) => {
  const code = req.query.code;
  const resp = await fetch('https://api.mercadolibre.com/oauth/token', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: 'grant_type=authorization_code&client_id=2013028966626289&client_secret=v6WLinsU3URJMeEpv5IFDKOOm9OpPHB1&code=' + code + '&redirect_uri=https://cotizador-eagles.pages.dev'
  });
  const data = await resp.json();
  res.json(data);
});

app.get('/', async (req, res) => {
  const marca = req.query.marca || '';
  const modelo = req.query.modelo || '';
  const anio = req.query.anio || '';
  const token = req.query.token || '';
  const query = marca + ' ' + modelo + ' ' + anio;
  const url = 'https://api.mercadolibre.com/sites/MLA/search?q=' + encodeURIComponent(query) + '&condition=used&limit=30';
  const headers = token ? {'Authorization': 'Bearer ' + token} : {};
  const response = await fetch(url, {headers});
  const data = await response.json();
  res.json(data);
});

app.listen(process.env.PORT || 3000);
