import { StyledContainer } from "../ui/Taskui"
import TaskHeading from "./TaskHeading"
import { useShowTask } from "./useShowTask"
import {Outlet} from "react-router-dom"






const Showtask = () => {
  const  {isLoading, isError, data, error} = useShowTask()

  if(isLoading) {
    return <> loading </>
  }

  if(isError) {
    return <> {error.message}</>
  }


  return (
    <StyledContainer>
      <div className="uicontainer">

     <TaskHeading/>

      {data?.data?.tasks?.map((task) => {
        return (
          <div key = {task.id}> 
          < Outlet context={task}  />
          </div>
         )
        })}

        </div>
    </StyledContainer>
  )
}

export default Showtask