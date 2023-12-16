/* eslint-disable react/prop-types */
import { useOutletContext } from "react-router-dom";
import {  differenceInDays , parseISO } from "date-fns";
import { MdRestore } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";



import styled from 'styled-components'

const StyledDispalay = styled.div`
display :flex;
align-items : center;
justify-content : center;
flex-direction:column;

`



const Trash = () => {
const task = useOutletContext()


console.log(task);
const today = Date.now()
  return (
    <StyledDispalay>
        {task?.trashId ? 
      <div className="data">
              <p className="items" >{task?.name}</p>
              <p className="items" >{task?.preriorty}</p>
              <p className="items" > { differenceInDays(parseISO(task?.dueDate)  ,today )} days left </p>
              <div className="items arrangebtns " >  
               <button title="Restore" > <MdRestore/></button>
               <button title="Delete permanently" > <MdDeleteOutline style={{ color: 'red' }} /></button>
                </div>
             </div> :  null}
                </StyledDispalay>
  )
}

export default Trash