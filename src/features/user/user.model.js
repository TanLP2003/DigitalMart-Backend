const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    hashPassword: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function(v) {
                return /^0\d{9,10}$/.test(v)
            },
            message: props => `${props.value} is not a valid number!`
        }
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    gender: {
        type: String,
        enum: {
            values: ["MALE", "FEMALE", "CUSTOM"],
            message: `${VALUE} is not supported!`
        },
        require: true
    },
    role: {
        type: String,
        enum: {
            values: ["CUSTOMER", "ADMIN"],
            message: `${VALUE} is not supported`
        },
        default: "CUSTOMER",
        require: true
    }
})

const User = mongoose.Model('User', userSchema);
module.exports = User;