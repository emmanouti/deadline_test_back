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
};

const updateUser = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.params.userID},
        {$set: {
                pseudo: req.body.pseudo,
                surname: req.body.surname,
                name: req.body.name,
                address: req.body.address,
                email: req.body.email,
                phone: req.body.phone,
            },
        },
        {new: true},
        (err, User) => {
            if (err) {
                 res.send(err);
            } else res.json(User);
        }
    );
};

const deleteUser = (req, res) => {
    User.deleteOne(
        {_id: req.params.userID}
    )
        .then(() => res.json({message: "User Deleted"}))
        .catch((err) => res.send(err));
};


module. exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};