const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
        },
    ],
    subtotal: { type: Number, required: true, default: 0.0 },
    deliveryCost: { type: Number, required: true, default: 0.0 },
    total: { type: Number, required: true, default: 0.0 },
    status: { type: String, required: true, enum: ['Processing', 'Shipped', 'Delivered'], default: 'Processing' },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
