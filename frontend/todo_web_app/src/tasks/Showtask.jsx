import { StyledContainer } from "../ui/Taskui"
import OneTask from "./OneTask"
import TaskHeading from "./TaskHeading"
import { useShowTask } from "./useShowTask"






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
          <OneTask task={task}  />
          </div>
         )
        })}

        </div>
    </StyledContainer>
  )
}

export default Showtask