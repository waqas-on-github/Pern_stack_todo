import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getOneTask, updateTask } from "../controlers/task.controler.js";

const router = Router() 



router.get('/' , (req, res) => {res.send("task route is working ....") })


router.post("/new" , createTask)
router.get("/tasks" , getAllTasks)
router.get("/:id" , getOneTask)
router.delete("/delete/:id" , deleteTask)
router.put("/update/:id" , updateTask)



export {
    router
}