import express from 'express'
import { createOrder, getAllOrders, getOrderById, getOrderItems, getUserOrders, updateOrderStatus } from '../controllers/Orders.js'

const router = express.Router()

router.get('/:id', getOrderById)

//get all orders
router.get('/', getAllOrders)

//get order by id
// router.get('/:id', getOrderById)

//get user orders
router.get('/user/:id', getUserOrders)

//get order items
router.get('/items/:id', getOrderItems)

//create order
router.post('/', createOrder)

//update order status
router.put('/update/:id', updateOrderStatus)

export default router