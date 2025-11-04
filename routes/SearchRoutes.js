import express from 'express'
import { createSearch, getAllSearches, getSearchById, getSearchDetails } from '../controllers/Search.js'

const router = express.Router()


//get all searches
router.get('/', getAllSearches)

//create search
router.post('/', createSearch)

//get search by id
router.get('/:id', getSearchById)

//get search details
router.get('/details/:id', getSearchDetails)

export default router