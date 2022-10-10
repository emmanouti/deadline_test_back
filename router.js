const router = require("express").Router();
const {getUsers} = require("./controllers/User")
router.get("/", (req, res) => {
    res.send("Router ok");
});
router.get("/users", getUsers);

module.exports = router;