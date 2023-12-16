/* eslint-disable react/prop-types */
import {  differenceInDays , parseISO } from "date-fns";
import { MdDone } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";
import TaskForm from '../tasks/TaskForm'

import { useEditTask } from "./useEditTask";
import { useAddToTrash } from "./useAddToTrash";
import styled from 'styled-components'
import { useOutletContext } from "react-router-dom";


const StyledDispalay = styled.div`
display :flex;
align-items : center;
justify-content : center;
flex-direction:column;

`


const OneTask = () => {

  const task  = useOutletContext()
  const [isCompleted , setisCompleted] = useState(task?.isCompleted || false) 
  const  [showModel , setshowModel] = useState(false)  
  const  {mutate} = useEditTask()  
  const {mutate  : AddToTrash } = useAddToTrash()



const handleClick = () => {
    mutate({ ...task, isCompleted : !isCompleted});
};

const today = Date.now()
  return (     

   <StyledDispalay>
    {task?.trashId ? null : 
      <div className="data">
              <p className="items" >{task?.name}</p>
              <p className="items" >{task?.preriorty}</p>
              <p className="items" > { differenceInDays(parseISO(task?.dueDate)  ,today )} days left </p>
              <div className="items arrangebtns " >  
              
                
                <button className={`btn  ${task?.isCompleted && "btndone"} `}  > 
                <MdDone title="Add to completed" onClick={ () => {setisCompleted(!isCompleted) , handleClick()}} /> 
                </button>  
              
                <button className="btn" >
                <MdOutlineDelete  title="Move to Trash" onClick={() => {AddToTrash({ ...task})}} />
                </button>
                <button className="btn" title="Edit" onClick={()=> setshowModel(!showModel)} >
                  <FiEdit2/>
                </button>
                </div>
             </div>
             
             }

                {showModel&&<TaskForm Taskdata =  {task} />}
                
                
                </StyledDispalay>
    
  )
}

export default OneTask

