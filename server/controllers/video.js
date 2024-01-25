import User from "../models/User.js"
import Video from "../models/Video.js"
import { CreateError } from "../error.js"

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.userId, ...req.body })
    try {
        await newVideo.save()
        res.status(200).json(newVideo)

    } catch (err) {
        next(err)
    }
}

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(CreateError(404, "No video found!"))
        if (req.user.userId !== video.userId) return next(CreateError(403, "You can update only your details!"))
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedVideo)
    } catch (err) {
        next(err)
    }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(CreateError(404, "No video found!"))
        if (req.user.userId !== video.userId) return next(CreateError(403, "You can update only your details!"))
        await Video.findByIdAndDelete(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json('your video deleted successfully')
    } catch (err) {
        next(err)
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (err) {
        next(err)
    }
}

export const viewVideo = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, { $inc: { Views: 1 } })
        res.status(200).json('views have been increased')
    } catch (err) {
        next(err)
    }
}

export const randomVideos = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }])
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

export const trendVideos = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ Views: -1 })
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

export const subvideos = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId)
        const subscribedChanels = user.subscribedUsers
        const list = await Promise.all(
            subscribedChanels.map((chanelId) => Video.find({ userId: chanelId }))
        );
        if (list.length === 0) return next(CreateError(404, "No subscribed video found!"))
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))
    } catch (err) {
        next(err)
    }
}

export const getByTags = async (req, res, next) => {
    const tags = req.query.tags.split(",")
    try {
        const videos = await Video.find({ tags: { $in: tags } })
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}
export const getBySearch = async (req, res, next) => {
    const query = req.query.q
    try {
        const videos = await Video.find({
            title: { $regex: query, $options: "i" }
        }).limit(40)
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}
