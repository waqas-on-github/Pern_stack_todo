import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getOneUser, updateUser } from "../controlers/user.controler.js";

const router = Router() 



router.get("/" , (req, res) => {
    res.send("user route is working ... ")
})


router.post("/new" , createUser)
router.get("/:id" , getOneUser)
router.get("/all/:id" , getAllUsers)
router.put("/update/:id" , updateUser)
router.delete("/delete/:id" ,deleteUser)


export {
    router
}
