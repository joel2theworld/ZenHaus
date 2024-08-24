import mongoose from "mongoose";

const Schema = mongoose.Schema;

const propertySchema = new Schema ({
    name : {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['available', 'unavailable']
    },
    category : {
        type: String,
        enum: ['sale', 'rental', 'shortlet']
    },
    description: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        default: 'image'
    },
    image2: {
        type: String,
        default: 'image'
    },
    image3: {
        type: String,
        default: 'image'
    },
    image4: {
        type: String,
        default: 'image'
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    document: {
        type: String,
        default: 'document'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Property = mongoose.model('Property', propertySchema);