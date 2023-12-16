import Prisma from "../prisma.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import Joi from "joi";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/JwtHelper.js";

const cookieoptions = {
  httpOnly: true,
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
};

const cookieoptionslogout = {
  httpOnly: true,
  expires: new Date(Date.now()),
};

if (process.env.ENVIRONMENT === "PRODUCTION") {
  cookieoptions.secure = true;
}





const login = asyncHandler(async (req, res) => {
// input validation 
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) throw new CustomError(error.message, error.code);

  const User = await Prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (!User)
    throw new CustomError( "you entered wrong email ",400,"log in func line 182");

  const checkpass = await bcrypt.compare(req.body.password, User?.password);

  if (!checkpass) throw new CustomError("you enterd wrong password", 401);

  if (checkpass) {
    try {
      var token = await generateAccessToken(User);
    } catch (error) {
      throw new CustomError(
        "failed to create account try again later  : error -->" + error.mesage,
        401
      );
    }

    res.cookie("token", token, cookieoptions);
    // for mobile apps
    res.header("Authorization", `Bearer ${token}`);
  }

  res.status(200).json({
    success: true,
    data: {
      id : User.id,
      name: User.name,
      email: User.email,
      loggedIn: true,
    },
  });
});



const logout = asyncHandler(async (req, res) => {
  res.cookie("token", null , cookieoptionslogout);
  res.header("Authorization", `Bearer "no token"`);



  res.status(200).json({
    success: true,
    message: "user logged out",
  });
});



const forgotPassword = asyncHandler( async (req, res) =>{})

export { login, logout };
