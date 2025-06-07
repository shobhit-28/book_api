import jwt from 'jsonwebtoken';
import User from '../models/User.js'
// const User = require('../models/User');

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export const signup = async (req, res) => {
    console.log('signed up')
    try {
        const { name, username, password } = req.body;
        const user = new User({ name, username, password });
        await user.save();
        const token = generateToken(user);
        res.status(201).json({ token })
    } catch (err) {
        console.error(err)
        res.status(400).json({ error: err.message })
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ error: `User not found` });
    } else if (!(await user.comparePassword(password))) {
        return res.status(401).json({ error: `Incorrect Password` })
    }
    const token = generateToken(user)
    res.status(200).json({ token })
}