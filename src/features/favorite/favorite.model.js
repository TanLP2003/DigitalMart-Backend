const mongoose = require('mongoose');
const {Schema} = mongoose;

const favoriteSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        index: true,
        unique: true
    },
    items: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'products'
        }],
        default: []
    }
})

const Favorite = mongoose.model('favorites', favoriteSchema);
module.exports = Favorite;