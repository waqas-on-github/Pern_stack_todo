import {useQuery }from '@tanstack/react-query'
import axios from 'axios'



const useShowTask = () => {

const  {isLoading, isError, data, error}= useQuery({

    queryKey: ['tasks'],
    queryFn: async ()=> {
        return await axios.get("/api/v1/task/tasks")
      
} })



return {
    isLoading, isError, data, error
}
}


export {
    useShowTask
}