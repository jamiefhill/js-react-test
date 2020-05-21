const { query } = require('./MySQLConnection');

const findAuthorId = async (email) => {
	const author = await query(`select id from contact where email = ?`, email);
	if (author[0]) {
		return author[0].id;
	}
};

const addAuthor = async (
	firstname,
	lastname,
	email,
	telephone,
	housenumber,
	street,
	city,
	county,
	country
) => {
	const result = await query(
		`insert into contact (first_name, last_name, email, telephone, house_number, street, city, county, country) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		[
			firstname,
			lastname,
			email,
			telephone,
			housenumber,
			street,
			city,
			county,
			country,
		]
	);
	if (result.affectedRows === 1) {
		return result.insertId;
	}
};

const addMessage = async (authorId, message) => {
	const result = await query(
		`insert into messages (author, message) values (?, ?)`,
		[authorId, message]
	);
	if (result.affectedRows === 1) {
		console.log('New contact message added to the database!');
		return result.insertId;
	}
};

module.exports = { findAuthorId, addAuthor, addMessage };
