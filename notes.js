const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

// CONTOH SETTING TEMPLATE ENGINE
app.set('view engine', 'ejs');

// SETTING BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));

// CONTOH BIKIN SETTING STATIC FILES
app.use(express.static('public'));

// CONTOH ROUTES
app.get('/', (request, response) => {
  let obj = {
    title: 'welcome to my web',
    name: 'udin',
    products: ['mami koko', 'keju', 'baju'],
  };

  response.render('home.ejs', obj);
});

app.get('/halo', (request, response) => {
  let obj = {
    title: 'welcome to my bandung',
    name: 'bandung',
    products: [],
  };

  response.render('home.ejs', obj);
});

app.get('/form-pendaftaran', (req, res) => {
  res.render('form-daftar.ejs');
});

app.post('/daftar', (request, response) => {
  console.log(request.body);
  response.render('thanks.ejs', { email: request.body.email });
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
