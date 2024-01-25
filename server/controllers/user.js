import { CreateError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js";

export const updateUser = async (req, res, next) => {
    console.log(req.user);
    if (req.params.id === req.user.userId) {
        //todo
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    } else {
        return next(CreateError(403, "you can update only your account!"))
    }
}
export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.userId) {
        //todo
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user has been deleted")
        } catch (error) {
            next(error)
        }
    } else {
        return next(CreateError(403, "you can delete only your account!"))
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id,"-password")
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.userId, {
            $push: { subscribedUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        })
        res.status(200).json("subscription successful")
    } catch (error) {
        next(error)
    }
}
export const unSubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.userId, {
            $pull: { subscribedUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        })
        res.status(200).json("unsubscription successful")
    } catch (error) {
        next(error)
    }
}
export const like = async (req, res, next) => {
    const id = req.user.userId
    const videoId = req.params.videoId
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { Likes: id },
            $pull: { Dislikes: id }
        })
        res.status(200).json("video has been liked")
    } catch (error) {
        next(error)
    }
}
export const dislike = async (req, res, next) => {
    const id = req.user.userId
    const videoId = req.params.videoId
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { Dislikes: id },
            $pull: { Likes: id }
        })
        res.status(200).json("video has been disliked")
    } catch (error) {
        next(error)
    }
}