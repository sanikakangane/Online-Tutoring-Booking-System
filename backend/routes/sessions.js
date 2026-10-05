import express from "express"
import auth from "../middleware/auth.js"

import Student from "../models/Student.js"
import Tutor from "../models/Tutor.js"
import Session from "../models/Session.js"

const router = express.Router()

router.post("/book", auth, async (req, res) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({
                message: "Only students can book sessions"
            })
        }

        const {
            tutorId,
            subject,
            date,
            startTime,
            endTime
        } = req.body

        if (!tutorId || !subject || !date || !startTime || !endTime) {
            return res.status(400).json({
                message: "All booking fields are required"
            })
        }

        if (startTime >= endTime) {
            return res.status(400).json({
                message: "Start time must be before end time"
            })
        }

        const student = await Student.findById(req.user.id)

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            })
        }

        const tutor = await Tutor.findById(tutorId)

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

        const availableSlot = tutor.availableSlots.find((slot) => {
            return (
                slot.subject === subject &&
                slot.date === date &&
                slot.startTime <= startTime &&
                slot.endTime >= endTime
            )
        })

        if (!availableSlot) {
            return res.status(400).json({
                message: "Tutor is not available at this time"
            })
        }

        const tutorConflict = await Session.findOne({
            tutor: tutorId,
            date,
            status: "booked",
            startTime: { $lt: endTime },
            endTime: { $gt: startTime }
        })

        if (tutorConflict) {
            return res.status(409).json({
                message: "Tutor already has a session at this time"
            })
        }

        const studentConflict = await Session.findOne({
            student: req.user.id,
            date,
            status: "booked",
            startTime: { $lt: endTime },
            endTime: { $gt: startTime }
        })

        if (studentConflict) {
            return res.status(409).json({
                message: "Student already has a session at this time"
            })
        }

        const session = new Session({
            student: req.user.id,
            tutor: tutorId,
            subject,
            date,
            startTime,
            endTime,
            status: "booked"
        })

        await session.save()

        res.status(201).json({
            message: "Session booked successfully",
            session
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to book session"
        })
    }
})

router.get("/my", auth, async (req, res) => {
    try {
        const sessions = await Session.find({
            $or: [
                { student: req.user.id },
                { tutor: req.user.id }
            ]
        })
            .populate("student", "name email")
            .populate("tutor", "name email")

        res.json(sessions)
    } catch (error) {
        res.status(500).json({
            message: "Failed to get sessions"
        })
    }
})

export default router