/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import { StyledContainer , StyledForm } from "../ui/FormUi"
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { yupResolver } from "@hookform/resolvers/yup"
import { useCreateTask } from "./useCreateTask"
import  { useSelector , useDispatch } from 'react-redux'
import { setTask } from "../Slices/taskSlice";
import { useEditTask } from "./useEditTask"


const TaskForm = ({Taskdata}) => {
       
  //date formatting 
const currentDueDate =  new Date(Date.now()).toISOString().slice(0, 16)
console.log(currentDueDate);
console.log(Taskdata?.dueDate);
// getting state values from store  
const userId = useSelector((state) => state?.auth?.userInfo?.id) 
const showTask = useSelector((state) => state?.task?.showTask) 

const  {mutate} = useCreateTask()
const {mutate : edit} = useEditTask()
const dispatch = useDispatch()


const schema  = yup.object().shape({
    name : yup.string().required(),
    description : yup.string().required(),
    preriorty : yup.string().required()

})

const  {register , handleSubmit , reset , formState} = useForm({
      resolver : yupResolver(schema),
      defaultValues : Taskdata || {}
})

const {errors} = formState;
console.log(errors);

const submitTask = async (data) => {

  if(Taskdata!==(null||undefined)){

      if(Object.values(Taskdata)?.length!==0) {
              await edit ({...data , user: userId ,dueDate : new Date(data.dueDate).toISOString() } , {
                onSuccess : () => {
                  toast.success("task created sucessfully")
                  reset()
             } ,
             onError : (error) => {
               toast.error(error.message);
               
             
             }
              })
      }}

  else {
  
    await mutate({...data , user: userId ,dueDate : new Date(data.dueDate).toISOString() } , {
      onSuccess : () => {
           toast.success("task created sucessfully")
      } ,
      onError : (error) => {
        toast.error(error.message);
      
      }
    })}


}

  return (
    <StyledContainer>

    <StyledForm onSubmit={handleSubmit(submitTask)} >
     <input placeholder="Task name" name="name" id="name" {...register("name")} />
     <span>{errors?.name?.message}</span>
     <input placeholder="Description" name="description" id="description" {...register("description")} />
     <span>{errors?.description?.message}</span>


     <div className="secnodRow" >
      
      <span>Preriorty</span>
       <select name="preriorty" id="preriorty" {...register("preriorty")} >
        <option value="Low"> Low</option>
        <option value="Medium"> Medium</option>
        <option value="High"> High</option>

     </select> 
     <input 
            placeholder="due Date "
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            defaultValue={currentDueDate}
            {...register("dueDate")}
            
          />
          

     </div>

     <div className="lastRow" >
      <div>inbox</div>
      <div>
      <button type="submit" >{ Taskdata ? "Update" : "Add task"}</button>
      <button type="reset" onClick={() => { dispatch(setTask(!showTask)) }} > cancel</button>
      </div>
     </div>
    </StyledForm>
    

    </StyledContainer>
  )
}

export default TaskForm

