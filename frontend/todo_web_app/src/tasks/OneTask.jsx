/* eslint-disable react/prop-types */
import { MdDone } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";
import TaskForm from '../tasks/TaskForm'

import { useEditTask } from "./useEditTask";
import { useDeleteTask } from "./useDeleteTask";





const OneTask = ({task}) => {
 const [isCompleted , setisCompleted] = useState(task?.isCompleted || false) 
 const  [showModel , setshowModel] = useState(false)

  console.log(showModel);

 const  {mutate} = useEditTask()  
 const {mutate  : deleteTask } = useDeleteTask()



const handleClick = () => {
    mutate({ ...task, isCompleted : !isCompleted});
};


  return (     
   <>
      <div className="data">
              <p className="items" >{task?.name}</p>
              <p className="items" >{task?.preriorty}</p>
              <div className="items arrangebtns " >  
              
                
                <button className={`btn  ${task?.isCompleted && "btndone"} `}  > 
                <MdDone onClick={ () => {setisCompleted(!isCompleted) , handleClick()}} /> 
                </button>  
              
                <button className="btn" >
                <MdOutlineDelete onClick={() => {deleteTask(task)}} />
                </button>
                <button className="btn" onClick={()=> setshowModel(!showModel)} >
                  <FiEdit2/>
                </button>
                </div>
             </div>
                {showModel&&<TaskForm/>}
                </>
    
  )
}

export default OneTask

