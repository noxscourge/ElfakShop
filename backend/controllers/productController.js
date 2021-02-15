import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
import { response } from 'express'

// @desc  Fetch sve proizvode
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async(req,res) => 
{
    const products = await Product.find({})
    res.json(products)
})


// @desc  Fetch 1 proizvod
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async(req,res) => 
{
    const product = await Product.findById(req.params.id)
    res.json(product)
    if (product)
    {

        res.json(product);

    } else {
        res.status(404).json({message: 'Proizvod nije pronadjen'})
    }
})


// @desc  DELETE proizvod
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async(req,res) => 
{
    const product = await Product.findById(req.params.id)
    res.json(product)
    if (product)
    {

        await product.remove()
        res.json({message:'Proizvod obrisan'})

    } else {
        res.status(404).json({message: 'Proizvod nije pronadjen'})
    }
})

// @desc  CREATE proizvod
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async(req,res) => 
{
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user:req.user._id,
        image:'/images/sample.jpg',
        category: 'Sample category',
        countInStock:0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
    
})


// @desc  UPDATE proizvod
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async(req,res) => 
{
   const {name,price,description,image,category,countInStock} = req.body

   const product = await Product.findById(req.params.id)

   if(product)
   {
       product.name=name
       product.price=price
       product.image=image
       product.description=description
       product.category=category
       product.countInStock=countInStock



    const updatedProduct = await product.save()
    res.json(updatedProduct)
   }
   else 
   {
       res.status(404)
       throw new Error('Proizvod nije pronadjen')
   }

    
    
})


export { getProductById, getProducts,deleteProduct,updateProduct,createProduct}