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

        Reservation.deleteMany({ userID: req.body.userid })
            .then(results => {
                res.status(200).json({ DeletedReservation: results });
            }).catch((err) => {
                res.status(500).json({
                    message: err.message || "Some error occurred while deleting existing reservation."
                });
            });

        const initPickupTime = moment(meal.expireAt).startOf('day').add(14, 'hours').valueOf();
        const confirmationCode = cryptoRandomString({ length: 8, type: 'url-safe' });

        const newReservation = new Reservation({
            username: req.body.username,
            userID: req.body.userid,
            shopID: meal.shopID,
            itemName: meal.imageName,
            imagePath: meal.path,
            code: confirmationCode,
            isPickedup: false,
            pickupTime: initPickupTime,
        });

        newReservation.save()
            .then((result) => {
                console.log(result);
                res.status(200).json({
                    success: true,
                    document: result
                });
            })
            .catch((err) => next(err));

    });
});

router.get("/get", (req, res) => {
    Reservation.find({ shopID: req.query.shopid }).then(results => {
        res.status(200).json({ Reservations: results });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving reservations."
        });
    });
});


router.get("/getreservation", (req, res) => {
    Reservation.find({ userID: req.query.userid }).then(results => {
        res.status(200).json({ Reservations: results });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving available meals."
        });
    });
});

router.get("/getreservation", (req, res) => {
    Reservation.find({ userID: req.query.userid }).then(results => {
        res.status(200).json({ Reservations: results });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving available meals."
        });
    });
});

module.exports = router;