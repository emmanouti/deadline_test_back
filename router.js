const router = require("express").Router();
const {getUsers, createUser, updateUser, deleteUser} = require("./controllers/User")
router.get("/", (req, res) => {
    res.send("Router ok");
});
router.get("/users", getUsers);
router.post("/user", createUser)
router.put("/user/:userID", updateUser);
router.delete("/user/:userID", deleteUser);

module.exports = router;