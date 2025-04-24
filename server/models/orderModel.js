import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            store: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "store",
                required: true
            }
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    /*paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
    },*/
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Paystack'],
    },
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
