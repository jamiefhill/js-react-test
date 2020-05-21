const { addMessage } = require('./DBQueries');
const { findOrAddAuthor } = require('./AuthorService');
const { validateContactForm } = require('./ValidationService');
const httpStatusCodes = require('http-status-codes');
const {
	ECHO_MESSAGE,
	ACTIVE_MESSAGE,
	TEST_END_POINT_HIT,
} = require('./CopyContants');

const testController = (req, res) => {
	console.log(TEST_END_POINT_HIT);
	return res.json({
		status: res.statusCode,
		data: {
			message: ACTIVE_MESSAGE,
		},
	});
};

const echoController = (req, res) => {
	return res.json({
		status: res.statusCode,
		data: {
			message: ECHO_MESSAGE,
			posted: req.body,
		},
	});
};

const createController = async (req, res) => {
	validateContactForm(req.body);
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
