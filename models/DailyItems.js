const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealSchema = new Schema({
    shopName: {
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
    imagePath: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    expireAt: {
        type: Date,
        default: undefined
    },
    maxCount: {
        type: Number,
        default: 500
    }
});

MealSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });

module.exports = Meal = mongoose.model("meals", MealSchema);