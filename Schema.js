const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    }
})

const UserSchema = mongoose.model('SCHEMA', Schema);

module.exports = UserSchema;