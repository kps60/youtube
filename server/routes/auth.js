import express from "express"
import { signIn, signUp, google } from "../controllers/auth.js"

const router = express.Router()

//create user
router.post('/signup', signUp)
//signing in
router.post('/signin', signIn)
//google auth

router.post('/google', google)
export default router
