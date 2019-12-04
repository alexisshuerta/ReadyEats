const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    shopID: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemID: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    isPickedup: {
        type: Boolean,
        default: false
    },
    pickupTime: {
        type: Date,
        default: undefined
    },
    date: {
        type: Date,
        default: Date.now
    }
});

ReservationSchema.index({ "pickupTime": 1 }, { expireAfterSeconds: 180 });

module.exports = Reservation = mongoose.model("reservations", ReservationSchema);