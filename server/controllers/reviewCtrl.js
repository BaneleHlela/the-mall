import expressAsyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';


// add review
export const addReview = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    const review = await Review.create({ user: _id, ...req.body});
    res.status(201).json(review);
});

// get store reviews
export const getStoreReviews = expressAsyncHandler(async (req, res) => {
    const { storeId } = req.params;

    const reviews = await Review.find({ store: storeId }).populate('user', 'firstname lastname');
    res.json(reviews);
});

// get store reviews
export const getProductReviews = expressAsyncHandler(async (req, res) => {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId }).populate('user', 'firstname lastname');
    res.json(reviews);
});

// edit Review
export const editReview = expressAsyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
        res.status(404);
        throw new Error('Review not found');
    }

    if (review.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('You are not authorized to edit this review');
    }

    review.rating = rating;
    review.comment = comment;

    await review.save();
    res.json(review);
});

// Delete Review
export const deleteReview = expressAsyncHandler(async (req, res) => {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
        res.status(404);
        throw new Error('Review not found');
    }

    if (review.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('You are not authorized to delete this review');
    }

    await review.remove();
    res.status(204).json({ message: 'Review deleted successfully' });
});

// Get Reviews by User with Query Functionality
export const getUserReviews = expressAsyncHandler(async (req, res) => {
    const { storeId, productId, serviceId } = req.query;
    const { userId } = req.params;

    const filter = { user: userId };

    if (storeId) {
        filter.store = storeId;
    }

    if (productId) {
        filter.product = productId;
    }

    if (serviceId) {
        filter.service = serviceId;
    }

    const reviews = await Review.find(filter).populate('store product user', "name firstname lastname"); // it's a bit redundant to populate user
    res.json(reviews);
});
