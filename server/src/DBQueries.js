const { query } = require('./MySQLConnection');
const { NEW_MESSAGE_SAVED } = require('./CopyContants');

const findAuthorSQL = `select id from contact where email = ?`;
const insertAuthorSQL = `insert into contact (first_name, last_name, email, telephone, house_number, street, city, county, country) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const insertMessageSQL = `insert into messages (author, message) values (?, ?)`;

const findAuthorId = async (email) => {
	const author = await query(findAuthorSQL, email);
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
	const result = await query(insertAuthorSQL, [
		firstname,
		lastname,
		email,
		telephone,
		housenumber,
		street,
		city,
		county,
		country,
	]);
	if (result.affectedRows === 1) {
		return result.insertId;
	}
};

const addMessage = async (authorId, message) => {
	const result = await query(insertMessageSQL, [authorId, message]);
	if (result.affectedRows === 1) {
		console.log(NEW_MESSAGE_SAVED);
		return result.insertId;
	}
};

module.exports = { findAuthorId, addAuthor, addMessage };
