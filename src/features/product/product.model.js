const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        double: true,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    brand: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true,
        index: true
    },
    metadata: {
        type: Object,
        default: {}
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
})

productSchema.pre('save', function (next) {
    if (this.isNew) {
        // console.log("product is new");
        this.category = new mongoose.Types.ObjectId(this.category);
    }
    next();
})

productSchema.plugin(mongoosePaginate);

module.exports = Product = mongoose.model("products", productSchema);