
import { useMutation } from "@tanstack/react-query";
import axios from "axios"
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";




const useAddToTrash = () => {
    const queryClient = useQueryClient();
       
    const  {mutate} = useMutation({ 
     
        mutationFn : async (task) => {            
            console.log(task);
            // adding task to trash 
            return  await axios.patch(`/api/v1/task/add/${task?.id}`)
        },

        onSuccess : () =>{
            toast.success("task move to trash successfully")
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
    useAddToTrash
}

