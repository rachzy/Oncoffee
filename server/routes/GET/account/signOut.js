const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.clearCookie("userId");
    res.clearCookie("stoken1");
    res.clearCookie("stoken2");

    res.send({
        queryStatus: 200
    });
});

module.exports = router;