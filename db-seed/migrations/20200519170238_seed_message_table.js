exports.up = function (knex) {
	return knex('messages').insert([
		{
			author: 1,
			message:
				'My flux capacitor exploded yesterday, where can I get a new one?',
		},
		{
			author: 2,
			message:
				'My warp bubble burst, now every time I restart my warp drive it beeps 3 times then dies. How can I get it started again?',
		},
	]);
};

exports.down = function (knex) {
	return knex('messages').where('author', 1).orWhere('author', 2).del();
};
