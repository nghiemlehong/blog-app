const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String, required: true,
        unique: true,
        match : /\w+@([a-z]+\.[a-z]+)((.[a-z])*)/
    },
    pass: { type: String, required: true },
    name: { type: String, required: true },
    avatar: {type:String},
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

const User = mongoose.model('User', userSchema);
module.exports = { User };