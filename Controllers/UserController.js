import expressAsyncHandler from 'express-async-handler';
import bcrypt from "bcryptjs"
import User from '../Models/User.js';
import { generateToken } from '../middleware/auth.js';




export const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

export const register = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body
    // Hash Password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const user = await User.create({ email: email, password: hashedPassword, isAdmin: false })
        res.status(201).json({ user, message: "User created successfully" });
    } catch (error) {
        res.status(400)
        throw new Error("Email already exists")
    }
})

export const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body
    try {
        // Find user in DB
        const user = await User.findOne({
            where: {
                email: email,
            },
        })

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user.id)
            })
        }
        else {
            res.status(401)
            throw new Error("Invalid email or password.")
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export const deleteUser = expressAsyncHandler(async (req, res) => {
    const { userId } = req.params
    const deletedRows = await User.destroy({
        where: { id: userId },
    });

    if (deletedRows > 0) {
        const users = await User.findAll();
        res.json(users);
    }
    else {
        res.status(401)
        throw new Error("UserId not found")
    }
})


