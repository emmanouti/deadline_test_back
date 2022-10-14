const router = require("express").Router();
const {getUser, createUser, loginUser, updateUser, deleteUser} = require("./controllers/User")
const auth = require("./middlewares/auth");

router.get("/", (req, res) => {
    res.send("Router ok");
});
router.get("/user/:userID", auth, getUser);
router.post("/newUser", createUser);
router.post("/login", loginUser);
router.put("/user/:userID", auth, updateUser);
router.delete("/user/:userID", auth, deleteUser);

module.exports = router;