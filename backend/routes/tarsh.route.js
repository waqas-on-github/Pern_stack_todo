import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { CreateTrash, GetallTrashes , emptyTrash } from "../controlers/trash.controler.js";


const router = Router() 



router.get("/" , (req, res) => {
    res.send("tarsh  route is working ... ")
})

router.post("/new" , isLoggedIn ,  CreateTrash)
router.delete("/destroy/:id" , isLoggedIn ,  emptyTrash)
router.get("/all" , isLoggedIn , GetallTrashes)





export {
    router
}
