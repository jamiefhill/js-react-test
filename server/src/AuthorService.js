const { findAuthorId, addAuthor } = require('./DBQueries');

const findOrAddAuthor = async (
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
	let authorId = await findAuthorId(email);
	if (!authorId) {
		authorId = await addAuthor(
			firstname,
			lastname,
			email,
			telephone,
			housenumber,
			street,
			city,
			county,
			country
		);
	}
	return authorId;
};

module.exports = { findOrAddAuthor };
