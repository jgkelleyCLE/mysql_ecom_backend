import express from 'express'
import { loginUser, registerUser, updateUser } from '../controllers/Users.js'

const router = express.Router()

//register user
router.post('/', registerUser)

//login user
router.post('/login', loginUser)

//update user
router.put('/edit/:id', updateUser)

export default router