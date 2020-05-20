exports.up = function (knex) {
	return knex.schema.createTable('contact', function (t) {
		t.increments('id').unsigned().primary();

		t.string('first_name').notNull();
		t.string('last_name').notNull();
		t.string('email').notNull();
		t.integer('telephone').unsigned().notNullable();
		t.string('house_number').notNull();
		t.string('street').notNull();
		t.string('city').notNull();
		t.string('county').notNull();
		t.string('country').notNull();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('contact');
};
