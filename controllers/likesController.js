const LikeModel = require("../models/likes");

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
      messages: "Oops! Something went wrong",
      resultCode: 1,
    };
  }
}

module.exports = LikeController;
