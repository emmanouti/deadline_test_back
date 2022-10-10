const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Router ok");
});

module.exports = router;