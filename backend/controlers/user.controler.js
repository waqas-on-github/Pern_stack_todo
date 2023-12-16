import Prisma from "../prisma.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import Joi from "joi";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/JwtHelper.js";
import { logout } from "./authcontroler.js";

const cookieoptions = {
  httpOnly: true,
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
};

if (process.env.ENVIRONMENT === "PRODUCTION") {
  cookieoptions.secure = true;
}


// create new user account 
const creaetAccount = asyncHandler(async (req, res) => {
  // input validation
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) throw new CustomError(  error.message, 500 , "stack line 28 user controler ");
  // hashing password before saving into db
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // creating user in db
  const User = await Prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    },
  });
  // if db respond  some error
  if (!User) throw new CustomError("can not create user", 401);

 // creating trash table for user have account 
 
 
 // creating jwt token
 try {
   var token = await generateAccessToken(User);
  } catch (error) {
    // if we failed to generate token somehow so delete record inserted in db without generating  token
    await Prisma.user.delete({
      where: { id: User.id },
    });

    throw new CustomError(
      "failed to create account try again later  : error -->" + error.mesage,
      401
    );
  }

  res.cookie("token", token, cookieoptions);
  // if request if coming from mobile app
  res.header("Authorization", `Bearer ${token}`);

    var trash = await Prisma.trash.create({
      data : {
          user: {
              connect: { id: User.id } // Assuming 'user' is the ID of the user you want to connect
            }
      }
     })

  
  // if trash cant be created we will deleted user record and also access token generated for user
  if(!trash) {
    await Prisma.user.delete({
      where: { id: User.id },
    });

  // by loggig out all token will be removed 
    await logout()
  }
  
  
  
  //for saftey
  User.password = undefined;


  res.status(201).json({
    success: true,
    user: User,
    trash : trash,
    token: token,
  });
});
// get user profile 
const getPrfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);

    if(!id) throw new CustomError("user id not provided " , 401)

    const profile = await Prisma.user.findUnique({
      where : {id : Number(id)}
    })



    res.status(200).json({ 
      success: true , 
      profile : {
        name : profile.name ,
        email : profile.email
      }
    })

  });


//delete user 
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const doseUserExist = await Prisma.user.findUnique({
    where: { id: Number(id) },
  });

  if (!doseUserExist) throw new CustomError("user do not exist", 401);

  const deletedUser = await Prisma.user.delete({
    where: { id: Number(id) },
  });

  if (!deletedUser) throw new CustomError("user canot be deleted", 401);

  res.status(200).json({
    success: true,
    deleted: deletedUser,
  });
});
// update user profile  
const updateProfile = asyncHandler(async (req, res) => {
   console.log(req.body);

  const { id } = req.params;

  if(!id) throw new CustomError("id not provided" , 401 )
   
   const doseUserExist = await Prisma.user.findUnique({
     where: { id: Number(id) }
  });

   if (!doseUserExist) throw new CustomError("user do not exist", 401);

   const updated = await Prisma.user.update({
    where: { id: Number(id) },
     data: req.body
    
   });

  if (!updated) throw new CustomError("recod can not be updated");

   res.status(200).json({
     success: true,
     updated: updated,
   });

});



// get all users 
const getAllUsers = asyncHandler(async(req, res) => {
  const allusers = await Prisma.user.findMany({})

  res.status(200).json({
    success : true ,
    data : allusers

  })
})

export {
   creaetAccount,
   deleteUser,
   updateProfile,
   getAllUsers,
   getPrfile
  };
