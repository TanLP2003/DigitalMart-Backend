const mongoose = require('mongoose');
const {Schema} = mongoose;

const tokenSchema = new Schema({
    refreshToken: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    }
})

const Token = mongoose.model('tokens', tokenSchema);
module.exports = Token;