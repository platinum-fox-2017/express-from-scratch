const router = require('express').Router();
const faker = require('faker');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/student', (req, res) => {
  res.render('student-form');
});

router.post('/student', (req, res) => {
  res.render('success-student', req.body);
});

router.get('/teachers', (req, res) => {
  let teachers = [];
  for (var i = 0; i < 10; i++) {
    let randomName = faker.name.findName();
    let randomPhoneNumber = faker.phone.phoneNumber();
    let address = faker.address.streetAddress();
    teachers.push({
      name: randomName,
      phoneNumber: randomPhoneNumber,
      address: address,
    });
  }
  let obj = {
    teachers: teachers
  };
  res.render('teachers', obj);

});

module.exports = router;