const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pointsClaimed: {
        type: Number,
        require: true
    },
    claimedAt: {
        type: Date,
        default: Date.now
    }
},{timestamps:true});

module.exports = mongoose.model('History', historySchema);