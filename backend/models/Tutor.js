import mongoose from "mongoose"

const tutorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "tutor"
    },

    subjects: {
        type: [String],
        required: true
    },

    availableSlots: [
        {
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
            }
        }
    ]
})

const Tutor = mongoose.model("Tutor", tutorSchema)

export default Tutor