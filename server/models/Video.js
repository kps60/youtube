import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    Views: {
        type: Number,
        default: 0
    },
    tags:{
        type:[String],
        default:[]
    },
    Likes:{
        type:[String],
        default:[]
    },
    Dislikes:{
        type:[String],
        default:[]
    },
}, { timestamps: true })

export default mongoose.model("Video", VideoSchema)