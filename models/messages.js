const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const addMessage = (data) => {
  try {
    const id = uuidv4();
    const message_date = Date.now();
    const { sender_id, reciever_id, chat_id, content } = data;
    const sql = `INSERT INTO messages (id, sender_id, reciever_id, chat_id, content, message_date) 
      VALUES ('${id}', '${sender_id}', '${reciever_id}', '${chat_id}', '${content}',  '${message_date}');`;
    pool.query(sql, (err, res) => {
      if (err) throw err;
      console.log(res);
    });
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = addMessage;
