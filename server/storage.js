const fs = require('node:fs');
const path = require('node:path');
const v8 = require('node:v8');
const {
  setValue,
  getValue,
  deleteValue,
} = require('../controllers/sessionController');

const PATH = `${__dirname}/sessions`;

const safePath =
  (fn) =>
  (token, ...args) => {
    const callback = args[args.length - 1];
    if (typeof token !== 'string') {
      callback(new Error('Invalid session token'));
      return;
    }
    const fileName = path.join(PATH, token);
    if (!fileName.startsWith(PATH)) {
      callback(new Error('Invalid session token'));
      return;
    }
    fn(fileName, ...args);
  };

const operationsWithDB =
  (fn) =>
  async (token, ...args) => {
    const callback = args[args.length - 1];
    if (typeof token !== 'string') {
      callback(new Error('Invalid session token'));
      return;
    }
    await fn(token, ...args);
  };

const readSession = safePath(fs.readFile);
const writeSession = safePath(fs.writeFile);
const deleteSession = safePath(fs.unlink);

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

    // readSession(key, (err, data) => {
    //   if (err) {
    //     callback(err);
    //     return;
    //   }
    //   console.log(`Session loaded: ${key}`);
    //   const session = v8.deserialize(data);
    //   // (async () => {
    //   //   await setValue(key);
    //   //   await getRes()
    //   // })();
    //   super.set(key, session);
    //   callback(null, session);
    // });
  }

  save(key) {
    const value = super.get(key);
    if (value) {
      console.log(key);
      const data = JSON.stringify(value);
      setValue(key, data, (key) => {
        console.log(`Session saved: ${key}`);
      });
      // writeSession(key, data, () => {
      //   console.log(`Session saved: ${key}`);
      // });
    }
  }

  delete(key) {
    console.log('Delete: ', key);
    deleteValue(key, () => {
      console.log(`Session deleted: ${key}`);
    });

    // deleteSession(key, () => {
    //   console.log(`Session deleted: ${key}`);
    // });
  }
}

module.exports = new Storage();
