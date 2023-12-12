
import { useMutation } from "@tanstack/react-query";
import axios from "axios"
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";




const useDeleteTask = () => {
    const queryClient = useQueryClient();
       
    const  {mutate} = useMutation({ 
     
        mutationFn : async (task) => {            
            console.log(task);
            return  await axios.delete(`/api/v1/task/delete/${task?.id}`)
        },

        onSuccess : () =>{
            toast.success("task deleted successfully")
            queryClient.invalidateQueries({
                queryKey : ["tasks"]
            })
        },
        onError : (error) => {
            toast.error(error.message)
        }



    })


    return {
        mutate
    }
}


export {
    useDeleteTask
}

