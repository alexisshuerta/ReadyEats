const express = require("express");
const router = express.Router();
const multer = require("multer");
const moment = require("moment");

const Meal = require("../../models/DailyItems");
const Menu = require("../../models/MenuItems");

router.post("/setmeal", (req, res, next) => {
    Menu.findById(req.body.itemid, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: err.message || "Some error occured while retrieving the specified meal."
            });
        }

        const expTime = moment().startOf('day').add(24 + 15, 'hours').valueOf();

        const newMeal = new Meal({
            shopName: item.shop,
            name: item.name,
            description: item.description,
            type: item.type,
            imageName: item.imageName,
            imagePath: item.path,
            expireAt: expTime,
            maxCount: item.maxCount
        });

        newMeal.save()
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
    Item.find({}).then(results => {
        res.status(200).json({ meals: results });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving available meals."
        });
    });
});


module.exports = router;