const {
  setValue,
  getValue,
  deleteValue,
} = require('../controllers/sessionController');

class Storage extends Map {
  get(key, callback) {
    const value = super.get(key);
    if (value) {
      callback(null, value);
      return;
    }

    getValue(key, (session) => {
      console.log(`Session loaded: ${key}`);
      super.set(key, session);
      callback(null, session);
    });
  }

  save(key) {
    const value = super.get(key);
    if (value) {
      console.log(key);
      const data = JSON.stringify(value);
      setValue(key, data, (key) => {
        console.log(`Session saved: ${key}`);
      });
    }
  }

  delete(key) {
    console.log('Delete: ', key);
    deleteValue(key, () => {
      console.log(`Session deleted: ${key}`);
    });
  }
}

module.exports = new Storage();
