import express from 'express'
import { getParts } from '../controllers/Parts.js'

const router = express.Router()


//get parts
router.get('/:id', getParts)

export default router