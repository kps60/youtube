import express from "express"
import { addVideo, deleteVideo, getBySearch, getByTags, getVideo, randomVideos, subvideos, trendVideos, updateVideo, viewVideo } from "../controllers/video.js"
import { verify_token } from "../verify.js"

const router = express.Router()

//create a video
router.post('/', verify_token, addVideo)
router.put('/:id', verify_token, updateVideo)
router.delete('/:id', verify_token, deleteVideo)
router.get('/find/:id', getVideo)
router.put('/view/:id', viewVideo)

router.get('/trend', trendVideos);
router.get('/random', randomVideos)
router.get('/subs', verify_token, subvideos)
router.get('/tags', getByTags)
router.get('/search', getBySearch)

export default router
