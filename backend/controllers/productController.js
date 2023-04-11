import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

const getProducts = async (req, res) => {
  // Use destructuring to extract the query parameters
  const { keyword, pageNumber = 1 } = req.query;
  const pageSize = 10;

  // Create a filter object to pass to the find method
  const filter = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};

  try {
    // Use Promise.all to execute countDocuments and find in parallel
    const [count, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter)
        .limit(pageSize)
        .skip(pageSize * (pageNumber - 1)),
    ]);

    // Send the response
    res.json({
      products,
      page: pageNumber,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    // Handle any errors and send an error response
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product Not Found!');
  }
});
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: req.params.id });
    res.json({
      message: 'Product Removed',
    });
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }
    const review = {
      name: req.user.name,
      rating: +rating,
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  updateProduct,
  createProduct,
  deleteProductById,
  getProducts,
  getProductById,
  createProductReview,
  getTopProducts,
};
