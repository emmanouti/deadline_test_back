const User = require("../model/User")

const getUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
};

const createUser = (req, res) => {
    const user = new User({
        pseudo: req.body.pseudo,
        surname: req.body.surname,
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
    })
    user.save((err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    })
}

module. exports = {
    getUsers,
    createUser,
};