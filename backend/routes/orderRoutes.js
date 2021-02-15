import express from 'express'
const router = express.Router()
import {addOrderItems,getMyOrders,getOrderById, updateOrdersToPaid,
getOrders, updateOrdersToDelivered} from '../controllers/orderController.js'
import {protect,admin} from '../middleware/authMiddleware.js'


router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrdersToPaid)
router.route('/myorders/:id').get(protect, getMyOrders)
router.route('/:id/').put(protect,admin,updateOrdersToDelivered)
export default router  