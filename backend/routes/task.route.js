import { Router } from "express";
import { createTask, deleteAll, deleteTask, getAllTasks, getOneTask, updateTask } from "../controlers/task.controler.js";
import { isLoggedIn } from "../middlewares/auth.js";

const router = Router() 



router.get('/' , (req, res) => {res.send("task route is working ....") })


router.post("/new" , isLoggedIn,  createTask)
router.get("/tasks" , isLoggedIn, getAllTasks)
router.get("/:id" , getOneTask)
router.delete("/delete/:id" , deleteTask)  
router.put("/update/:id" , updateTask)
router.delete("/deleteAll" , deleteAll)


export {
    router
}