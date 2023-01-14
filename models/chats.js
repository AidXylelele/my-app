const pool = require('../db/pool.js');
const { v4: uuidv4 } = require('uuid');

class ChatModel {
  static getChat = async (users) => {
    const { sender, reciever } = users;
    const sql = `SELECT * FROM chats 
    WHERE user_1 in ('${sender}', '${reciever}') 
    AND user_2 in ('${sender}', '${reciever}')`;
    const result = await pool.query(sql);
    return result.rows[0];
  };
  static createChat = async (users) => {
    const id = uuidv4();
    const { sender, reciever } = users;
    const date = Date.now();
    const sql = `INSERT INTO chats (id, user_1, user_2, chat_date) VALUES ('${id}', '${sender}', '${reciever}', '${date}')`;
    await pool.query(sql);
    return { id, sender, reciever, date };
  };
}

module.exports = ChatModel;
