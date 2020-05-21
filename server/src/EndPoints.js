const { addMessage } = require('./DBQueries');
const { findOrAddAuthor } = require('./AuthorService');
const httpStatusCodes = require('http-status-codes');

const testController = (req, res) => {
	console.log('get / ');
	return res.json({
		status: res.statusCode,
		data: {
			message: 'API Active',
		},
	});
};

const echoController = (req, res) => {
	return res.json({
		status: res.statusCode,
		data: {
			message: 'ECHO!',
			posted: req.body,
		},
	});
};

const createController = async (req, res) => {
	const authorId = await findOrAddAuthor(
		req.body.firstname,
		req.body.lastname,
		req.body.email,
		req.body.telephone,
		req.body.housenumber,
		req.body.street,
		req.body.city,
		req.body.county,
		req.body.country
	);

	await addMessage(authorId, req.body.message);
	return res.sendStatus(httpStatusCodes.OK);
};

module.exports = { testController, echoController, createController };
