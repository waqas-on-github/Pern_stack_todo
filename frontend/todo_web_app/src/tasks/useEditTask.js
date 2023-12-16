import { useMutation } from "@tanstack/react-query";
import axios from "axios"
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";




const useEditTask = () => {
    const queryClient = useQueryClient();
       
    const  {mutate} = useMutation({ 
     
        mutationFn : async (task) => {            
            console.log(task);
            return  await axios.put(`/api/v1/task/update/${task?.id}` , task )
        },

        onSuccess : () =>{
            toast.success("task updated successfully")
            queryClient.invalidateQueries({
                queryKey : ["tasks"]
            })
        },
        onError : (error) => {
            console.log(error);
            toast.error(error.message)
        }



    })


    return {
        mutate
    }
}


export {
    useEditTask
}