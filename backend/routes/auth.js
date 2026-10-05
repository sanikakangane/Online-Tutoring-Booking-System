import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import Student from "../models/Student.js"
import Tutor from "../models/Tutor.js"

dotenv.config()

const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role, subjects } = req.body

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All required fields must be provided"
            })
        }

        if (role !== "student" && role !== "tutor") {
            return res.status(400).json({
                message: "Role must be student or tutor"
            })
        }

        const Model = role === "student" ? Student : Tutor

        const existingUser = await Model.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        if (role === "student") {
            const student = new Student({
                name,
                email,
                password: hashedPassword,
                role: "student"
            })

            await student.save()

            return res.status(201).json({
                message: "Student registered successfully"
            })
        }

        if (!subjects || subjects.length === 0) {
            return res.status(400).json({
                message: "Tutor must provide at least one subject"
            })
        }

        const tutor = new Tutor({
            name,
            email,
            password: hashedPassword,
            role: "tutor",
            subjects,
            availableSlots: []
        })

        await tutor.save()

        res.status(201).json({
            message: "Tutor registered successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Registration failed"
        })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Email, password and role are required"
            })
        }

        const Model = role === "student" ? Student : Tutor

        const user = await Model.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        res.json({
            message: "Login successful",
            token
        })
    } catch (error) {
        res.status(500).json({
            message: "Login failed"
        })
    }
})

export default router