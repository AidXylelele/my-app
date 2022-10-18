let posts = require('../data/posts');
const { v4: uuidv4 } = require('uuid');

const { writeDataToFile } = require('../utils');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(posts);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = posts.find((p) => p.id === id);
    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    posts.push(newProduct);
    if (process.env.NODE_ENV !== 'test') {
      writeDataToFile('./data/posts.json', posts);
    }
    resolve(newProduct);
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = posts.findIndex((p) => p.id === id);
    posts[index] = { id, ...product };
    if (process.env.NODE_ENV !== 'test') {
      writeDataToFile('./data/posts.json', posts);
    }
    resolve(posts[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    posts = posts.filter((p) => p.id !== id);
    if (process.env.NODE_ENV !== 'test') {
      writeDataToFile('./data/posts.json', posts);
    }
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
