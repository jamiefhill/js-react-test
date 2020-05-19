exports.up = function (knex) {
	return knex.schema.createTable('messages', function (t) {
		t.increments('id').unsigned().primary();

		t.integer('author').notNull();
		t.string('message').notNull();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('messages');
};
