const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User ID is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    author: {
        name: { 
            type: String, 
            required: [true, 'Name is Required']
        },
        email: { 
            type: String, 
            required: [true, 'Email is Required'] 
        }
    },
    comments: [
        {
            userId: {
                type: String,
                required: [true, "User ID is required"]
            },
            comment: {
                type: String,
                required: [true, "Content is required"]
            },
            createdOn: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);
