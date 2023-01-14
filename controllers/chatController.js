const ChatModel = require('../models/chats.js');

class ChatController {
  static getChatController = async (sender, reciever) => {
    const rows = await ChatModel.getChat({ sender, reciever }).catch((err) => {
      console.log(err);
    });
    return rows;
  };
  static createChatController = async (sender, reciever) => {
    const rows = await ChatModel.createChat({ sender, reciever }).catch(
      (err) => {
        console.log(err);
      }
    );
    return rows;
  };
}

module.exports = ChatController;
