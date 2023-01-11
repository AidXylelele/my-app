const LikeModel = require('../models/likes');

class LikeController {
  static getLikesController = async (params) => {
    return await LikeModel.getLikes(params.id).then((likes) => {
      if (likes) {
        return {
          likes,
          resultCode: 0,
        };
      }
      return {
        messages: 'Oops! Something went wrong',
        resultCode: 1,
      };
    });
  };
}

module.exports = LikeController;
