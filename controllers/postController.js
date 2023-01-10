const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require('../models/posts');

class PostControllers {
  static getPostsController = async (params) => {
    return await getPosts(params.id).then((posts) => {
      if (posts) {
        return {
          posts,
          resultCode: 0,
        };
      }
      return {
        messages: 'User with the same E-mail was created!',
        resultCode: 1,
      };
    });
  };

  static createPostController = async (message, { id }) => {
    const date = Date.now();
    return await createPost(message, id, date).then((post) => {
      if (post) {
        return {
          post,
          resultCode: 0,
        };
      }
      return { messages: 'Something went wrong!', resultCode: 1 };
    });
  };

  static updatePostController = async (message, id) => {
    const date = Date.now();
    return await updatePost(message, id, date).then((result) => {
      if (result) {
        return {
          messages: 'Success!',
          resultCode: 0,
        };
      }
      return { messages: 'Something went wrong!', resultCode: 1 };
    });
  };

  static deletePostController = async ({ id }) => {
    return await deletePost(id).then((result) => {
      if (result) {
        return {
          messages: 'Successfully deleted!',
          post: {
            post_id: id,
          },
          resultCode: 0,
        };
      }
      return { messages: 'Something went wrong!', resultCode: 1 };
    });
  };
}

module.exports = {
  PostControllers,
};
