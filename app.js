// Bring in our dependencies
const express = require('express');
const routes = require('./routes');

// Connect all our routes to our application
let PORT = 3000;
let app = express();


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});

app.use('/',routes);
