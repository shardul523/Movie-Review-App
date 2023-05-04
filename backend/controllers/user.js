const UserModel = require('../models/user')

exports.createUser = async (req, res) => {
    const {username, email, password} = req.body;
    const oldUser = await UserModel.findOne({email});
    if (oldUser) return res.status(401).json({error: "This email already exists"});
    const newUser = new UserModel({username, email, password});
    await newUser.save();
    res.status(201).send("<h1>User Created</h1>");
};