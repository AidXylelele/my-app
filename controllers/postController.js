const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require('../models/posts');

async function getPostsControler(params) {
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
}

async function createPostController(message, { id }) {
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
}

async function updatePostController(message, id) {
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
}

const deletePostController = async ({ id }) => {
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

module.exports = {
  getPostsControler,
  createPostController,
  updatePostController,
  deletePostController,
};
