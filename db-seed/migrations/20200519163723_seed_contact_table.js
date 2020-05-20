exports.up = function (knex) {
	return knex('contact').insert([
		{
			first_name: 'Bob',
			last_name: 'Smith',
			email: 'Bob@smith.comm',
			telephone: '12345678',
			house_number: 'Flat 2',
			street: 'Rose Gardens',
			city: 'Edinburgh',
			county: 'Midlothian',
			country: 'Scotland',
		},
		{
			first_name: 'Mary',
			last_name: 'Jones',
			email: 'mary@jones.comm',
			telephone: '12345679',
			house_number: '26',
			street: 'Ferguson Drive',
			city: 'Edinburgh',
			county: 'Midlothian',
			country: 'Scotland',
		},
	]);
};

exports.down = function (knex) {
	return knex('contact')
		.where('email', 'Bob@smith.comm')
		.orWhere('email', 'mary@jones.comm')
		.del();
};
