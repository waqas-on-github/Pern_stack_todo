import { useForm } from "react-hook-form"
import { StyledContainer , StyledForm } from "../ui/FormUi"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useCreateTask } from "./useCreateTask"
import  { useSelector , useDispatch } from 'react-redux'
import { setTask } from "../Slices/taskSlice";


const TaskForm = () => {
const currentDueDate =  new Date(Date.now()).toISOString().slice(0, 16)

const userId = useSelector((state) =>state?.auth?.userInfo?.id) 
const showTask = useSelector((state ) => state?.task?.showTask) 

const  {mutate} = useCreateTask()
const dispatch = useDispatch()


const schema  = yup.object().shape({
    name : yup.string().required(),
    description : yup.string().required(),
    preriorty : yup.string().required()

})

const  {register , handleSubmit , reset , formState} = useForm({
      resolver : yupResolver(schema)
})

const {errors} = formState;

const submitTask = async (data) => {
  console.log(data);
    await mutate({...data , user: userId ,dueDate : new Date(data.dueDate).toISOString() })
}

  return (
    <StyledContainer>

    <StyledForm onSubmit={handleSubmit(submitTask)} >
     <input placeholder="Task name" name="name" id="name" {...register("name")} />
     <input placeholder="Description" name="description" id="description" {...register("description")} />
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
      <button type="submit" >Add task</button>
      <button type="reset" onClick={() => { dispatch(setTask(!showTask)) }} > cancel</button>
      </div>
     </div>
    </StyledForm>
    

    </StyledContainer>
  )
}

export default TaskForm

