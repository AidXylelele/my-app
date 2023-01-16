const pool = require('../db/pool.js');
const { v4: uuidv4 } = require('uuid');

const sql = {
  add: ({
    id,
    message_date,
    sender_id,
    reciever_id,
    chat_id,
    content,
  }) => `INSERT INTO messages (id, sender_id, receiver_id, chat_id, content, message_date) 
      VALUES ('${id}', '${sender_id}', '${reciever_id}', '${chat_id}', '${content}',  '${message_date}');`,
};

class MessagesModel {
  static addMessage = async (data) => {
    try {
      const id = uuidv4();
      const message_date = Date.now();
      return await pool.query(sql.add({ id, message_date, ...data }));
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = MessagesModel;
