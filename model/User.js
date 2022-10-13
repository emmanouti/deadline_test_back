const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        unique: true
    },
    surname: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', UserSchema)