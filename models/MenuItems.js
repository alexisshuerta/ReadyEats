const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    shopName: {
        type: String,
        required: true
    },
    shopID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['meat', 'vegetarian', 'vegan'],
        default: 'meat'
    },
    imagePath: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    maxCount: {
        type: Number,
        default: 500
    }
});

module.exports = Item = mongoose.model("items", ItemSchema);