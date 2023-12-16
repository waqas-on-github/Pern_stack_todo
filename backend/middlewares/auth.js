import CustomError from "../utils/CustomError.js";
import asyncHandler from "../utils/asyncHandler.js";
import JWT from "jsonwebtoken";
import Prisma from "../prisma.js";



export const isLoggedIn = asyncHandler(async (req, res, next) => {
    let token;

  //check token from cookies or bearer 

    if (req?.headers?.cookie.split("=")[1] || (req?.headers?.Authorization && req?.headers?.Authorization.startsWith("Bearer")) ) {

        token = req?.headers?.cookie.split("=")[1]|| req?.headers?.Authorization.split(" ")[1]
        // token = "Bearer gbhnjm235r5hbnj"
        console.log(req.cookie);
    }

      console.log(token);

    if (!token) {
        throw new CustomError("Not authorized to access this resource", 401)
    }

    
        const decodedJwtPayload = JWT.verify(token, process.env.SECRET);
        
         req.user = await Prisma.user.findUnique({
            where : {id :  Number(decodedJwtPayload?.data?.id)}
         })
        //  console.log("from auth middleware ");
    

         next()

        if(!req.user) {

            throw new CustomError("Not authorized to access this resource", 401)
        }
    

    
})


// Define the authorize function
export const authorize = (...requiredRoles) => { // ...["user" , "admin" ,"moderator"]
    return  function (req, res, next) {
      
        // Check if the user's role is included in the list of required roles
        if (!req.user || !requiredRoles.includes(req.user.role)) {
          // If req.user is undefined or the user's role is not in the required roles, throw an error

         return res.json({
           sucess : false ,
           error : ` ${req?.user?.role} are not allowed to access this resource`
          }
          )}

        // If the user's role is in the required roles, proceed to the next middleware/route handler
        
        next();
    }
    };

      