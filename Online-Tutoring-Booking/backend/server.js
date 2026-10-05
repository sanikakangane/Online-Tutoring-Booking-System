import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import authRoutes from "./routes/auth.js"
import tutorRoutes from "./routes/tutors.js"
import sessionRoutes from "./routes/sessions.js"

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

app.use("/auth", authRoutes)
app.use("/tutors", tutorRoutes)
app.use("/sessions", sessionRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((error) => {
        console.log("MongoDB connection error")
        console.log(error.message)
    })

app.get("/", (req, res) => {
    res.json({
        message: "Online Tutoring Booking API is running"
    })
})

const PORT = process.env.PORT || 7979

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})