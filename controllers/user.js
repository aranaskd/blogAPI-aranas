const User = require("../models/User");
const bcrypt = require('bcrypt');
const auth = require("../auth");

module.exports.registerUser = (req, res) => {

    const { email, username, password } = req.body;

    // Email and password validation
    if (!email.includes("@")) {
        return res.status(400).send({ error: "Invalid email format" });
    } 
    if (password.length < 8) {
        return res.status(400).send({ error: "Password must be at least 8 characters" });
    }
    if (!username) {
        return res.status(400).send({ error: "Invalid Username" });
    }

    // Hash password and create a new user
    const newUser = new User({
        email,
        username,
        password: bcrypt.hashSync(password, 10)
    });

    newUser.save()
        .then(() => res.status(201).send({ message: "Registered successfully" }))
        .catch(err => {
            console.log(err)
            res.status(500).send({ error: "Error saving user" })
        });

}

module.exports.loginUser = (req, res) => {

    const { email, password } = req.body;

    // Email validation
    if (!email.includes("@")) {
        return res.status(400).send({ error: "Invalid email format" });
    }

    return User.findOne({ email })
        .then(result => {
            if (!result) {
                return res.status(404).send({ error: "Email not found" });
            }

            const isPasswordCorrect = bcrypt.compareSync(password, result.password);
            if (isPasswordCorrect) {
                return res.status(200).send({ access: auth.createAccessToken(result) });
            } else {
                return res.status(401).send({ message: "Email and password do not match" });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({ error: "Error logging in" })
        });

}

module.exports.getUser = (req, res) => {

    const userId = req.user.id;

    console.log(req.user);

    return User.findById(userId)
    .then(user => {

        if(!user){
            return res.status(404).json({ error: 'User not found' })
        }else {
            user.password = undefined;
            return res.status(200).json({ user });
        }  
    })
    .catch(err => res.status(500).send({ error: "Error Getting User" }));

}