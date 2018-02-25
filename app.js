const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// const models = require('./models')

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const teacher = require('./routes/teacher')

app.get('/', (req, res) => {
    // res.render('index')
    res.send('Hello World!')
});

app.use('/teacher', teacher);



app.listen(3000, () => console.log(`The App listening on port 3000!`));