const express = require('express');
const app = express();
const router = require('./routes');
const teacher = require('./routes/teacher');
const student = require('./routes/student');
const subject = require('./routes/subject');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//use for flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.set('views', __dirname+'/views/');
app.set('view engine', 'ejs');

//body parser
app.use(bodyParser.urlencoded({
  extended: false
}))
//routes
app.use('/', router);
app.use('/teachers',teacher);
app.use('/students',student);
app.use('/subjects',subject);

const port = 3000;

app.listen(port, function() {
  console.log(`Server Starts on ${port}`);
});
