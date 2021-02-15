import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateTokens.js'

// @desc  Auth usera i uzimanje tokena
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async(req,res) => 
{
    const {email,password} = req.body
    

    const user = await User.findOne({email})

    if(user && ( await user.matchPassword(password)))
    {
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        } )
        
    } else {
        res.status(401)
        throw new Error('Pogresan email ili sifra')
    }
})


// @desc  Registrovanje novog korisnika
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async(req,res) => 
{
    const {name,email,password} = req.body
    

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('Korisnik vec postoji')
    }

    const user = await User.create({

        name,
        email,
        password
    })

    if (user)
    {
        res.status(201).json({
      
                _id: user._id,
                name: user.name,
                email:user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
        
        })
    } else {
        res.status(400)
        throw new Error('Losi podaci')
        }
    
})

// @desc  Uzimamo profil usera
// @route GET /api/users/profil
// @access Private

const getUserProfile = asyncHandler(async(req,res) => 
{

   const user = await User.findById(req.user._id)
   if(user)
   {
    res.json({
        _id: user._id,
        name: user.name,
        email:user.email,
        isAdmin: user.isAdmin,
        
    } )
   } else 
   {
       res.status(404)
       throw new Error("Korisnik nije pronadjen")
   }
})


// @desc  Update profil korisnika
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async(req,res) => 
{

   const user = await User.findById(req.user._id)
   if(user)
   {
    user.name = req.body.name || user.name 
    user.email = req.body.email || user.email
    if(req.body.password)
    {
        user.password = req.body.password
    }

    const updateUser = await user.save()
    
    res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email:updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
    } )

   } else 
   {
       res.status(404)
       throw new Error("Korisnik nije pronadjen")
   }
})


// @desc  Uzimamo sve korisnike
// @route GET /api/users
// @access Private/Admin

const getUsers = asyncHandler(async(req,res) => 
{

    const users= await User.find({})
    res.json(users)
   
})


// @desc  Obrisi korisnika
// @route GET /api/users/:id
// @access Private/Admin

const deleteUser = asyncHandler(async(req,res) => 
{

    const user = await User.findById(req.params.id)
    if(user)
    {
        await user.remove()
        res.json({message:'Uspesno obrisan'})
    }
    else
    {
        res.status(404)
        throw new Error ("Korisnik ne postoji ")
    }
    
   
})


// @desc  Uzimamo korisnika preko ID
// @route GET /api/users/:id
// @access Private/Admin

const getUsersbyId = asyncHandler(async(req,res) => 
{

    const user= await User.findById(req.params.id).select('-password')
    if(user){
      res.json(user)
    }
    else
    {
        res.status(404)
        throw new Error ("Korisnik ne postoji ")
    }
        
   
})

// @desc  Update korisnika
// @route PUT /api/users/:id
// @access Private/Admin

const updateUser = asyncHandler(async(req,res) => 
{


   const user = await User.findById(req.params.id)
   if(user)
   {
    user.name = req.body.name || user.name 
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin 

    const updatedUser = await user.save()
    
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email:updatedUser.email, 
        isAdmin: updatedUser.isAdmin
      
    } )

   } else 
   {
       res.status(404)
       throw new Error("Korisnik nije pronadjen")
   }
})









export {getUserProfile, authUser,registerUser, updateUserProfile,getUsers,deleteUser,getUsersbyId,updateUser}