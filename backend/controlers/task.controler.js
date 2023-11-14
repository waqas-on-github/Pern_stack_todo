import Prisma from "../prisma.js";
import CustomError from "../utils/CustomError.js";
import asyncHandler from '../utils/asyncHandler.js'
import Joi from "joi";

// create task funcation 
const createTask = asyncHandler(async(req, res) => {

// input validation 
 const schema = Joi.object({
     name:  Joi.string().required(),
     description:Joi.string().required(),
     isCompleted:Joi.boolean(),
     createdAt:Joi.date(),
     updateAt:Joi.date(),
     dueDate:Joi.date(),
     preriorty: Joi.string().valid("Low", "Medium", "High")

 })    
 
 const {error} = schema.validate(req.body)

//error checking 
 if(error) throw  new CustomError(error.message , error.code )

// task creation in db 
const Task = await Prisma.task.create({
    data : req.body
})

//error checking 
if(!Task) throw new CustomError("task can not created " , 401)

// sending data back  on sucessfull task creation 
res.status(201).json({ 
    success : true , 
    task : Task 
})


 
})

// get all tasks 
const getAllTasks = asyncHandler(async(req, res) => {

    const tasks = await Prisma.task.findMany({})

    if(!tasks) throw new CustomError("not task found" , 401)
  
    res.status(200).json({
        success : true , 
        tasks : tasks 
    })
})


// get one  task 
const getOneTask = asyncHandler(async(req, res) => {
    
const {id} =  req?.params

if(!id) throw new CustomError("please provide id to get results" , 401)

const task = await Prisma.task.findUniqueOrThrow({where : {id : Number(id)}})

if(!task) throw new CustomError("task not found by this " + id)

res.status(200).json({
    success : true , 
    task : task 
})

})


// delete task 
const deleteTask = asyncHandler(async(req,res) => {

    const {id} = req?.params

    const doseTaskExist = await Prisma.task.findUnique({where : {id : Number(id)}})

    if(!doseTaskExist) throw new CustomError("task not found")
        
    const deleted = await Prisma.task.delete({
        where:{id: Number(id)}
    })

    if(!deleted) throw new CustomError("task can not be deleted" , 401)


     res.status(200).json({ 
         success :  true , 
         deleted :deleted,
         message : "task deleted successfully"
     })
})

// update task 

const updateTask = asyncHandler(async(req, res) => {
 
    const  {id} = req.params

    const doseTaskExist = await Prisma.task.findUnique({where : {id : Number(id)}})

    if(!doseTaskExist) throw new CustomError("task not found")

    const update = await Prisma.task.update({
        where : {id : Number(id)},
        data : req.body
    })

   if(!update) throw new CustomError("can not update recod" , 400)

   res.status(200).json({ 
    success : true , 
    update : update
   })


})


export {
    createTask ,
    getAllTasks,
    getOneTask,
    deleteTask, 
    updateTask
    
}
