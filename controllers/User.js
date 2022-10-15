require("dotenv").config();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
    const user_id = req.params.userID;
    const user = await User.findOne({_id: user_id})
    if (user) {
        res.json(user);
    } else {
        res.send("no user found")
    }
};

const getUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
};

const createUser = async (req, res) => {
    try {
        const {
            pseudo,
            surname,
            name,
            address,
            email,
            phone,
            password
        } = req.body;
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const oldPseudo = await User.findOne({pseudo});
        if (oldPseudo) {
            return res.status(409).send("Pseudo already used. Please find another one.")
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            pseudo,
            surname,
            name,
            address,
            email,
            phone,
            password: encryptedPassword,
        });
        const data = {user}
        data["token"] = user.token = jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        res.status(201).json(data);
    } catch (err) {
        res.send(err);
    }
};

const loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        if (!email || !password) {
            res.status(400).send("Email and password required");
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const data = {user}
            data["token"] = user.token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            res.status(200).json(data);
        } else {
            res.status(400).send("Unauthorized");
        }
    } catch (err) {
        res.send(err)
    }
}

const updateUser = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.params.userID},
        {$set: {
                address: req.body.address,
                email: req.body.email,
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
    getUser,
    getUsers,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
};