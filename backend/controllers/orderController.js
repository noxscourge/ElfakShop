import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

// @desc  Nova porudzbina
// @route GET /api/orders
// @access Private

const addOrderItems = asyncHandler(async(req,res) => 
{
    const {orderItems,
        shippingAddress,
        paymentMethod, 
         itemsPrice,
        shippingPrice, 
        totalPrice} = req.body

        if (orderItems && orderItems.length===0)
        {
            res.status(400)
            throw new Error("Nema porudzbina")
            return
            
        }
        else 
        {

            const order = new Order(
                {orderItems,
                user:req.user._id,
                shippingAddress,
                paymentMethod,
                 itemsPrice,
                shippingPrice, 
                totalPrice})

                const createdOrder= await order.save()
                res.status(201).json(createdOrder)
            }
})




// @desc  Vrati mi porudzbinu preko ID
// @route GET /api/orders/:id
// @access Private

const getOrderById = asyncHandler(async(req,res) => 
{
   
    const order =  await Order.findById(req.params.id).populate('user'
    , 'name email')

    if(order)
    {
        res.json(order)
    }
    else 
    {
        res.status(404)
        throw new Error('Porudzbina ne postoji')
    }

})


// @desc  Update porudzbinu da je placeno
// @route GET /api/orders/:id
// @access Private/Admin

const updateOrdersToPaid = asyncHandler(async(req,res) => 
{
   
    const order =  await Order.findById(req.params.id)

    if(order)
    {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            
        }


        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }
    else 
    {
        res.status(404)
        throw new Error('Porudzbina ne postoji')
    }

})

// @desc  Update porudzbinu da je isporuceno
// @route GET /api/orders/:id/deliver
// @access Private/Admin

const updateOrdersToDelivered = asyncHandler(async(req,res) => 
{
   
    const order =  await Order.findById(req.params.id)

    if(order)
    {
        order.isDelivered = true 
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }
    else 
    {
        res.status(404)
        throw new Error('Porudzbina ne postoji')
    }

})






// @desc  GET narucene stvari ulogovanog korisnika
// @route GET /api/orders/myorders/id
// @access Private

const getMyOrders = asyncHandler(async(req,res) => 
{
   
    const orders =  await Order.find({user:req.user._id})

    res.json(orders)

})


// @desc  GET sve narucene stvari
// @route GET /api/orders
// @access Private

const getOrders = asyncHandler(async(req,res) => 
{
   
    const orders =  await Order.find({}).populate('user','id name')

    res.json(orders)

})





export {addOrderItems, getOrderById,getMyOrders,getOrders,updateOrdersToPaid,updateOrdersToDelivered}