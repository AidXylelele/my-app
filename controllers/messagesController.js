const MessagesModel = require('../models/messages');

class MessagesController {
  static addMessageController = async (
    content,
    sender_id,
    reciever_id,
    chat_id
  ) => {
    await MessagesModel.addMessage({
      content,
      sender_id,
      reciever_id,
      chat_id,
    }).then((result) => {
      if (result) return { messages: 'Success', resultCode: 0 };
      return { messages: 'Something went wrong!', resultCode: 1 };
    });
  };
}

module.exports = MessagesController;
