const express = require("express");
const router = express.Router();
const multer = require("multer");

const Item = require("../../models/MenuItems");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        filesize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post("/upload", upload.single('food'), (req, res, next) => {
    const newItem = new Item({
        shopName: req.body.shop,
        shopID: req.body.shopid,
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        imageName: req.body.imageName,
        imagePath: req.file.path
    });

    newItem.save()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                success: true,
                document: result
            });
        })
        .catch((err) => next(err));
});

router.get("/get", (req, res) => {
    Item.find({ shopID: req.body.shopid }).then(results => {
        res.status(200).json({ menu: results });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the menu."
        });
    });
});


module.exports = router;