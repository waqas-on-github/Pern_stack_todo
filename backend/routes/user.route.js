import { Router } from "express";
import { creaetAccount,  deleteUser,   updateProfile  , getAllUsers , getPrfile} from "../controlers/user.controler.js";
import { limiter } from "../middlewares/ratelimiter.js";
import { login, logout } from "../controlers/authcontroler.js";
import { isLoggedIn } from "../middlewares/auth.js";


const router = Router() 



router.get("/" , (req, res) => {
    res.send("user route is working ... ")
})


router.post("/new" , creaetAccount)
router.post("/login" , login)
router.get ("/logout" , logout)
router.get("/getall" , getAllUsers)
router.get('/:id' , getPrfile)
router.delete("/delete/:id" ,deleteUser)



router.put("/update/:id" , updateProfile)


export {
    router
}
