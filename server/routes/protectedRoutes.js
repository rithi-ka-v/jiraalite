const express = require("express");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();

// User Route
router.get(
    "/profile",
    protect,
    (req, res) => {

        res.json({
            message: "Profile Access Granted",
            user: req.user
        });
    }
);

// Admin Route
router.get(
    "/admin",
    protect,
    adminOnly,
    (req, res) => {

        res.json({
            message: "Welcome Admin"
        });
    }
);

module.exports = router;