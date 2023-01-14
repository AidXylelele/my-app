const pool = require('../db/pool.js');
const { v4: uuidv4 } = require('uuid');

class MessagesModel {
  static addMessage = async (data) => {
    try {
      const id = uuidv4();
      const message_date = Date.now();
      const { sender_id, reciever_id, chat_id, content } = data;
      const sql = `INSERT INTO messages (id, sender_id, receiver_id, chat_id, content, message_date) 
      VALUES ('${id}', '${sender_id}', '${reciever_id}', '${chat_id}', '${content}',  '${message_date}');`;
      return await pool.query(sql);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = MessagesModel;
