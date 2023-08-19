import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import JWT from 'jsonwebtoken'


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        //validtaion
        if (!name) {
            return res.send({ message: "Name is required" })
        }
        if (!email) {
            return res.send({ message: "Email is required" })
        }
        if (!password) {
            return res.send({ message: "Password is required" })
        }
        if (!phone) {
            return res.send({ message: "Phone is required" })
        }
        if (!address) {
            return res.send({ message: "Address is required" })
        }
        if (!answer) {
            return res.send({ message: "Answer is required" })
        }

        //check user
        const Existinguser = await userModel.findOne({ email })
        //existing user
        if (Existinguser) {
            return res.status(200).send({
                success: true,
                message: "Already registered please log in"
            })
        }
        //refister user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save()
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        })
    }
}

//LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email not regsitered"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(404).send({
                success: false,
                message: "Invalid password"
            })
        }
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }
};

//ForgotPass
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({
                message: "Email required"
            })
        }
        if (!answer) {
            res.status(400).send({
                message: "Answer required"
            })
        }
        if (!newPassword) {
            res.status(400).send({
                message: "New Password required"
            })
        }
        //chech
        const user = await userModel.findOne({ email, answer })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong email or answer"
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password reset successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
};
//testcont

export const testController = (req, res) => {
    res.send("Protected route")
};

export const updateProfileController = async (req, res) => {
    try {
        const { name, address, phone, email, password } = req.body
        const user = await userModel.findById(req.user._id)
        //password
        if (password && password.length < 3) {
            return res.json({ error: "Password is reqiured and 3 charecters long" })
        }
        const hashsedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name, password: hashsedPassword || user.password, phone: phone || user.phone, address: address || user.address
        }, { new: true })
        res.status(200).send({
            success: true,
            message: "Profile Updated successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while update profile",
            error
        })
    }
};