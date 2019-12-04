const express = require("express");
const router = express.Router();
const multer = require("multer");
const moment = require("moment");
const cryptoRandomString = require('crypto-random-string');


const Meal = require("../../models/DailyItems");
const Reservation = require("../../models/Reservations");

router.post("/reserve", (req, res, next) => {
    Meal.findById(req.body.mealid, (err, meal) => {
        if (err) {
            return res.status(500).json({
                message: err.message || "Some error occured while retrieving the specified meal."
            });
        }

        const initPickupTime = moment(meal.expireAt).startOf('day').add(14, 'hours').valueOf();
        const confirmationCode = cryptoRandomString({ length: 8, type: 'url-safe' });

        const newReservation = new Reservation({
            username: req.body.username,
            userID: req.body.userid,
            shopID: meal.shopID,
            itemName: meal.name,
            itemID: req.body.mealid,
            imagePath: meal.imagePath,
            code: confirmationCode,
            isPickedup: false,
            pickupTime: initPickupTime,
        });

        Reservation.deleteMany({ userID: req.body.userid })
            .then(result => {
                console.log(result);
                newReservation.save()
                    .then((result) => {
                        res.status(200).json({
                            success: true,
                            document: result
                        });
                    })
                    .catch((err) => next(err));
            }).catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: err.message || "Setting the reservation."
                });
            });
    });
});

router.get("/get", (req, res) => {
    Reservation.find({ shopID: req.query.shopid, isPickedup: false }).then(results => {
        res.status(200).json({ Reservations: results });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving reservations."
        });
    });
});


router.get("/getreservation", (req, res) => {
    Reservation.find({ userID: req.query.userid }).then(results => {
        res.status(200).json(results);
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving available meals."
        });
    });
});

router.get("/pickup", (req, res) => {
    Reservation.findOneAndUpdate({ userID: req.query.userid }, { isPickedup: true, pickupTime: moment().valueOf() }).then(results => {
        res.status(200).json({ Reservations: results });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred picking up meal."
        });
    });
});

module.exports = router;