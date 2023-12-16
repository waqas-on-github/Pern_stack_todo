import Prisma from "../prisma.js";
import CustomError from "../utils/CustomError.js";
import asyncHandler from '../utils/asyncHandler.js'
import Joi from "joi";

// create task funcation 
const createTask = asyncHandler(async(req, res) => {


console.log("------------------------------------------------------------------------------");


console.log(req?.user.id);

console.log("------------------------------------------------------------------------------");


// input validation 
 const schema = Joi.object({
     user : Joi.number(),
     name:  Joi.string().required(),
     description:Joi.string().required(),
     isCompleted:Joi.boolean(),
     createdAt:Joi.date(),
     updateAt:Joi.date(),
     dueDate:Joi.date(),
     preriorty: Joi.string().valid("Low", "Medium", "High"),
     trash : Joi.number()

 })    
 
 // getting trsh id related to user who's trying to create task 

//  const trash = await Prisma.trash.findUnique({
//     where : {userId :  Number(req?.user?.id)}
//  })




 const {error} = schema.validate(req.body)

//error checking 
 if(error) throw  new CustomError(error.message , error.code )



 const  data =   {
    ...req.body,
    user: {
      connect: { id: req.body.user } // Assuming 'user' is the ID of the user you want to connect
    } 
  }


if(req.body.trash) {
    data.trash = {
        connect: { id: req.body.trash  } // Assuming 'trash' is the ID of the trash you want to connect

    }
}

    // task creation in db 
    const Task = await Prisma.task.create({ data : data })



//error checking 
if(!Task) throw new CustomError("task can not created" , 401)

// sending data back  on sucessfull task creation 
res.status(201).json({ 
    success : true , 
    task : Task 
})


 
})

// get all tasks 
const getAllTasks = asyncHandler(async(req, res) => {
    
    console.log(req?.user?.id)

    


    const tasks = await Prisma.task.findMany({
        where : {userId:req?.user?.id}
    })


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
    // Extract relevant properties from req.body
    
    const { name, description, isCompleted, dueDate, priority } = req.body;


    const doseTaskExist = await Prisma.task.findUnique({where : {id : Number(id)}})

    if(!doseTaskExist) throw new CustomError("task not found")

    const update = await Prisma.task.update({
        where : {id : Number(id)},
        data :{
            name,
            description,
            isCompleted,
            dueDate,
            priority,
            
          }
    })

   if(!update) throw new CustomError("can not update recod" , 400)

   res.status(200).json({ 
    success : true , 
    update : update
   })


})




// delete all tasks 
const deleteAll = asyncHandler(async(req, res ) => {


  const deleted = await Prisma.task.deleteMany()

  if(!deleted) throw new CustomError("task not delted " , 401) 


  res.status(200).json({ 
    success :  true ,
    deleted : deleted
  })


})



const addToTrash = asyncHandler(async(req, res) => {

    const userId = req?.user?.id 
    const user = await Prisma.user.findUnique({
        where : {id : Number(userId)}
    })
   
    const TrashId = user.trashId;
    
    if(!userId || TrashId)  throw new CustomError("user or trash is not found try creating trash first" , 401)

    // check dose this task exists in db with this user account
    const doseTaskExist = await Prisma.task.findUnique({where : {userId: Number(userId)}})
    if(!doseTaskExist) throw new CustomError("task  not found" , 401)

    // check dose trash tabel is created or not 
   
   const doseTrashExists  = await Prisma.trash.findUnique({where : {trashId: Number(TrashId)}})
   if(!doseTrashExists) throw new CustomError("trash table  not found try creating one " , 401)

    // if all above go well let add task to trash 

    const addTaskToTrash = await Prisma.task.update({
        where : {
            AND : [{userId : userId} , {trashId : TrashId}]
        },
        data : {
             trash : {
                connect: { id: req.body.trash  }
        }
    } 
})

res.status(201).json({ 
    success : true , 
    added : addTaskToTrash
})


})

export {
    createTask ,
    getAllTasks,
    getOneTask,
    deleteTask, 
    updateTask,
    deleteAll, 
    addToTrash
    
}
