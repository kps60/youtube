import { CreateError } from "../error.js"
import Comment from "../models/Comment.js"
import Video from "../models/Video.js"


export const addComments = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.userId })
    try {
        const savedComemnt = await newComment.save()
        res.status(200).json(savedComemnt)
    } catch (error) {
        next(error)
    }
}

export const deleteComments = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.id)
        if (req.user.userId === comment.userId || req.user.userId === video.userId) {
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("Successfully deleted the comment")
        } else {
            return next(CreateError(403, "your access denied by the server"))
        }
    } catch (error) {
        next(error)
    }
}

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}