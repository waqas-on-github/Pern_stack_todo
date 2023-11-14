import Prisma from "../prisma.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import Joi from "joi";




const createUser = asyncHandler(async(req, res) => {

    // input validation
const schema = Joi.object({
  name : Joi.string().required(), 
  email : Joi.string().required(),     
  password :Joi.string().required()
})


const {error} = schema.validate(req.body)

if (error) throw new CustomError(error.message , error.code)


const User = await Prisma.user.create({
    data : req.body
})

if(!User) throw new CustomError("can not create user" , 401)


res.status(201).json({ 
    success : true , 
    user : User 
})


})



const  getOneUser = asyncHandler(async(req, res) => {

   const {id} = req.params 
  
  
   const  doseUserExist = await Prisma.user.findUnique({
      where : {id : Number(id)}
   })
  
   if(!doseUserExist) throw new CustomError("user do not exist" , 401)
   


   res.status(200).json({ 
   success : true , 
   deleted :  doseUserExist

   })

})


const getAllUsers = asyncHandler(async(req, res) => {

  const user = await Prisma.task.findMany({}) 

  if(!user) throw new CustomError("not users found")

  res.status(200).json({ 
    success : true ,
    user : user
  })

})


const deleteUser = asyncHandler(async(req, res) => {

    const {id} = req.params 
  
  
    const  doseUserExist = await Prisma.user.findUnique({
       where : {id : Number(id)}
    })
   
    if(!doseUserExist) throw new CustomError("user do not exist" , 401)
    
    const deletedUser = await Prisma.user.delete({
     where : {id :Number(id)}
    })
 
    if(!deletedUser) throw new CustomError("user canot be deleted" , 401)
 
    res.status(200).json({ 
    success : true , 
    deleted :  deletedUser
 
    })
 
})


const updateUser = asyncHandler(async(req, res) => {
    const {id} = req.params 
  
  
    const  doseUserExist = await Prisma.user.findUnique({
       where : {id : Number(id)}
    })
   
    if(!doseUserExist) throw new CustomError("user do not exist" , 401)
   
    
    const updated = await Prisma.task.update({
        where : {id: Number(id)} ,
        data : req,body
    })

    if(!updated) throw new   CustomError("recod can not be updated")

    res.status(200).json({
        success:  true ,
        updated : updated 
    })
})



export {
    createUser, 
    getOneUser,
    getAllUsers, 
    deleteUser, 
    updateUser
}