import expressAsyncHandler from 'express-async-handler';
import WishFavs from '../models/wishFavsModel.js';

// Add to Wishlist/Favorites
export const addToWishFavs = expressAsyncHandler(async (req, res) => {
    const { product, store, note } = req.body;
    const { _id } = req.user;

    // Check if already in wishlist/favorites to avoid duplicates
    const existingWishFav = await WishFavs.findOne({
        user: _id,
        $or: [{ product }, { store }]
    });

    if (existingWishFav) {
        res.status(400);
        throw new Error('Item is already in your wishlist or favorites.');
    }

    const wishFav = await WishFavs.create({ user: _id, product, store, note });
    await wishFav.populate("store product", "name title")
    res.status(201).json(wishFav);
});

// View Wishlist/Favorites for a User
export const getUserWishFavs = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;

    const wishFavs = await WishFavs.find({ user: _id })
        .populate('product', 'title price') // Adjust to include necessary product fields
        .populate('store', 'name businnesType'); // Adjust to include necessary store fields

    res.json(wishFavs);
});

// Remove from Wishlist/Favorites
export const removeFromWishFavs = expressAsyncHandler(async (req, res) => {
    const { wishFavId } = req.params;
    const userId = req.user._id;

    const wishFav = await WishFavs.findOneAndDelete({ _id: wishFavId, user: userId });

    if (!wishFav) {
        res.status(404);
        throw new Error('Item not found in wishlist or favorites.');
    }

    res.json({ message: 'Item removed from wishlist/favorites.' });
});
