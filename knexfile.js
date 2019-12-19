// Update with your config settings.
// require('dotenv').config();
// dotenv.config({ path: "./env" });

module.exports = {
	development: {
		client: 'pg',
		useNullAsDefault: true,
		connection: {
			database: process.env.DB_DEV_DATABASE,
			user: process.env.DB_DEV_USER
		},
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		}
	},

	test: {
		client: 'sqlite3',
		connection: {
			filename: './data/route.sqlite3'
		},
		useNullAsDefault: true,
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		}
	},
	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: './data/migrations'
		},
		seeds: { directory: './data/seeds' }
	},
	ssl: true
};
