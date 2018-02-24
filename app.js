// Bring in our dependencies
const express = require('express');

// Connect all our routes to our application
let PORT = 3000;
let app = express();

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});

app.use(express.static('public'));

app.use('/', require('./routes'));
