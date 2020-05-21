const { findAuthorId, addAuthor, addMessage } = require('../src/DBQueries');
const { closePool, query } = require('../src/MySQLConnection');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
	path: path.join(__dirname, './fixtures/db.env'),
});

describe('The DBQueries functions will return data from the db', () => {
	const validId = 1;
	const validEmail = 'Bob@smith.comm';
	const invalidEmail = 'John@smith.comm';
	const validMessage = 'I need some help with my tests.';
	const validHost = 'localhost';
	const failedAuthorId = undefined;
	const failedMessageResult = null;

	const validNewAuthor = {
		first_name: 'Sally',
		last_name: 'Picard',
		email: 'sally@ent.com',
		telephone: '+01170110711',
		housenumber: '1701',
		street: 'utopia',
		city: 'planitia',
		county: 'Casius quadrangle',
		country: 'mars',
	};

	beforeEach(() => {
		/**
		 * Normally I would run a db setup,
		 * however the data is already in
		 * the contact table from db-seed.
		 */
		process.env.DB_HOST = validHost;
	});

	afterEach(async () => {
		/**
		 * Normally I would run a db teardown,
		 * however the data is not modified during
		 * a test, outside of an insert that is
		 * removed within that tests due to the
		 * unusual requirements.
		 */
		await closePool();
	});

	it('Will find an author id by email', async () => {
		const author = await findAuthorId(validEmail);
		expect(author).toBe(validId);
	});

	it('Will fail to find an author id by email', async () => {
		const author = await findAuthorId(invalidEmail);
		expect(author).toBe(failedAuthorId);
	});

	it('Will add a new author, then find the author id by email', async () => {
		await addAuthor(
			validNewAuthor.first_name,
			validNewAuthor.last_name,
			validNewAuthor.email,
			validNewAuthor.telephone,
			validNewAuthor.housenumber,
			validNewAuthor.street,
			validNewAuthor.city,
			validNewAuthor.county,
			validNewAuthor.country
		);
		const author = await findAuthorId(validNewAuthor.email);
		expect(author).not.toBe(failedAuthorId);
		await query('delete from contact where id = ?', [author]);
	});

	it('Will add a new message to the database', async () => {
		await addMessage(validId, validMessage);
		const message = await query('select * from messages where message = ?', [
			validMessage,
		]);
		expect(message[0]).not.toBe(failedMessageResult);
	});
});
