import express from "express"
import { addComments, deleteComments, getComments } from "../controllers/comment.js"
import { verify_token } from "../verify.js"

const router = express.Router()

router.post("/", verify_token, addComments)
router.delete("/:id", verify_token, deleteComments)
router.get("/:videoId", getComments)
export default router
