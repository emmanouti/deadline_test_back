const router = require("express").Router();
const {getUsers, createUser, loginUser, updateUser, deleteUser} = require("./controllers/User")

router.get("/", (req, res) => {
    res.send("Router ok");
});
router.get("/user/:userID", getUsers);
router.post("/newUser", createUser);
router.post("/login", loginUser);
router.put("/user/:userID", updateUser);
router.delete("/user/:userID", deleteUser);

module.exports = router;