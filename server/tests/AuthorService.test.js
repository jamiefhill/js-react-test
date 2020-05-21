const { findOrAddAuthor } = require('../src/AuthorService');
const { closePool, query } = require('../src/MySQLConnection');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
	path: path.join(__dirname, './fixtures/db.env'),
});

describe('The Author Services functions will provide manipulation of author data', () => {
	const validId = 1;
	const validEmail = 'Bob@smith.comm';
	const validHost = 'localhost';
	const failedAuthorId = undefined;

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
		const author = await findOrAddAuthor(
			validNewAuthor.first_name,
			validNewAuthor.last_name,
			validEmail,
			validNewAuthor.telephone,
			validNewAuthor.housenumber,
			validNewAuthor.street,
			validNewAuthor.city,
			validNewAuthor.county,
			validNewAuthor.country
		);
		expect(author).toBe(validId);
	});

	it('Will add a new author, then find the author id by email', async () => {
		const author = await findOrAddAuthor(
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
		expect(author).not.toBe(failedAuthorId);
		await query('delete from contact where id = ?', [author]);
	});
});
