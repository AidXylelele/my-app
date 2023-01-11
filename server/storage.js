const SessionController = require('../controllers/sessionController');

class Storage extends Map {
  get(key, callback) {
    const value = super.get(key);
    if (value) {
      callback(null, value);
      return;
    }

    SessionController.getSessionTokenController(key, (session) => {
      console.log(`Session loaded: ${key}`);
      super.set(key, session);
      callback(null, session);
    });
  }

  save(key) {
    const value = super.get(key);
    if (value) {
      const data = JSON.stringify(value);
      SessionController.getSessionTokenController(data, (key) => {
        console.log(`Session saved: ${key}`);
      });
    }
  }

  delete(key) {
    console.log('Delete: ', key);
    SessionController.deleteSessionTokenController(key, () => {
      console.log(`Session deleted: ${key}`);
    });
  }
}

module.exports = new Storage();
