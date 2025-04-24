import Cart from '../models/cartModel.js';
import Product from "../models/productModel.js";
import expressAsyncHandler from 'express-async-handler';

// Add item to cart
export const addItemToCart = expressAsyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const { storeId } = req.params
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(productId);

    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity = eval(`${cart.items[itemIndex].quantity} + ${quantity}`);
    } else {
        cart.items.push({ product: productId, quantity, store: storeId, price: product.price });
    }

    cart.totalPrice += quantity * product.price;

    await cart.save();
    res.json(cart);
});

// Update item quantity in cart
export const updateCartItem = expressAsyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
        const quantityAsNumber = parseInt(quantity, 10); // Explicitly convert quantity to an integer
        const previousItemTotalPrice = parseInt(cart.items[itemIndex].quantity) * cart.items[itemIndex].price;
        cart.items[itemIndex].quantity = quantityAsNumber;
        const newItemTotalPrice = quantityAsNumber * cart.items[itemIndex].price;
        cart.totalPrice += newItemTotalPrice - previousItemTotalPrice;
        await cart.save();
        res.json(cart);
    } else {
        res.status(404);
        throw new Error("Product not found in cart");
    }
});


// Remove item from cart
export const removeCartItem = expressAsyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(productId);

    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        cart.totalPrice -= cart.items[itemIndex].quantity * product.price;
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json({ message: "Item removed successfully", cart});
    } else {
        res.status(404);
        throw new Error("Product not found in cart");
    }

});

// Get all cart items for the logged-in user
export const getCartItems = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cartItems = await Cart.find({ user: userId }).populate('items.product');

  if (!cartItems || cartItems.length === 0) {
    res.status(404);
    throw new Error('No items found in your cart');
  }

  res.json(cartItems);
});

// Checkout a user's cart
export const checkoutCart = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Find the user's cart
  const cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error('Cart is empty or not found');
  }

  // Calculate total price (you can customize this further based on your logic)
  const totalPrice = cart.totalPrice;

  // Create an order from the cart
  const order = new Order({
    user: userId,
    items: cart.items,
    totalPrice,
    status: 'pending', // Set initial status of the order
  });

  await order.save();

  // Optionally, you can clear the cart after checkout
  // await Cart.deleteOne({ user: userId }); // We'll do it when the user completes the order

  res.status(201).json({
    message: 'Checkout successful',
    orderId: order._id,
    totalPrice,
  });
});

