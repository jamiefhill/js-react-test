const mysql = require('mysql');

//CREATE CONNECTION
// @see documentenation at https://github.com/mysqljs/mysql
let dbPool = null;

const getConnection = async () => {
	if (!dbPool) {
		await startPool();
	}
	return new Promise((resolve, reject) => {
		dbPool.getConnection((err, conn) => {
			if (err) return reject(err);
			resolve(conn);
		});
	});
};

//QUERY
const query = async (sql, args) => {
	const db = await getConnection();
	return new Promise((resolve, reject) => {
		try {
			db.query(sql, args, async (err, rows) => {
				db.release();
				if (err) return reject(err);
				resolve(rows);
			});
		} catch (e) {
			reject(e.message);
		}
	});
};

const closePool = () => {
	return new Promise((resolve, reject) => {
		try {
			dbPool.end((err) => {
				dbPool = null;
				if (err) return reject(err);
				resolve();
			});
		} catch (e) {
			/**
			 * Counter intuitive to resolve on
			 * error, however if there is no
			 * connection to close, there is
			 * no problem.
			 */
			resolve();
		}
	});
};

const startPool = async () => {
	try {
		await closePool();
	} finally {
		dbPool = await mysql.createPool({
			connectionLimit: process.env.DB_CONNECTION_LIMIT,
			port: process.env.DB_PORT,
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
		});
	}
};

module.exports = { query, closePool, startPool };
