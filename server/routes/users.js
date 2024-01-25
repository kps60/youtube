import express from "express"
import { deleteUser, dislike, getUser, like, subscribe, unSubscribe, updateUser } from "../controllers/user.js"
import { verify_token } from "../verify.js"

const router = express.Router()
// update user
router.put("/:id", verify_token, updateUser)
// delete user
router.delete("/:id", verify_token, deleteUser)
// get a user
router.get("/find/:id", getUser)
// subscribe user
router.put("/sub/:id", verify_token, subscribe)
// unsubscribe user
router.put("/unsub/:id", verify_token, unSubscribe)
// like video
router.put("/like/:videoId", verify_token, like)
// dislike video
router.put("/dislike/:videoId", verify_token, dislike)

export default router
