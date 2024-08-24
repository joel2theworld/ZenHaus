import mongoose from "mongoose";

const Schema =  mongoose.Schema;

const UserSchema = new Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    picture : {
        type: String,
        default: 'default_picture.jpg'
    },
    phone : {
        type: String,
        required: true,
        unique: true
    },
    properties: [{  // Array of references to Property
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }],
    customers: [{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }],
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model('User', UserSchema);