const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 8000,
  database: 'application',
  user: 'admin',
  password: 'Qwerty123',
});

module.exports = pool;
