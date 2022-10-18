const pool = require('./db');

async function getRes() {
  let res = await pool.query(`SELECT * FROM sessions;`);
  res = res.rows;

  console.log('porev pidor', res);
}

async function setValue(token) {
  let value = await pool.query(`
    INSERT INTO sessions(
	token) VALUES (
	 '${token}');
    `);
  console.log('porev pidor', value);
}



module.exports = {setValue, getRes };
