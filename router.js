const router = require("express").Router();
const {getUsers, createUser} = require("./controllers/User")
router.get("/", (req, res) => {
    res.send("Router ok");
});
router.get("/users", getUsers);
router.post("/user", createUser)

module.exports = router;