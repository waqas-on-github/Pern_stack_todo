import {useQuery} from "@tanstack/react-query"
import axios from 'axios'

const   useProfile = (id) => {

const  {data  , isLoading , isError , error} =  useQuery({ 
    queryKey : ["profile"] ,
    queryFn: async () => {

            return   await axios.get(`/api/v1/user/`+ id)        
    }
})


return {
    data , isLoading  , isError , error
}

}



export  {
    useProfile
}