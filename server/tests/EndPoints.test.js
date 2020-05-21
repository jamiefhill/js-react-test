const {
	testController,
	echoController,
	createController,
} = require('../src/EndPoints');
const path = require('path');
const dotenv = require('dotenv');
const { closePool, query } = require('../src/MySQLConnection');

dotenv.config({
	path: path.join(__dirname, './fixtures/db.env'),
});

describe('End points will provide responses to api end point requests', () => {
	const validTestMessage = 'API Active';
	const validEchoMessage = 'ECHO!';
	const failedToThrow = 'failed to throw';
	const invalidMessage =
		'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
	const failedToAddMessage =
		'"message" length must be less than or equal to 255 characters long';
	const failedToAddAuthor =
		'"firstname" length must be less than or equal to 255 characters long';
	const validNewEmail = 'sally@ent.com';
	const deleteByEmailSQL = 'delete from contact where email = ?';
	const dummyBodyContent = 'Body';
	const validContactRequest = {
		firstname: 'Sally',
		lastname: 'Picard',
		email: validNewEmail,
		telephone: '+01170110711',
		housenumber: '1701',
		street: 'utopia',
		city: 'planitia',
		county: 'Casius quadrangle',
		country: 'Mars',
		message: 'I am stuck in a turbo lift',
	};

	const sendStatus = jest.fn(() => {
		return null;
	});

	const json = jest.fn(() => {
		return null;
	});

	afterEach(async () => {
		await closePool();
	});

	it('Will return a test result', () => {
		const res = { json };
		testController(null, res);
		expect(res.json).toHaveBeenCalled();
		expect(res.json.mock.calls[0][0].data.message).toBe(validTestMessage);
	});

	it('Will return an echo result', () => {
		const req = { body: dummyBodyContent };
		const res = { json };
		echoController(req, res);
		expect(res.json).toHaveBeenCalled();
		expect(res.json.mock.calls[0][0].data.message).toBe(validEchoMessage);
	});

	it('Will create a new contact request', async () => {
		const req = { body: validContactRequest };
		const res = { sendStatus };
		await createController(req, res);
		await query(deleteByEmailSQL, [validNewEmail]);
		expect(res.sendStatus).toHaveBeenCalled();
	});

	it('Will fail to create a new contact request with bad message', async () => {
		const req = { body: validContactRequest };
		req.body.message = invalidMessage;
		const res = { sendStatus };
		try {
			await createController(req, res);
			throw new Error(failedToThrow);
		} catch (e) {
			await query(deleteByEmailSQL, [validNewEmail]);
			expect(e.message).toBe(failedToAddMessage);
		}
	});

	it('Will fail to create a new contact request with bad author', async () => {
		const req = { body: validContactRequest };
		req.body.firstname = invalidMessage;
		const res = { sendStatus };
		try {
			await createController(req, res);
			throw new Error(failedToThrow);
		} catch (e) {
			await query(deleteByEmailSQL, [validNewEmail]);
			expect(e.message).toBe(failedToAddAuthor);
		}
	});
});
