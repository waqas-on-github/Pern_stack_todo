import { Container  , Main } from "../ui/TaskContainer"
import { GoPlus } from "react-icons/go";
import {useSelector , useDispatch} from "react-redux"
import { setTask } from "../Slices/taskSlice";
import TaskForm from '../tasks/TaskForm'
  






export const CreateTask = () => {
  const showTask = useSelector((state ) => state?.task?.showTask) 
  const dispatch = useDispatch()
   
  return (
    <Container> 
      <Main>
    { !showTask &&  <div onClick={() => {dispatch(setTask(!showTask))}}
  
        className="addtask" >
        <GoPlus />  
         <span>Add task</span>        

      </div>
    }
    {showTask&&<TaskForm/>}


      </Main>
    </Container>
  )
}
