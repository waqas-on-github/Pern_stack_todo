import Prisma from "../prisma.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";


const  CreateTrash =  asyncHandler( async(req, res) => {
 
   console.log(req?.user);

   if(!req?.user) throw new CustomError("user id not provided" , 401 , "create trash line 8")
   
   const trash = await Prisma.trash.create({
    data : {
        user: {
            connect: { id: req.user.id } // Assuming 'user' is the ID of the user you want to connect
          }
    }
   })
   if(!trash) throw new CustomError("trash can not be created for some unknow reason" , "create trash line 13")

   res.status(201).json({ 
    success : true ,
    trash :  trash
   })
})

// i wanna delete trash but issue is  user  
const emptyTrash = asyncHandler( async(req, res) => {
    // 1 setp one get all task related to user who've trash and 
    // 2 then filter all  tasks that are adde in trash\
    // 3 deleted all of those tasks 
    // so now trash is empty
    const userId = req.user.id

    console.log(userId +  "user id" );

    const {id} = req?.params 

    console.log(id);

    const UserTasks = await Prisma.task.deleteMany({
      where : {
        AND : [{userId : userId} , {trashId : Number(id)}]
      }
    })

    if(!UserTasks) throw new CustomError("can't retrive tasks " , 401) 

    res.status(200).json({ 
      success : true , 
      tasks : UserTasks
    })


    
  
})








const GetallTrashes = asyncHandler(async(req , res ) => {

 const trashes = await Prisma.trash.findMany({
 }) 

 if(!trashes) throw new CustomError("trashes not found" , 401) 

 res.status(200).json({ 
  success : true ,
  trashes : trashes 
 })


}) 



const restoreOneTask = asyncHandler(async(req, res) => {

})




const restoreALLTasks = asyncHandler( async(req, res) => {

})




export  {
    CreateTrash,
    GetallTrashes ,
    emptyTrash ,
    restoreOneTask,
    restoreALLTasks
}

