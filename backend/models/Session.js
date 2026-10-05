import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutor",
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    startTime: {
        type: String,
        required: true
    },

    endTime: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "booked"
    }
})

const Session = mongoose.model("Session", sessionSchema)

export default Session