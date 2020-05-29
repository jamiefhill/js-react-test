const path = require('path');
const dotenv = require('dotenv');
const { query, closePool, startPool } = require('../src/MySQLConnection');
const fs = require('fs');
const mysql = require('mysql');
const dbSetupPath = path.join(__dirname, './fixtures/testdata_setup.sql');
const dbTeardownPath = path.join(__dirname, './fixtures/testdata_teardown.sql');
const setupDBSQL = fs.readFileSync(dbSetupPath).toString();
const teardownDBSQL = fs.readFileSync(dbTeardownPath).toString();

dotenv.config({
	path: path.join(__dirname, './fixtures/db.env'),
});
let db;

describe('MySQL connection will manage db connection and queries', () => {
	const validHost = 'localhost';
	const invalidHost = 'not_really_localhost';
	const validQuery = 'select * from testdata where email = ?';
	const invalidQuery = 'this is not a query';
	const validEmail = 'Bob@smith.comm';
	const validRowId = 1;
	const failedToThrow = 'failed to throw';
	const connectionError = 'getaddrinfo ENOTFOUND not_really_localhost';
	const sqlSyntaxERror = /You have an error in your SQL syntax;/;

	beforeEach(async () => {
		process.env.DB_HOST = validHost;
		db = mysql.createConnection({
			connectionLimit: process.env.DB_CONNECTION_LIMIT,
			port: process.env.DB_PORT,
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			multipleStatements: true,
		});
		await new Promise((resolve, reject) => {
			db.query(setupDBSQL, [], async (err, rows) => {
				if (err) return reject(err);
				resolve(rows);
			});
		});
	});

	afterEach(async () => {
		await new Promise((resolve, reject) => {
			db.query(teardownDBSQL, [], async (err, rows) => {
				db.end();
				if (err) return reject(err);
				resolve(rows);
			});
		});
		await closePool();
	});

	it('Will fail to get a database connection', async () => {
		try {
			process.env.DB_HOST = invalidHost;
			await startPool();
			await query(validQuery, [validEmail]);
			throw new Error(failedToThrow);
		} catch (e) {
			expect(e).toBe(connectionError);
		}
	});

	it('Will query the database', async () => {
		const rows = await query(validQuery, [validEmail]);
		expect(rows[0].id).toBe(validRowId);
	});

	it('Will fail to with a bad query', async () => {
		try {
			await query(invalidQuery, [validEmail]);
			throw new Error(failedToThrow);
		} catch (e) {
			expect(e.message).toMatch(sqlSyntaxERror);
		}
	});
});
