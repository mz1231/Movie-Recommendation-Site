var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
    console.log(req.body)
    res.send("API is working properly POST");
});

router.get("/", function(req, res, next) {
    console.log(req.data)
    res.send("API is working properly GET");
});

module.exports = router;