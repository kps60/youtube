import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import userRoutes from "./routes/users.js"
import commentRoutes from "./routes/comments.js"
import videoRoutes from "./routes/videos.js"
import authRoutes from "./routes/auth.js"


const app = express()
dotenv.config()

app.get('/', (req, res) => {
    res.send('This is a youtube api')
});
app.use(cookieParser())
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/comments', commentRoutes)
app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || 'some thing went wrong'
    return res.status(status).json({
        message, success: false, status
    })
})
const PORT = process.env.APPSETTING_PORT || 8800;
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB)
    .then(() => { app.listen(PORT, () => console.log(`server running on port ${PORT}`)) })
    .catch((error) => { throw error });
