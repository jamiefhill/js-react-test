const { addMessage } = require('./DBQueries');
const { findOrAddAuthor } = require('./AuthorService');
const { validateContactForm } = require('./ValidationService');
const httpStatusCodes = require('http-status-codes');
const {
	ECHO_MESSAGE,
	ACTIVE_MESSAGE,
	TEST_END_POINT_HIT,
} = require('./CopyContants');

/**
 * @swagger
 *
 * /:
 *   get:
 *     description: Test end point, alerts the front end the service is running
 *     produces:
 *       - text/plain; charset=utf-8
 *     consumes:
 *       - text/plain; charset=utf-8
 *     responses:
 *       200:
 *         description: Active api message is returned
 */
const testController = (req, res) => {
	console.log(TEST_END_POINT_HIT);
	return res.json({
		status: res.statusCode,
		data: {
			message: ACTIVE_MESSAGE,
		},
	});
};

/**
 * @swagger
 *
 * /:
 *   post:
 *     description: Echo a message for unknown reasons
 *     produces:
 *       - text/plain; charset=utf-8
 *     consumes:
 *       - text/plain; charset=utf-8
 *     responses:
 *       200:
 *         description: Body is returned
 */
const echoController = (req, res) => {
	return res.json({
		status: res.statusCode,
		data: {
			message: ECHO_MESSAGE,
			posted: req.body,
		},
	});
};

/**
 * @swagger
 *
 * /create:
 *   post:
 *     description: Allows a user to send a contact request
 *     produces:
 *       - text/plain; charset=utf-8
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: firstname
 *         description: The firstname of the user
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastname
 *         description: The lastname of the user
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: The users email address
 *         in: formData
 *         required: true
 *         type: string
 *       - name: telephone
 *         description: The users telephone number
 *         in: formData
 *         required: true
 *         type: number
 *       - name: housenumber
 *         description: The users house number
 *         in: formData
 *         required: true
 *         type: string
 *       - name: street
 *         description: The users street
 *         in: formData
 *         required: true
 *         type: string
 *       - name: city
 *         description: The users city
 *         in: formData
 *         required: true
 *         type: string
 *       - name: county
 *         description: The users county
 *         in: formData
 *         required: true
 *         type: string
 *       - name: country
 *         description: The users country
 *         in: formData
 *         required: true
 *         type: string
 *       - name: message
 *         description: The message associated with the contact request
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Contact request was successfully submitted
 */
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
