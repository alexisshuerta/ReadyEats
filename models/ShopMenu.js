const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
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
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    maxCount: {
        type: Number,
        default: 500,
        required: true
    }
});

module.exports = Menu = mongoose.model("menus", MenuSchema);