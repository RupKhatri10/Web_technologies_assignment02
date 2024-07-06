const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    shippingAddress: {type: String, required: true},    
});

userSchema.methods.comparePassword = function(candidatePassword) {
    // Compare the candidate password with the stored password
    const isMatch = candidatePassword === this.password;
    return isMatch;
};


const User = mongoose.model('User', userSchema);

module.exports = User;