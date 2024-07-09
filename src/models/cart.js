import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    quantity: {
        type: Number,
        required: true,
        defaultValue: 1
    }
}, { timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);

export default Cart;