import  Jwt  from "jsonwebtoken"
import { deleteUser } from "../controlers/user.controler.js"




const generateAccessToken =   (data) => {
   
    
    return new Promise ( async (resolve , reject ) => {
  
         Jwt.sign( {data} , process.env.SECRET ,{expiresIn:"24h"} , async (err , token) => {
            if(err) {
            reject(err)
            }

            resolve(token)
        })
     

    })

    
    

}



export{
    generateAccessToken
}