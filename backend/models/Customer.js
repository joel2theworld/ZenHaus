import mongoose from "mongoose";

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
        default: 'Is this still available?'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Customer = mongoose.model('Customer', customerSchema);