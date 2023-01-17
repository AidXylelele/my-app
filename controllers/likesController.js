const LikeModel = require('../models/likes');

class LikeController {
  static async getLikes(params) {
    const likes = await LikeModel.getLikes(params.id);
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
  }

  static async updateLikes(user_id, post_id) {
    const likes = await LikeModel.updateLikes(user_id, post_id);
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
  }

  static async deleteLikes(user_id, post_id) {
    const deleted = await LikeModel.deleteLikes(user_id, post_id);
    if (deleted) {
      return {
        deleted,
        resultCode: 0,
      };
    }
    return {
      messages: 'Oops! Something went wrong',
      resultCode: 1,
    };
  }
}

module.exports = LikeController;
