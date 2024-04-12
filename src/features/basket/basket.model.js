const mongoose = require('mongoose');

const {Schema} = mongoose;

const basketSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    items: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'products'
        }],
        default: []
    }
})

