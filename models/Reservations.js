const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    shopid: {
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
    },
});

ReservationSchema.index({ "pickupTime": 1 }, { expireAfterSeconds: 180 });

module.exports = Reservation = mongoose.model("reservations", ReservationSchema);