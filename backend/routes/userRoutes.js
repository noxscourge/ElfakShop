import express from 'express'
const router = express.Router()
import {authUser, getUserProfile,getUsers,registerUser,updateUserProfile,deleteUser, getUsersbyId, updateUser} from '../controllers/userController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile)

router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/').post(registerUser).get(protect,admin,getUsers)


router.route('/:id').delete(protect,admin,deleteUser)
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUsersbyId).put(protect,admin,updateUser)

export default router 