const { getPosts, createPost } = require('../models/posts');

async function getPostsControler(params) {
  try {
    return await getPosts(params.id);
  } catch (error) {
    console.log(error);
  }
}

async function createPostController(message, { id }) {
  try {
    return await createPost(message, id);
  } catch (error) {
    console.log(error);
  }
}

// // @desc    Create a Product
// // @route   POST /api/products
// async function createProduct(req, res) {
//   try {
//     const body = await getPostData(req);

//     const { name, description, price } = JSON.parse(body);

//     const product = {
//       name,
//       description,
//       price,
//     };

//     const newProduct = await Post.create(product);

//     res.writeHead(201, { 'Content-Type': 'application/json' });
//     return res.end(JSON.stringify(newProduct));
//   } catch (error) {
//     console.log(error);
//   }
// }

// // @desc    Update a Product
// // @route   PUT /api/products/:id
// async function updateProduct(req, res, id) {
//   try {
//     const product = await Post.findById(id);

//     if (!product) {
//       res.writeHead(404, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ message: 'Product Not Found' }));
//     } else {
//       const body = await getPostData(req);

//       const { name, description, price } = JSON.parse(body);

//       const productData = {
//         name: name || product.name,
//         description: description || product.description,
//         price: price || product.price,
//       };

//       const updProduct = await Post.update(id, productData);

//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       return res.end(JSON.stringify(updProduct));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// // @desc    Delete Product
// // @route   DELETE /api/product/:id
// async function deleteProduct(req, res, id) {
//   try {
//     const product = await Post.findById(id);

//     if (!product) {
//       res.writeHead(404, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ message: 'Product Not Found' }));
//     } else {
//       await Post.remove(id);
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ message: `Product ${id} removed` }));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = {
  getPostsControler,
  createPostController,
};
