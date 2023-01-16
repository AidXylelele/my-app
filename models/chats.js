const pool = require('../db/pool.js');
const { v4: uuidv4 } = require('uuid');

const sql = {
  get: ({ sender, reciever }) => `SELECT * FROM chats 
    WHERE user_1 in ('${sender}', '${reciever}') 
    AND user_2 in ('${sender}', '${reciever}')`,
  create: ({ id, date, sender, reciever }) =>
    `INSERT INTO chats (id, user_1, user_2, chat_date) VALUES ('${id}', '${sender}', '${reciever}', '${date}')`,
};

class ChatModel {
  static getChat = async (users) => {
    const result = await pool.query(sql.get(users));
    return result.rows[0];
  };
  static createChat = async (users) => {
    const id = uuidv4();
    const date = Date.now();
    await pool.query(sql.create({ id, date, ...users }));
    return { id, sender, reciever, date };
  };
}

module.exports = ChatModel;
