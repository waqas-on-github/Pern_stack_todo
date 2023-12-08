import {useMutation} from "@tanstack/react-query"
import axios from 'axios'

const useCreateTask = () => {

const {mutate , isLoading , isError } = useMutation({ 
  
    mutationFn : async (data) => {
       return await axios.post("/api/v1/task/new" , data)
    },

    onsuccess : (data) => {
         console.log("data posted sucessfully");
         console.log(data);
    },

    onerror : (error) => {

        console.log(error);

    }


}) 

return {
    mutate , isLoading , isError
}

}


export  {
    useCreateTask
}