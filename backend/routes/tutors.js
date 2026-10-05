import express from "express"
import Tutor from "../models/Tutor.js"
import Session from "../models/Session.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const tutors = await Tutor.find().select("-password")

        res.json(tutors)
    } catch (error) {
        res.status(500).json({
            message: "Failed to get tutors"
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const tutor = await Tutor.findById(req.params.id).select("-password")

        if (!tutor) {
            return res.status(404).json({
                message: "Tutor not found"
            })
        }

        res.json(tutor)
    } catch (error) {
        res.status(500).json({
            message: "Failed to get tutor"
        })
    }
})

router.post("/:id/slots", auth, async (req, res) => {
    try {
        if (req.user.role !== "tutor") {
            return res.status(403).json({
                message: "Only tutors can add availability"
            })
        }

        if (req.user.id !== req.params.id) {
            return res.status(403).json({
                message: "You can only manage your own availability"
            })
        }

        const { subject, date, startTime, endTime } = req.body

        if (!subject || !date || !startTime || !endTime) {
            return res.status(400).json({
                message: "Subject, date, start time and end time are required"
            })
        }

        if (startTime >= endTime) {
            return res.status(400).json({
                message: "Start time must be before end time"
            })
        }

        const tutor = await Tutor.findById(req.params.id)

        if (!tutor) {
            return res.status(404).json({
                message: "Tutor not found"
            })
        }

        if (!tutor.subjects.includes(subject)) {
            return res.status(400).json({
                message: "Tutor does not teach this subject"
            })
        }

        tutor.availableSlots.push({
            subject,
            date,
            startTime,
            endTime
        })

        await tutor.save()

        res.status(201).json({
            message: "Availability added successfully",
            slot: {
                subject,
                date,
                startTime,
                endTime
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to add availability"
        })
    }
})

export default router