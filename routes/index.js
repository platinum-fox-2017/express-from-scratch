'use strict';

module.exports = app => {
	app.get('/', (req, res) => res.status(200).render('./pages/index.ejs', {
		message: 'Welcome to Hacktiv8 University',
	}));

	app.use('/teachers', require('./teacher'));
	app.use('/subjects', require('./subject'));
	app.use('/students', require('./student'));
};