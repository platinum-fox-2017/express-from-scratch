const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Tampilkan Data User');
});
router.get('/edit/:id', (req, res) => {
  res.send(`Menampilkan Data untuk id ${req.body.id}`);

});

module.exports = router;
