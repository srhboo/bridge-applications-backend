module.exports = {
  client: 'pg',
  connection: {
    database:
      process.env.NODE_ENV === 'development'
        ? 'bridge-applications-local'
        : process.env.RDS_DB_NAME,
    host: process.env.NODE_ENV === 'development' ? 'db' : process.env.RDS_HOSTNAME,
    user: process.env.NODE_ENV === 'development' ? 'admin' : process.env.RDS_USERNAME,
    password: process.env.NODE_ENV === 'development' ? 'admin' : process.env.RDS_PASSWORD,
  },
  migrations: {
    directory: `${__dirname}/db/migrations`,
  },
  seeds: {
    directory: `${__dirname}/db/seeds`,
  },
};
