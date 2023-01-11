const PostModel = require('../models/posts');

class PostController {
  static async getPosts(params) {
    const posts = await PostModel.getPosts(params.id);
    if (!posts) {
      return { messages: 'User does not have any posts', resultCode: 1 };
    }
    return { posts, resultCode: 0 };
  }

  static async createPost(message, { id }) {
    const date = Date.now();
    const post = await PostModel.createPost(message, id, date);
    if (!post) {
      return { messages: 'Something went wrong!', resultCode: 1 };
    }
    return { post, resultCode: 0 };
  }

  static async updatePost(message, id) {
    const date = Date.now();
    const result = await PostModel.updatePost(message, id, date);
    if (!result) {
      return { messages: 'Something went wrong!', resultCode: 1 };
    }
    return { messages: 'Success!', resultCode: 0 };
  }

  static async deletePost({ id }) {
    const result = await PostModel.deletePost(id);
    if (!result) {
      return { messages: 'Something went wrong!', resultCode: 1 };
    }
    return {
      messages: 'Successfully deleted!',
      post: { post_id: id },
      resultCode: 0,
    };
  }
}

module.exports = PostController;
