import mongoose from "mongoose";

const Schema = mongoose.Schema;

const propertySchema = new Schema ({
    name : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    price : {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['Available', 'Unavailable']
    },
    listingType : {
        type: String,
        enum: ['Sale', 'Rental']
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
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