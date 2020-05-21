const express = require('express');
const { findAuthorId, addAuthor, addMessage } = require('./DBQueries');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const PORT = process.env.PORT || 8080;
const app = express();
const httpStatusCodes = require('http-status-codes');

// Deal with CORS
app.use(cors());

// Start Express listening
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});

// Test to make sure the API can talk to React
app.get('/', (req, res) => {
	console.log('get / ');
	return res.json({
		status: res.statusCode,
		data: {
			message: 'API Active',
		},
	});
});

// An echo, to help with debugging
app.post('/', (req, res) => {
	return res.json({
		status: res.statusCode,
		data: {
			message: 'ECHO!',
			posted: req.body,
		},
	});
});

// An API endpoint to store form post data
app.post('/create', upload.none(), async (req, res) => {
	let authorId = await findAuthorId(req.body.email);
	if (!authorId) {
		authorId = await addAuthor(
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
		if (!authorId) {
			return res.sendStatus(httpStatusCodes.INTERNAL_SERVER_ERROR);
		}
	}

	const messageId = await addMessage(authorId, req.body.message);

	if (messageId) {
		res.sendStatus(httpStatusCodes.OK);
	} else {
		res.sendStatus(httpStatusCodes.INTERNAL_SERVER_ERROR);
	}
});
