'use strict'

const express = require('express');
const app = express();
const ejs = require('ejs');
app.set('view engine','ejs');
app.set('views','./views');

const route_students = require('./routes/students');
const route_teachers = require('./routes/teachers');
const route_subjects = require('./routes/subjects');

app.use('/students', route_students);
app.use('/teachers', route_teachers);
app.use('/subjects', route_subjects);


// app.get('/',(req,res) => {
//     res.send('Hello World');
// });

app.listen(3000);




// const express = require('express');
// const app = express();
// const ejs = require('ejs')
// app.set('views', './views')
// app.set('view engine', 'ejs')

// const RouteProduct = require('./routers/product');
// const RouteHome = require('./routers/home');
// const RouteOrder = require('./routers/order');
// const RouteUser = require('./routers/user');
// const session = require('express-session')

// const authCheckLogin = require('./helpers/authLogIn');
// const authAdmin = require('./helpers/authLogInAdmin');
// app.use(session({
//   secret: 'keyboard cat'
// }))

// app.use('/user',authAdmin.authAdmin,RouteUser);
// app.use('/', RouteHome);
// app.use('/order',authCheckLogin.checkLogIn, RouteOrder)
// app.use('/product',authAdmin.authAdmin, RouteProduct);



// app.listen(process.env.PORT||3000);