import express from 'express'
import { getProduct, getProducts, getProductsByCategory, searchProducts, updateProductStatus } from '../controllers/Products.js'

const router = express.Router()

//search products
router.get('/search', searchProducts)

//get all products
router.get('/', getProducts)

//get products by category
router.get('/category/:category', getProductsByCategory)

//update product status
router.put('/update/:id', updateProductStatus)

//get product by ID
router.get('/:id', getProduct)





export default router