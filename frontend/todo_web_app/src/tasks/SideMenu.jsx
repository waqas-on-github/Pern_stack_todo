import { SideBar } from "../ui/TaskContainer"
import Avatar from "../genralui/Avatar"
import {useSelector , useDispatch} from "react-redux"
import { BsPlusCircleFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { setTask } from "../Slices/taskSlice";
import { LuListTodo } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";








const SideMenu = () => {
    const user = useSelector((state ) => state?.auth?.userInfo) 
    const showTask = useSelector((state ) => state?.task?.showTask) 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(showTask);

  return (
    
    <SideBar>
       <div className="sidecontainer">
        <div className="usercontainer">
            <Avatar username={user?.name} fontSize ="15px"  size='20px' /> 
            <p>{user?.name}</p>
            <IoIosArrowDown/>
        </div> 



        <div className="menu-list" >
        <h4  
           onClick={() => { 
            dispatch(setTask(!showTask))
            navigate("/task/new")
          }} 
           className="addtask" >
            <BsPlusCircleFill />
           Add Task 
        </h4>
          <h4 onClick={() => {navigate("/task/show/tasks")}} ><LuListTodo /> Inbox </h4>
          <h4 onClick={() => {navigate("/task/show/trash")}} > <MdOutlineDelete/>  Trash</h4>

        </div>
        </div> 
    </SideBar>
  )
}

export { SideMenu}