const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    score: { 
        type: Number, 
        default: 0, 
        min: 0 // Ensure score is non-negative
    },
    highScore: { 
        type: Number, 
        default: 0, 
        min: 0 // Ensure highScore is non-negative
    },
    challengedHighScore: { 
        type: Number, 
        default: 0, 
        min: 0 // Ensure challengedHighScore is non-negative
    },
}, { 
    timestamps: true // Adds `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('User', userSchema);