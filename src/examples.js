const LikeController = require('../controllers/likesController');

function getPostDate() {
  const date = new Date(Date.now()).toDateString();
  const [dayOfWeek, month, day, year] = date.split(' ');
  return {
    dayOfWeek,
    day,
    month,
    year,
  };
}

// like func

function like(post_id, user_id) {
  const users = LikeController.getLikes(post_id)[0].users_id;
  for (const user of users) {
    if (user === user_id) {
      return 'Liked already';
    }
  }
  LikeController.updateLikes(post_id, user_id);
}
