const {
    Schema
} = require('mongoose');
const { bookDatabase } = require('./db');

const UserSchema = new Schema({
    username: {
        type: String
    },
    userphone: {
        type: String
    },
    userCompany: {
        type: String
    },
    openid: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = bookDatabase.model('User', UserSchema);
module.exports = User;